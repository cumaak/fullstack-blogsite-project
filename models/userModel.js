import mongoose from "mongoose";
import bcrypt from "bcrypt";

const {Schema} = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    followings: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    },
    {
        timestamps: true
    }
)

userSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        user.password = hash;
        next();
    })
})

const User = mongoose.model('User', userSchema)

export default User;