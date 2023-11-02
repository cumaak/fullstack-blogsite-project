import mongoose from "mongoose";

 const connect = () => {
    mongoose.connect(process.env.DB_URI, {
        dbName: 'blogsite_project',
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=>{
        console.log("Connected to the DB succesfully")
    }).catch((err)=>{
        console.log(`DB connection err: ${err}`)
    })
 };

 export default connect;