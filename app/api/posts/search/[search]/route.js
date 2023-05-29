import Post from "@/models/postSchema";
import db from "@/utlis/connection";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  await db.connect();
  try {
    const { search } = res.params;
    const filterQuery = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { languages: { $regex: search, $options: "i" } },
      ],
    };
    const posts = await Post.find(filterQuery);
    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json({ message: "Data not found!" }, { status: 500 });
  }
}
