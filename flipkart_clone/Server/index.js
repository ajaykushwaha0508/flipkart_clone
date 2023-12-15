import  express  from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from "dotenv";
import { v4 as uuid } from "uuid";

import Connections from "./Database/db.js";
import defaultData from "./default.js";
import Router from "./Routes/routes.js";

import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);



dotenv.config();
const app = express();


app.use(express.static(path.join(__dirname, "./flipkart_clone/build")));
app.get('*' , function(req ,res){
   res.sendFile(path.join(__dirname,"./flipkart/build/index.html"));
})


const PORT = 8000; 


const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
Connections(username , password);
app.listen(PORT , ()=> console.log(`The Server is listening on ${PORT} Successfully`));

defaultData();

app.use(bodyParser.json({extended : true}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors());
app.use('/' , Router);








export let paytmMerchantKey = process.env.PAYTM_MERCHANT_KEY;
export let paytmParams = {};
paytmParams['MID'] = process.env.PAYTM_MID;
paytmParams['WEBSITE'] = process.env.PAYTM_WEBSITE;
paytmParams['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID;
paytmParams['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID;
paytmParams['ORDER_ID'] = uuid();
paytmParams['CUST_ID'] = process.env.PAYTM_CUST_ID;
paytmParams['TXN_AMOUNT'] = '100';
paytmParams['CALLBACK_URL'] = 'http://localhost:8000/callback';
paytmParams['EMAIL'] = 'ajay@gmail.com';
paytmParams['MOBILE_NO'] = '1234567890';

