import Comment from "@/models/commentSchema";
import db from "@/utlis/connection";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  await db.connect();
  try {
    const { postId } = res.params;
    const comment = await Comment.find({postId});
    return NextResponse.json(comment)
  } catch (err) {
    return NextResponse.json({ message: "Data not found!" }, {status: 500});
  }
}