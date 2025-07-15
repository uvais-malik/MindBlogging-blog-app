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
