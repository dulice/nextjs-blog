"use client";

import Loading from "@/components/Loading";
import Post from "@/components/Post";
import { login } from "@/redux/userSlice.";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

export const metadata = {
  title: "Blog",
  description: "Social Nextwork for software developer",
};

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get("/api/posts");
        setIsLoading(false);
        setPosts(data);
      } catch (err) {
        setIsLoading(false);
        if(err.response.data) {
          toast.error(err.response.data.message);
        }
        console.log(err);
      }
    }
    fetchPost();
  },[]);

  useEffect(() => {
    const fetchUser = async () => {
      if (session) {
        dispatch(login(session.user));
      }
    };
    fetchUser();
  }, [session, dispatch]);

  if (isLoading) return <Loading />;
  return (
    <>
      <Container className="px-5">
        {posts.map((post) => <Post post={post} key={post._id} />)}
      </Container>
      <ToastContainer position="top-center" />
    </>
  );
};

export default Posts;