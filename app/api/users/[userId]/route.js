import User from "@/models/userSchema";
import db from "@/utlis/connection";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function GET(req, res) {
  await db.connect();
  try {
    const { userId } = res.params;
    const user = await User.findById(userId);
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({ message: "User not found" });
  }
}

export async function PUT(req, res) {
  await db.connect();
  try {
    const { userId } = res.params;
    const body = await req.json();
    const genSalt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(body.password, genSalt);
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { ...body, password: hashPassword },
      { new: true }
    );
    return NextResponse.json(updateUser);
  } catch (err) {
    return NextResponse.json({ message: "User not found"}), { status: 500 };
  }
}
