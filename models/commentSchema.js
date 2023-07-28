import mongoose from "mongoose"

const commentSchema = mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
},{timestamps: true});

const Comment = mongoose.models.comment || mongoose.model('comment', commentSchema);
export default Comment;