import { cloudinaryConfig } from "@/utlis/cloudinaryConfig";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config(cloudinaryConfig);

export async function POST(req, res) {
  const { image } = await req.json();
  try {
    const uploadImage = await cloudinary.uploader.upload(image, {
      folder: "blog",
    });
    return NextResponse.json({
      imageUrl: uploadImage.secure_url,
      publicId: uploadImage.public_id,
    });
  } catch (error) {
    return NextResponse.json({ message: "Failed to upload image" }, { status: 500 });
  }
}

export async function PUT(req, res) {
  const { publicId } = await req.json();
  try {
    await cloudinary.uploader.destroy(publicId);
    return NextResponse.json({ message: "Image Deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}