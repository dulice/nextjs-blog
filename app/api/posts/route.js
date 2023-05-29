import Post from "@/models/postSchema";
import db from "@/utlis/connection";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    await db.connect();
    const body = await req.json();
    const post = await Post.create(body);
    return NextResponse.json(post, {status: 200});
  } catch (err) {
    return NextResponse.json({ message: "Data not found!" }, {status: 500});
  }
}

export async function GET(req, res) {
    await db.connect();
    try {
      const posts = await Post.find({}).sort({ createdAt: -1 });
      return NextResponse.json(posts);
    } catch (err) {
      return NextResponse.json({message: "Data not found"}, { status: 500 });
    }
  }
