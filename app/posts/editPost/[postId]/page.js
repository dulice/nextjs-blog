"use client";

import PostForm from "@/components/Form";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

const EditPost = () => {
  const { postId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [languages, setLanguages] = useState([]);
  const [image, setImage] = useState(null);
  const [prevImg, setPrevImag] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      const { data: post } = await axios.get(`/api/posts/${postId}`)
      setTitle(post.title);
      setDescription(post.description);
      setLanguages(post.languages);
      setImage(post.image);
      setPrevImag(post.image);
    }
    fetchPost();
  },[postId])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (prevImg !== image) {
        await axios.put("/api/upload", { publicId: post.publicId });
        const { data: imageInfo } = await axios.post("/api/upload", { image });
        if (imageInfo) {
          await axios.put(`/api/posts/${postId}`, {
            title,
            description,
            languages,
            image: imageInfo.imageUrl,
            publicId: imageInfo.publicId,
          });
        }
      } else {
        await axios.put(`/api/posts/${postId}`, {
          title,
          description,
          languages,
        });
      }
      router.push(`/posts/${postId}`);
    } catch (error) {
      setIsLoading(false);
      toast.error(error);
    }
  };

  const props = {
    title,
    setTitle,
    description,
    setDescription,
    languages,
    setLanguages,
    image,
    setImage,
    isLoading,
    handleSubmit,
  };

  return (
    <>
      <PostForm {...props} />
    </>
  );
};

export default EditPost;
