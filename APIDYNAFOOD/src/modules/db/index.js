import pg from 'pg'

import { DB_STRING } from '../../config/index.js';
import jwt from 'jsonwebtoken';

// const port = 8081
const Client = pg.Client;
const Pool = pg.Pool;

const connectionString =  'postgres://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + DB_STRING

export const poolExample = () => {

    console.log('[EXAMPLE] I am DB Pool example func')

    const pool = new Pool({
        connectionString: connectionString,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    })
    
    
    pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring client', err.stack)
        }
        client.query('SELECT NOW()', (err, result) => {
            release()
            if (err) {
            return console.error('Error executing query', err.stack)
            }
        console.log(result.rows)
        })
    })    

}

export function connect() {
    let db_adm_conn = new Client({
        connectionString : connectionString
    });
    db_adm_conn.on('error', error => {
        connect();
    });
    db_adm_conn.connect().catch(() => { connect() });
    return db_adm_conn
}
export let db_adm_conn = connect()

export const getEcho = async (req, res) => {
    res.send(JSON.stringify(req.query));
};

export const getUsers = async (req, res) => {
    console.log('[LOGGER], getUsers func')
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
