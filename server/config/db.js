import mongoose from "mongoose";
// const connectDB = async () => {
//     try {
//         // Attempt connection
//         await mongoose.connect(`${process.env.MONGODB_URI}/quickblog`, {
//             serverSelectionTimeoutMS: 30000, // Increased from default 10s to 30s
//         });

//         mongoose.connection.on('connected', () =>
//             console.log(" Database Connected")
//         );

//         mongoose.connection.once('open', () => {
//             console.log("MongoDB connection established successfully");
//         });

//         mongoose.connection.on('error', (err) => {
//             console.error("MongoDB connection error:", err);
//         });

//     } catch (error) {
//         console.error("Initial connection error:", error.message);
//     }
// };


let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const mongoose = await import('mongoose');
    cached.promise = mongoose.default.connect(process.env.MONGODB_URI, {
      dbName: 'quickblog',
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
export default connectDB