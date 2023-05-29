import Post from "@/models/postSchema";
import db from "@/utlis/connection";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  await db.connect();
  try {
    const { language } = res.params;
    const category = await Post.find({ languages: { $in: language } });
    return NextResponse.json(category);
  } catch (err) {
    return NextResponse.json({ message: "Data not found!" }, { status: 500 });
  }
}