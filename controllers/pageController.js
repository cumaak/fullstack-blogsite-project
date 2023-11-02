import Blog from '../models/blogModel.js'
import Category from '../models/categoryModel.js'

const getIndexPage = async (req, res) => {
    try {
        const categories = await Category.find({})
        const blogs = await Blog.find({hidden: false, author: {$in: res.locals.user.followings}}).sort({uploadedAt: 'desc'}).populate('author')
        const newestBlogs = await Blog.find({hidden: false, $and: [{author: {$nin: res.locals.user.followings}}, {author: {$ne: res.locals.user}}]}).sort({uploadedAt: 'desc'}).limit(10).populate('author')
        res.status(200).render('index', {
            categories,
            blogs,
            newestBlogs
        })
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}

const getRegisterPage = (req, res) => {
    res.render('register')
}

const getLoginPage = (req, res) => {
    res.render('login')
}
const getNewBlogPage = async (req, res) => {
    try {
        const categories = await Category.find({})
        res.status(200).render('new-blog', {
            categories,
        })
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}
const getLogout = (req, res) => {
    res.cookie("jwt", "", {
        maxAge: 1
    })
    res.redirect("/login")
}

export {getIndexPage, getRegisterPage, getLoginPage, getLogout, getNewBlogPage};