"use client";

import PostForm from "@/components/Form";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { usePost } from "@/utlis/fetch";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

const EditPost = () => {
  const { postId } = useParams();
  const { post, isLoading: loading, error } = usePost(postId);

  const [title, setTitle] = useState(post.title || "");
  const [description, setDescription] = useState(post.description || "");
  const [languages, setLanguages] = useState(post.languages || []);
  const [image, setImage] = useState(post.image || null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (post.image !== image) {
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
      setErrorMessage(error);
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
    errorMessage
  };

  if (error) return <Error />;
  if (loading) return <Loading />;

  return (
    <>
      <PostForm {...props} />
    </>
  );
};

export default EditPost;
