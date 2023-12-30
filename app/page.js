"use client";

import Error from "@/components/Error";
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
    <Parallax pages={3} style={{left:0, top: 0}} className="position-relative vh-100">
      <Hero />
      <ParallaxLayer offset={1} factor={2} speed={0.3}>
        {error ? <Error /> : isLoading ? <HomeSkeleton /> : 
          <Container className="px-5 position-absolute">
            {posts.map((post) => (
              <Post post={post} key={post._id} />
            ))}
          </Container>
        }
      </ParallaxLayer>
    </Parallax>
    </>
  );
};

export default Posts;
