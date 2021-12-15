import { db_adm_conn } from "./index.js";
import { checkInputBeforeSqlQuery } from './scripts.js';
import jwt from 'jsonwebtoken';


const parseGetUserResponse = (rows) => {
    let userObj = {
        firstName : rows[0].firstName,     
        lastName : rows[0].lastName,
        userName : rows[0].userName,
        email : rows[0].email,
        phoneNumber : rows[0].phoneNumber,
        restrictons: []
    }
    for (var row of rows) {
        userObj.restrictons.push( {
            alertActivation: row.alertActivation,
            restrictionName: row.restrictionName
        })
    }
    return userObj
}

export const getUser = async (req, res) => {
    
    let newUser = await db_adm_conn.query(`
    SELECT EU.firstName, EU.lastName, EU.userName, EU.email, EU.phoneNumber, ER.alertActivation, R.restrictionName
    FROM EndUser EU
    JOIN EndUser_Restriction ER ON ER.endUserID = EU.endUserID
    JOIN Restriction R ON R.restrictionID = ER.restrictionID
    WHERE EU.endUserID = '${req.user.userid}';`)

    if (newUser.rows.length == 0) {
        res.status(404).send("There is no EndUser with this id.")
        return
    }
    res.send(parseGetUserResponse(newUser.rows));
    return
};

export const deleteUser = async (req, res) => {
    if (req.query.email === undefined && req.query.id === undefined) {
        res.status(400).send({"Error": "No valid search param provided. (Must be either 'email' or 'id'.)"})
        return
    }
    if (req.query.email !== undefined && req.query.id !== undefined) {
        res.status(400).send({"Error": "You must provide either 'email' or 'id' and cannot search by both."})
        return
    }

    let newUser = (req.query.email !== undefined ?
        await db_adm_conn.query(`SELECT *
                                          FROM EndUser
                                          WHERE email = '${req.query.email}';`) :
        await db_adm_conn.query(`SELECT *
                                          FROM EndUser
                                          WHERE enduserid = '${req.query.id}';`))
    if (req.query.email !== undefined) {
        await db_adm_conn.query(`DELETE FROM EndUser
                                 WHERE email = '${req.query.email}';`)
    } else {
        await db_adm_conn.query(`DELETE FROM EndUser
                                 WHERE enduserid = '${req.query.id}';`)
    }
    if (req.query.email !== undefined) {
        if (newUser.rows.length == 0) {
            res.status(200).send("Nothing changed, as there is no EndUser with this email.")
            return
        }
        res.send({"Deleted": newUser.rows[0]});
        return
    } else {
        if (newUser.rows.length == 0) {
            res.status(200).send("Nothing changed, as there is no EndUser with this id.")
            return
        }
        res.send({"Deleted": newUser.rows[0]});
    }
};

export const postUser = async (req, res) =>
{
    if (req.query.firstName === undefined) {
        res.status(400).send({"Error": "Missing required param 'firstName'."})
        return
    }
    if (req.query.lastName === undefined) {
        res.status(400).send({"Error": "Missing required param 'lastName'."})
        return
    }
    if (req.query.userName === undefined) {
        res.status(400).send({"Error": "Missing required param 'userName'."})
        return
    }
    if (req.query.email === undefined) {
        res.status(400).send({"Error": "Missing required param 'email'."})
        return
    }
    if (req.query.phoneNumber === undefined) {
        res.status(400).send({"Error": "Missing required param 'phoneNumber'."})
        return
    }
    if (req.query.passcode === undefined) {
        res.status(400).send({"Error": "Missing required param 'passcode'."})
        return
    }
    if (req.query.emailConfirmed === undefined) {
        res.status(400).send({"Error": "Missing required param 'emailConfirmed'."})
        return
    }

    try {
        let newUser = await db_adm_conn.query(`INSERT INTO EndUser (firstName, lastName, userName, email, phoneNumber, passcode, emailConfirmed)
                                 VALUES ('${req.query.firstName}', '${req.query.lastName}', '${req.query.userName}',
                                     '${req.query.email}', '${req.query.phoneNumber}', '${req.query.passcode}',
                                     '${req.query.emailConfirmed}')
                                     RETURNING *;
                                 `)
        res.send(newUser.rows[0]);
        return
    } catch (error)  {
        res.status(400).send({"Error": "Unable to create new User.", "Details": `${error}`});
        return
    }
};


export const getToken = async (req, res) => {
    const email = req.query.email;
    const password = req.query.password;

    const user = await db_adm_conn.query(`
        SELECT *
        FROM EndUser
        WHERE email = '${email}';
    `);

    if (user.rows.length == 0) {
        console.log(`There is no user with the email: ${email}`);
        res.status(404).send({"Error": `There is no user with the email ${email}`});
        return;
    }

    if (user.rowCount == 0) {
        res.status(404).send({"Error": `User has no rows`});
        return;
    }

    if (user.rows[0].email == email && user.rows[0].passcode == password) {
        const token = jwt.sign({ email: email, password: password }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, {
            httpOnly: true,
        });
        res.status(200).send(token);
        return;
    }
    res.status(401).send({ "Error": "Wrong credentials" });
};