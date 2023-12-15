import Product from "../model/product-schema.js"


export const getProducts= async(request , response)=>{
       try{
               const Products = await  Product.find({});
               response.status(200).json(Products);
       }catch(err){
                response.status(500).json({message : err.message});
       }
}

export const  getProductById=async(request ,response)=>{
        try{    
                const  id  = request.params.id;
                
                const product = await Product.findOne({'id' : id});
                response.status(200).json(product); 
        }catch(err){
                response.status(500).json({message : err.message});
        }
}

