import mongoose from "mongoose";

const Connections = async(username , password)=>{

    const URL = `mongodb+srv://${username}:${password}@ecommerce-web.2ten2mz.mongodb.net/?retryWrites=true&w=majority`;
    try{
       await  mongoose.connect(URL , {useUnifiedTopology : true , useNewUrlParser : true});
        console.log("Database connected");
    }catch(error){
         console.log(`Error while connecting with db ` , error.message);
    }
}
export default Connections;