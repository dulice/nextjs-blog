"use client";

import Loading from "@/components/Loading";
import Post from "@/components/Post";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";

const Search = ({ params }) => {
  const { search } = params;
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/posts/search/${search}`);
        const posts = await res.json();
        setPosts(posts);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        toast.error(err);
      }
    }
    fetchPost();
  },[search]);
  if (isLoading) return <Loading />;
  return (
    <div>
      <Container className="px-5">
        {posts.length <= 0 ? (
          <Alert variant="danger">
            The title you are finding not include in our blog. We are having interesting blog you might like, go to <Link href="/blog/posts">Homepage</Link>
          </Alert>
        ) : (
          posts.map((post) => <Post post={post} key={post._id} />)
        )}
      </Container>
    </div>
  );
};

export default Search;
export const dynamic = "error";
export const dynamicParams = false;
export async function generateStaticParams({ params: search }) {
  const products = await fetch(`/api/posts/search/${search}`).then((res) =>
    res.json()
  );

  return products.map((product) => ({
    product: product._id,
  }));
}
