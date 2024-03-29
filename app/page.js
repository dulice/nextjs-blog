"use client";

import Error from "@/components/Error";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HomeSkeleton from "@/components/HomeSkeleton";
import Post from "@/components/Post";
import { fetcher } from "@/utlis/helper";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Container } from "react-bootstrap";
import useSWR from "swr";

const Posts = () => {
  const { data: posts, isLoading, error } = useSWR("/api/posts", fetcher);

  return (
    <>
      <Parallax
        pages={3}
        style={{ left: 0, top: 0 }}
        className="position-relative vh-100"
      >
        <Hero />
        <ParallaxLayer offset={1} factor={2} speed={0.3}>
          {error ? (
            <Error />
          ) : isLoading ? (
            <HomeSkeleton />
          ) : (
            <div className="position-absolute w-100">
              <Container className="px-5 ">
                {posts.map((post) => (
                  <Post post={post} key={post._id} />
                ))}
              </Container>
              <Footer className="bottom-0" />
            </div>
          )}
        </ParallaxLayer>
      </Parallax>
    </>
  );
};

export default Posts;
