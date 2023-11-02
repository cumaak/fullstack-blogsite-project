import Blog from "../models/blogModel.js";
import Category from '../models/categoryModel.js'

const getACategory = async (req, res) => {
    try{
        const blogs = await Blog.find({category: req.params.name, hidden: false}).sort({uploadedAt: 'desc'}).populate('author')
        const categories = await Category.find({})
        const newestBlogs = await Blog.find({hidden: false, $and: [{author: {$nin: res.locals.user.followings}}, {author: {$ne: res.locals.user}}]}).sort({uploadedAt: 'desc'}).limit(10).populate('author')
        res.status(200).render('category',{
            blogs,
            categories,
            newestBlogs
        })
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}
export {getACategory}