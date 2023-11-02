import mongoose from "mongoose";

const {Schema} = mongoose

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: Schema.Types.String,
        ref: 'Category'
    },
    hidden: {
        type: Boolean,
        default: false
    },
    comments: [
        {
            body: String,
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            uploadedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    favs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
})

const Blog = mongoose.model("Blog", blogSchema)

export default Blog;