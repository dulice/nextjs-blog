"use client";

import Loading from "@/components/Loading";
import Post from "@/components/Post";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

const Languages = () => {
  const { language } = useParams();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/posts/category/${language}`);
        const posts = await res.json();
        setPosts(posts);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        toast.error(err);
      }
    }
    fetchPost();
  },[language]);

  if (isLoading) return <Loading />;
  return (
    <div>
      <Container className="px-5">
        {posts.length > 0 && posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </Container>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Languages;
