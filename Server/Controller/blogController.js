//connect to DB 
const slugify = require('slugify');
const Blogs = require('../Model/blogSchema')
const { v4: uuidv4 } = require('uuid');

//บันทึกข้อมูล
const create = (req,res)=>{
    const {title,content,author}=req.body
    let slug = slugify(title)
    if(!slug) slug = uuidv4();


    switch(true){
        case !title:
            return res.status(400).json({error:"Please input title"})
            break;
        case !content:
            return res.status(400).json({error:"Please input content"})
            break;
    }
    // save data
    Blogs.create({title,content,author,slug})
    .then((blog) =>{
        res.json(blog)
    })
    .catch((err) =>{
        res.status(400).json({error:"Title is invalid!"})
    })
}

const getAllBlogs = async (req, res) =>{
     const allBlogs = await Blogs.find({})
     res.json(allBlogs)
}

//ดึงข้อมูลด้วย slug
const getSingleBlog = async (req, res) =>{
    const {slug} = req.params
    const singleBlog = await Blogs.findOne({slug})
    res.json(singleBlog)
}

const deleteBlog = async (req, res) =>{
    const {slug} = req.params
    const blog = await Blogs.findOneAndDelete({slug})
    res.send("delete success")
}
   
const updateBlog = async (req, res) =>{
    const {slug} = req.params
    const {title,content,author}=req.body
    const blog = await Blogs.findOneAndUpdate({slug},{title,content,author},{new:true})
    res.json(blog)
}
 
module.exports = {create, getAllBlogs, getSingleBlog, deleteBlog, updateBlog}