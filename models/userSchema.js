import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        default: "https://res.cloudinary.com/grace26/image/upload/v1664693577/2e4566fd829bcf9eb11ccdb5f252b02f_tye4l7.jpg",
    },
    publicId: {
        type: String,
        default: ""
    },
},{timestamps: true});

userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

const User = mongoose.models.user || mongoose.model('user', userSchema);
export default User;