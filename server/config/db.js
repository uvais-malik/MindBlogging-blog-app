import mongoose from "mongoose";

// const connectDB = async ()=>{
//     try {
//         mongoose.connection.on('connected', ()=> 
//             console.log("Database Connected")
//         );
//         const conn = mongoose.connection;
//         conn.once('open', () => {
//             console.log("MongoDB connection established successfully");
//         });
//         conn.once('error', () => {
//             console.log("MongoDB connection not established ");
//         }
//         )
//         await mongoose.connect(`${process.env.MONGODB_URI}/quickblog`)
        
//     } catch (error) {
//         console.log(error.message);
//     }
// }
// const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Attempt connection
        await mongoose.connect(`${process.env.MONGODB_URI}/quickblog`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // ⬅️ Increased from default 10s to 30s
        });

        mongoose.connection.on('connected', () =>
            console.log("✅ Database Connected")
        );

        mongoose.connection.once('open', () => {
            console.log("✅ MongoDB connection established successfully");
        });

        mongoose.connection.on('error', (err) => {
            console.error("MongoDB connection error:", err);
        });

    } catch (error) {
        console.error("Initial connection error:", error.message);
    }
};

// module.exports = connectDB;

export default connectDB