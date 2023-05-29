"use client";

import PostForm from "@/components/Form";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CreatePost = () => {
  const { user } = useSelector(state => state.user);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [languages, setLanguages] = useState([]);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
            image: user.image,
          },
        });
        router.push("/");
      } else {
        toast.error("Data not found")
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error);
    }
  };

  const props = {title, setTitle, description, setDescription, languages, setLanguages, image, setImage, isLoading, handleSubmit}

  return (
    <>
      <PostForm {...props}/>
    </>
  );
};

export default CreatePost;
