import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        mongoose.connection.on('connected', ()=> 
            console.log("Database Connected")
        );
        const conn = mongoose.connection;
        conn.once('open', () => {
            console.log("MongoDB connection established successfully");
        });
        conn.once('error', () => {
            console.log("MongoDB connection not established ");
        }
        )
        await mongoose.connect(`${process.env.MONGODB_URI}/quickblog`)
        
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDB