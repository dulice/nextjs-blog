"use client";

import PostForm from "@/components/Form";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const CreatePost = () => {
  const { user } = useSelector((state) => state.user);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [languages, setLanguages] = useState([]);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/upload", { image });
      if (data) {
        await axios.post("/api/posts", {
          title,
          description,
          languages,
          image: data.imageUrl,
          publicId: data.publicId,
          author: {
            name: user.name,
            email: user.email,
            image: user.image,
          },
        });
        router.push("/");
      } else {
        setErrorMessage("Data not found");
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const props = {
    title,
    errorMessage,
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

export default CreatePost;
