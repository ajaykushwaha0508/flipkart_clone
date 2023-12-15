import {products} from './Conctant/data.js';
import Product from './model/product-schema.js';

const defaultData= async()=>{
      try{   
             await  Product.deleteMany();
             await Product.insertMany(products);
              console.log("default data inserted successfully");
      }catch(error){
            console.log("Error while insering default data" , error.message);
      }
}

export default defaultData;