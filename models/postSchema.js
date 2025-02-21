import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    languages: {
      type: Array,
    },
    description: {
      type: String,
      required: true,
    },
    image: String,
    publicId: String,
    author: Object,
  },
  { timestamps: true }
);
const Post = mongoose.models.post || mongoose.model("post", postSchema);
export default Post;
