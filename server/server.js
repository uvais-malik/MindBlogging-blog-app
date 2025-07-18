import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './config/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();

    // Middleware
    app.use(cors());
    app.use(express.json());

    // Routes
    app.get('/', (req, res) => {
      res.send("API is working");
    });
    app.use('/api/admin', adminRouter);
    app.use('/api/blog', blogRouter);

    app.listen(PORT, () => {
      console.log('Server is running on port ' + PORT);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();

export default app;


// import express from 'express';
// import 'dotenv/config'; // ✅ This auto-runs dotenv.config()
// import cors from 'cors';
// import adminRouter from './routes/adminRoutes.js';
// import blogRouter from './routes/blogRoutes.js';
// import { connectToDatabase } from './configs/db.js';

// const app = express();

// await connectToDatabase(); // ✅ Make sure this is inside top-level await OR wrap in async IIFE

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // Routes
// app.get("/", (req, res) => {
//     res.send("App is working");
// });
// app.use('/api/admin', adminRouter);
// app.use('/api/blog', blogRouter);

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//     console.log("✅ Server is listening on PORT: " + PORT);
// });