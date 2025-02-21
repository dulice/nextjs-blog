import Post from "@/models/postSchema";
import db from "@/utlis/connection";

export async function getCategories(language) {
  await db.connect();
  const category = await Post.find({ languages: { $in: language } });
  const jsonData = JSON.stringify(category);
  const data = JSON.parse(jsonData);
  return data;
}
