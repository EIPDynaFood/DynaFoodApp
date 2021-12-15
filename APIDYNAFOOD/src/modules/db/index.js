import pg from 'pg'

import { DB_STRING } from '../../config/index.js';

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
