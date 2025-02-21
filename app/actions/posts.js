import Post from "@/models/postSchema";
import db from "@/utlis/connection";

export const getPost = async (postId) => {
  await db.connect();
  const post = await Post.findById(postId);
  const jsonData = JSON.stringify(post);
  const data = JSON.parse(jsonData);
  return data;
};

export const getPosts = async () => {
  await db.connect();
  const res = await Post.find({}).sort({ createdAt: -1 });
  const jsonData = JSON.stringify(res);
  const data = JSON.parse(jsonData);
  return data;
};

export const searchPosts = async (search) => {
  await db.connect();
  const filterQuery = {
    $or: [
      { title: { $regex: search, $options: "i" } },
      { languages: { $regex: search, $options: "i" } },
    ],
  };
  const res = await Post.find(filterQuery);
  const jsonData = JSON.stringify(res);
  const data = JSON.parse(jsonData);
  return data;
};
