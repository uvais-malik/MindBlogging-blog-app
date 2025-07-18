import fs from 'fs'
import imagekit from '../config/imageKit.js';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import main from '../config/gemini.js';

export const addBlog = async (req, res)=>{
    try {
        const {title, subTitle, description, category, isPublished} = JSON.parse(req.body.blog);
        const imageFile = req.file;

        // Check if all fields are present
        if(!title || !description || !category || !imageFile){
            return res.json({
                success: false,
                message: "Missing required fields"
            })
        }

        const fileBuffer = fs.readFileSync(imageFile.path)

        // upload Image to ImageKit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        })

        // optimization through inagekit URL transformation
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                {quality: 'auto'}, //Auto compression
                {format: 'webp'}, //convert to modern format
                {width: '1280'}  //width resizing
            ]
        });

        const image = optimizedImageUrl;

        // storing in Blog db
        await Blog.create({title, subTitle, description, category, image, isPublished})

        res.json({
            success: true,
            message: "Blog added Successfully"
        })

    } catch (error) {
         res.json({
            success: false,
            message: error.message
         })
    }
}

// To get all blogs data from databse
export const getAllBlogs = async (req, res)=>{
    try {
        const blogs = await Blog.find({isPublished: true})
        // const blogs = await Blog.find()
        // const blogs = await Blog.find().sort({ createdAt: -1 })

        res.json({
            success: true,
            blogs
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
        
    }
}

// To get blog data based on id
export const getBlogById = async (req, res)=>{
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId)
        if(!blog){
            return res.json({
                success: false,
                message: "Blogs not found"
            })
        }
        res.json({
            success: true,
            blog
        })
        
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

// to delete blog data
export const deleteBlogById = async (req,res)=>{
    try {
        const { id } = req.body;
        await Blog.findByIdAndDelete(id);
        res.json({
           success: true,
           message: 'Blog deleted successfully'
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

// To publish or Unpublish blog
export const togglePublish = async (req,res)=>{
    try {
        const { id } = req.body;
        const blog = await Blog.findById(id);
        blog.isPublished = !blog.isPublished;
        await blog.save();
         res.json({
           success: true,
           message: 'Blog Status Updated'
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
} 

// 
export const addComment = async (req, res)=>{
    try {
        const {blog, name, content} = req.body;
        await Comment.create({blog, name, content});
        res.json({
            success: true,
            message: 'comment added for review'
        })
        
    } catch (error) {
         res.json({
            success: false,
            message: error.message
        })
    }
}

export const getBlogComments = async (req, res)=>{
    try {
        const {blogId} = req.body;
        const comments = await Comment.find({blog: blogId, isApproved: true}).sort({createdAt: -1});
        res.json({
            success: true,
            comments
        })
        
    } catch (error) {
         res.json({
            success: false,
            message: error.message
        })
    }
}

// to generate content by gemini ai api
export const generateContent = async (req,res)=>{
    try {
        const {prompt} = req.body;
        const content = await main(prompt + ' Generate a blog content for this topic in simple text found') 
        res.json({
            success: true,
            content
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}