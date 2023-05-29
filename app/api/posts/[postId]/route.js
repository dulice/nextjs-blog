import Post from "@/models/postSchema";
import db from "@/utlis/connection";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  await db.connect();
  try {
    const { postId } = res.params;
    const post = await Post.findById(postId);
    return NextResponse.json(post)
  } catch (err) {
    return NextResponse.json({ message: "Data not found!" }, {status: 500});
  }
}

export async function PUT(req, res) {
  await db.connect();
  try {
    const { postId } = res.params;
    const body = await req.json();
    const post = await Post.findByIdAndUpdate(postId, body, { new: true });
    return NextResponse.json(post);
  } catch (err) {
    return NextResponse.json({ message: "Data not found!" }, { status: 500 });
  }
}

export async function DELETE(req, res) {
  await db.connect();
  try {
    const { postId } = res.params;
    await Post.findByIdAndDelete(postId);
    return NextResponse.json({ message: "deleted successfully!" });
  } catch (err) {
    return NextResponse.json({ error: "Data not found!" }, { status: 500 });
  }
}
