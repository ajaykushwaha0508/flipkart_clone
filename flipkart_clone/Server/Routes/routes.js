import express from 'express';
import { getProducts , getProductById } from '../Controller/product-controller.js';
import { usersignup ,userlogin  } from '../controller/user-controller.js';
import { addPaymentGateway , getresponse } from '../Controller/payment-controller.js';

 const router = express.Router();

router.post('/signup' , usersignup);
router.post('/login' , userlogin);

router.get('/products' , getProducts);

router.get('/product/:id' , getProductById);

router.post('/payment' , addPaymentGateway);

router.post('/callback' , getresponse);


export default router;

