import Post from "@/components/Post";
import React, { Suspense } from "react";
import { getPosts } from "./actions/posts";
import HomeSkeleton from "@/components/HomeSkeleton";

export const metadata = {
  title: "Web Hub",
  description: "Social Nextwork for software developer",
};

export default async function Page() {
  const posts = await getPosts();
  return (
    <div className="container p-5">
      <Suspense fallback={<HomeSkeleton />}>
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </Suspense>
    </div>
  );
}
