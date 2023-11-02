import Blog from '../models/blogModel.js'
import Category from '../models/categoryModel.js'

const createBlog = async (req, res) => {
    try {
        await Blog.create({
            title: req.body.title,
            content: req.body.content,
            author: res.locals.user._id,
            category: req.body.category
        });
        res.status(201).redirect("/")
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        });
    }
}
const getABlog = async (req, res) => {
    try {
        const blog = await Blog.findById({ _id: req.params.id }).populate('author').populate('comments.user').populate('favs')
        const categories = await Category.find({})
        const newestBlogs = await Blog.find({hidden: false, $and: [{author: {$nin: res.locals.user.followings}}, {author: {$ne: res.locals.user}}]}).sort({uploadedAt: 'desc'}).limit(10).populate('author')
        const isHidden = blog.hidden
        const isFav = blog.favs.some((fav)=>{
            return fav.equals(res.locals.user._id)
        })

        res.status(200).render('blog', {
            blog,
            categories,
            isHidden,
            isFav,
            newestBlogs
        })
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}
const deleteBlog = async (req, res) => {
    try {
        await Blog.findOneAndRemove({_id: req.params.id})
        res.status(200).redirect("/users/profile")

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}
const getEditBlog = async (req, res) => {
    try {
        const blog = await Blog.findById({_id: req.params.id})
        const categories = await Category.find({})
        res.status(200).render('edit-blog', {
            blog,
            categories
        })

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}
const editBlog = async (req, res) => {
    try{
        const blog = await Blog.findById(req.params.id)

        blog.title = req.body.title
        blog.content = req.body.content
        blog.category = req.body.category

        blog.save()

        res.status(200).redirect("/users/profile")
    } catch (error){
        res.status(500).json({
            succeded: false,
            error
        })
    }
}
const hideBlog = async (req, res) => {
    try{
        await Blog.findByIdAndUpdate(
            {_id: req.params.id},
            {$set: {hidden: true}},
            {new: true}
        )
        res.status(200).redirect("/users/profile")
    } catch (error){
        res.status(500).json({
            succeded: false,
            error
        })
    }
}
const unhideBlog = async (req, res) => {
    try{
        await Blog.findByIdAndUpdate(
            {_id: req.params.id},
            {$set: {hidden: false}},
            {new: true}
        )
        res.status(200).redirect("/users/profile")
    } catch (error){
        res.status(500).json({
            succeded: false,
            error
        })
    }
}
const favBlog = async (req, res) => {
    try{
        const blog = await Blog.findByIdAndUpdate(
            {_id: req.params.id},
            {$push: {favs: res.locals.user._id}},
            {new: true}
        )

        res.status(200).redirect('back')

    } catch (error){
        res.status(500).json({
            succeded: false,
            error
        })
    }
}
const unfavBlog = async (req, res) => {
    try{
        const blog = await Blog.findByIdAndUpdate(
            {_id: req.params.id},
            {$pull: {favs: res.locals.user._id}},
            {new: true}
        )

        res.status(200).redirect('back')

    } catch (error){
        res.status(500).json({
            succeded: false,
            error
        })
    }
}
const addComment = async (req, res) => {
    try{
        const blog = await Blog.findByIdAndUpdate(
            {_id: req.params.id},
            {$push: {comments: {"body": req.body.comment, "user": res.locals.user._id}}},
            {new: true}
        )

        res.status(200).redirect(`/blogs/${req.params.id}`)

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}
export { createBlog, getABlog, deleteBlog, getEditBlog, editBlog, hideBlog, unhideBlog, favBlog, unfavBlog, addComment}