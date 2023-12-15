import paytmchecksum from '../paytm/PaytmChecksum.js';
import { paytmParams , paytmMerchantKey } from '../index.js';

import {IncomingForm}  from 'formidable'; // npm i formidable

import https from 'https'; //npm i https 

export const addPaymentGateway= async(request , response)=>{
       const paytmCheckSum = await paytmchecksum.generateSignature(paytmParams, paytmMerchantKey);
              
       try {
           const params = {
               ...paytmParams,
               'CHECKSUMHASH': paytmCheckSum
           };
           
           response.json(params);
       } catch (error) {
           console.log(error);
       }
   }

export const getresponse = async(request , response)=>{
              const form = new IncomingForm();
              let paytmCheckSum = request.body.CHECKSUMHASH;
              delete request.body.CHECKSUMHASH;

              let isVerifySignature = paytmchecksum.verifySignature(request.body , paytmMerchantKey ,paytmCheckSum);
              if(isVerifySignature){
                     let paytmParams = {};
                     paytmParams['MID'] = request.body.MID;
                     paytmParams['ORDERID'] = request.body.ORDERID;

                     paytmchecksum.generateSignature(paytmParams,paytmMerchantKey).then(function(checksum){
                            paytmParams['CHECKSUMHASH'] = checksum;

                            const  post_data = JSON.stringify(paytmParams);

                            const  options = {
                                   hostname : "securegw-stage.paytm.in",
                                   port : 443,
                                   path : '/order/status',
                                   method : 'POST' , 
                                   headers : {
                                          'Content-Type' : "application/json",
                                          'Content-Length' : post_data.length
                                   }
                            }

                            let res = "";
                     const  post_req = https.request(options , function(post_res){
                                   post_res.on('data' , function(chunk){
                                          res+= chunk; 
                                   });

                                   post_res.on('end' , function(){
                                          let result = JSON.parse(res);
                                          response.redirect(`http://localhost:3000/`);
                                   });
                            });

                            post_req.write(post_data);
                            post_req.end();
                     })
              }else{
                     console.log("Checksum mismatched");
              }              
}