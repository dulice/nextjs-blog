"use client";

import Error from "@/components/Error";
import HomeSkeleton from "@/components/HomeSkeleton";
import Post from "@/components/Post";
import { fetcher } from "@/utlis/helper";
import { useParams } from "next/navigation";
import { Container } from "react-bootstrap";
import useSWR from "swr";

const Languages = () => {
  const { language } = useParams();
  const {
    data: posts,
    isLoading,
    error,
  } = useSWR(`/api/posts/category/${language}`, fetcher);

  if (error) return <Error />;
  if (isLoading) return <HomeSkeleton />;
  return (
    <div>
      <Container className="px-5" style={{marginTop: '5rem'}}>
        {posts.length > 0 &&
          posts.map((post) => <Post post={post} key={post._id} />)}
      </Container>
    </div>
  );
};

export default Languages;
