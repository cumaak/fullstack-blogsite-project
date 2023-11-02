import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Blog from '../models/blogModel.js'
import Category from '../models/categoryModel.js'
import { populate } from "dotenv";

const createUser = async (req, res) => {
    try{
        const user = await User.create(req.body);
        res.redirect("/login")
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        });
    }
}

const loginUser = async (req, res) => {
    try{
        const {username, password} = req.body
        const user = await User.findOne({username})

        let isPasswordSame = false

        if(user){
            isPasswordSame = await bcrypt.compare(password, user.password)
        } else{
            return res.status(401).json({
                succeded: false,
                error: "Incorrect username or password"
            });
        }
        if(isPasswordSame){

            const token = createToken(user._id)
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: 1000*60*60*24
            });

            res.redirect("/")
        } else{
            res.status(401).json({
                succeded: false,
                error: "Incorrect username or password"
            })
        }

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        });
    }
}

const createToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
}
const getProfilePage = async (req, res) => {
    try{
        const blogs = await Blog.find({author: res.locals.user._id}).sort({uploadedAt: 'desc'})
        const author = await User.findById({_id: res.locals.user._id}).populate(["followers", "followings"])
        const categories = await Category.find({})
        const newestBlogs = await Blog.find({hidden: false, $and: [{author: {$nin: res.locals.user.followings}}, {author: {$ne: res.locals.user}}]}).sort({uploadedAt: 'desc'}).limit(10).populate('author')

        res.status(200).render("profile", {
            blogs,
            author,
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
const getAUser = async (req, res) => {
    try{
        if(req.params.id == res.locals.user._id){
            
            res.status(200).redirect("/users/profile")
        
        }else {

            const blogs = await Blog.find({author: req.params.id, hidden: false}).sort({uploadedAt: 'desc'}).populate('author')
            const categories = await Category.find({})
            const author = await User.findById({_id: req.params.id}).populate(["followers", "followings"])
            const newestBlogs = await Blog.find({hidden: false, $and: [{author: {$nin: res.locals.user.followings}}, {author: {$ne: res.locals.user}}]}).sort({uploadedAt: 'desc'}).limit(10).populate('author')
        
            const inFollowers = author.followers.some((follower)=>{
                return follower.equals(res.locals.user._id)
            })

            res.status(200).render("user", {
                blogs,
                author,
                inFollowers,
                categories,
                newestBlogs
        })
        }

    }catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}
const follow = async (req, res) => {
    try{
        let user = await User.findByIdAndUpdate(
            {_id: req.params.id},
            {$push: {followers: res.locals.user._id}},
            {new: true}
        )

        user = await User.findByIdAndUpdate(
            {_id: res.locals.user._id},
            {$push: {followings: req.params.id}},
            {new: true}
        )
        
        res.status(200).redirect(`/users/${req.params.id}`)
        
    } catch (error){
        res.status(500).json({
            succeded: false,
            error
        })
    }
}
const unfollow = async (req, res) => {
    try{
        let user = await User.findByIdAndUpdate(
            {_id: req.params.id},
            {$pull: {followers: res.locals.user._id}},
            {new: true}
        )

        user = await User.findByIdAndUpdate(
            {_id: res.locals.user._id},
            {$pull: {followings: req.params.id}},
            {new: true}
        )
        
        res.status(200).redirect(`/users/${req.params.id}`)
        
    } catch (error){
        res.status(500).json({
            succeded: false,
            error
        })
    }
}

export {createUser, loginUser, getProfilePage, getAUser, follow, unfollow};