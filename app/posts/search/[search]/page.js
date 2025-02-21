import { searchPosts } from "@/app/actions/posts";
import HomeSkeleton from "@/components/HomeSkeleton";
import Post from "@/components/Post";
import Link from "next/link";
import { Suspense } from "react";

const Search = async ({ params: { search } }) => {
  const posts = await searchPosts(search);

  return (
    <Suspense fallback={<HomeSkeleton />}>
      <div className="container px-5" style={{ marginTop: "5rem" }}>
        {posts.length <= 0 ? (
          <div className="alert alert-danger">
            The title you are finding not include in our blog. We are having
            interesting blog you might like, go to{" "}
            <Link href="/">Homepage</Link>
          </div>
        ) : (
          posts.map((post) => <Post post={post} key={post._id} />)
        )}
      </div>
    </Suspense>
  );
};

export default Search;
