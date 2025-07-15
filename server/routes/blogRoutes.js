import express from 'express'
import { addBlog, addComment, deleteBlogById, generateContent, getAllBlogs, getBlogById, getBlogComments, togglePublish } from '../controllers/blogController.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';

const blogRouter = express.Router();


// import auth from '../middlewares/auth.js';

// router.post("/add", auth, upload.single("image"), addBlog); // ✅ Auth comes first


blogRouter.post('/add',upload.single('image'), auth ,addBlog);
blogRouter.get('/all',getAllBlogs);
blogRouter.get('/:blogId',getBlogById);
blogRouter.post('/delete', auth ,deleteBlogById) 
blogRouter.post('/toggle-publish', auth, togglePublish);
blogRouter.post('/add-comment',addComment);
blogRouter.post('/comments',getBlogComments);

blogRouter.post('/generate', auth, generateContent)

export default blogRouter