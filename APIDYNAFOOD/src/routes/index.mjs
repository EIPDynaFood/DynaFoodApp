import { Router } from 'express'
const router = Router();
import { urlencoded } from 'express';
import { json } from 'express';
import cookieParser from 'cookie-parser';
import { getProduct } from '../modules/barcode_scanner.js'
import { getUser, deleteUser, createUser, getToken } from '../modules/db/userManagement.js'
import { getEcho, getUsers } from '../modules/db/index.js'
import logger from '../middleware/logger.js'
import { checkDeleteElementReq, checkGetElementsFromHistoryReq } from '../middleware/security/history.js'
import { checkUserIdReq, checkCreateUserReq } from '../middleware/security/user.js'
import { getElementsFromHistory, deleteElementFromHistory } from '../modules/db/historyManagement.js'

import { secureRouteMiddleware } from '../middleware/security/secureRouting.js'

// import {
//     login
//     ,logout
//     ,users
//     ,isUserLoggedIn
// } from './login.js';

router.use(json({limit: '200kb'}));
router.use(urlencoded({extended: true}));
router.use(cookieParser());
router.use(logger);

router.get('/welcome', (req, res) => {

    res.status(200).send("Welcome 🙌 ");

})

router.get('/products/barcode/:barcode', getProduct)

router.get('/echo', getEcho)
router.get('/users', getUsers) //should delete later


router.get('/user', secureRouteMiddleware, checkUserIdReq, getUser)
router.post('/user', checkCreateUserReq, createUser)
router.post('/signup', checkCreateUserReq, createUser)
router.delete('/user', secureRouteMiddleware, checkUserIdReq, deleteUser)

router.get('/token', getToken);
router.get('/login', getToken);

router.get('/history/', checkGetElementsFromHistoryReq, getElementsFromHistory)
router.delete('/history/:elementID', checkDeleteElementReq, deleteElementFromHistory)
// router.post('/api/login', login);
// router.post('/api/sign', signup);
// router.post('/api/isLoggedIn', isUserLoggedIn);
// router.get('/about.json', about);
// router.get('/api/permissions', getPerms);
// router.post('/api/logout', logout)
// router.post('/api/delete/account', deleteAccount)

export default router;
