import pg from 'pg'
const port = 8081
const Client = pg.Client;

export function connect() {
    let db_adm_conn = new Client({
        connectionString: 'postgres://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@db/postgres'
    });
    db_adm_conn.on('error', error => {
        connect();
    });
    db_adm_conn.connect().catch(() => { connect() });
    return db_adm_conn
}
let db_adm_conn = connect()

export const getEcho = async (req, res) => {
    res.send(JSON.stringify(req.query));
};

export const getUsers = async (req, res) => {
    res.send(await db_adm_conn.query(`SELECT * FROM EndUser`));
};

export const getUser = async (req, res) => {
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
        if (newUser.rows.length == 0) {
            res.status(404).send("There is no EndUser with this email.")
            return
        }
        res.send(newUser.rows[0]);
        return
    } else {
        if (newUser.rows.length == 0) {
            res.status(404).send("There is no EndUser with this id.")
            return
        }
        res.send(newUser.rows[0]);
        return
    }
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