import { db_adm_conn } from "./index.js";


export const insertIntoHistory = async (userID, barcode, product) => {
    await db_adm_conn.query(`INSERT INTO history (endUserID, barcode, productName, pictureLink) VALUES ('${userID}', '${barcode}', '${product.name}', '${product.images}');`)
}