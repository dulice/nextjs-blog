"use client";

import Error from "@/components/Error";
import HomeSkeleton from "@/components/HomeSkeleton";
import Post from "@/components/Post";
import { fetcher } from "@/utlis/helper";
import { Container } from "react-bootstrap";
import useSWR from "swr";

const Posts = () => {
  const { data: posts, isLoading, error } = useSWR("/api/posts", fetcher);

  if (error) return <Error />;
  if (isLoading) return <HomeSkeleton />;
  return (
    <>
      <Container className="px-5">
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </Container>
    </>
  );
};

export default Posts;
