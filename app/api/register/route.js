import User from "@/models/userSchema";
import db from "@/utlis/connection";
import bcrypt from 'bcrypt';
import Joi from "joi";
import { NextResponse } from "next/server";

const schema = Joi.object({
  name: Joi.string().required().min(3).trim(true),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).trim(true),
  password: Joi.string().trim(true).min(5)
})

export async function POST(req, res) {
  await db.connect();
  try {
    const { name, email, password } = await req.json();
    const userExist = await User.findOne({ email });
    if (userExist)
      return NextResponse.json({ message: "User already exist!" });

    const genSalt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, genSalt);
    const user = { name, email, password };
    const { error } = schema.validate(user);
    if (error)
      return NextResponse.json({ message: error.details[0].message });
    const newUser = new User({ ...user, password: hashPassword });
    await newUser.save();
    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json({ message: "User not found" }, { status: 500 });
  }
}
  