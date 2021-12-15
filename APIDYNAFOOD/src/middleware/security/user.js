import { db_adm_conn } from "../../modules/db/index.js";

export const checkGetUserReq = (req, res, next) => {
    if (typeof req.query.email == 'undefined' || req.query.email === null) {
        res.status(400).send({"Error": "No valid email provided."})
        return
    }
    // if (req.query.email !== undefined && req.query.id !== undefined) {
    //     res.status(400).send({"Error": "You must provide either 'email' or 'id' and cannot search by both."})
    //     return
    // }

    // let newUser = (req.query.email !== undefined ?
    //     await db_adm_conn.query(`SELECT *
    //                                       FROM EndUser
    //                                       WHERE email = '${req.query.email}';`) :
    //     await db_adm_conn.query(`SELECT *
    //                                       FROM EndUser
    //                                       WHERE enduserid = '${req.query.id}';`))

    // if (req.query.email !== undefined) {
    //     if (newUser.rows.length == 0) {
    //         res.status(404).send("There is no EndUser with this email.")
    //         return
    //     }
    //     res.send(newUser.rows[0]);
    //     return
    // }
    next()
}