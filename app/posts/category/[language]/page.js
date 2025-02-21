import { getCategories } from "@/app/actions/category";
import HomeSkeleton from "@/components/HomeSkeleton";
import Post from "@/components/Post";
import { Suspense } from "react";

const Languages = async ({ params: { language } }) => {
  const posts = await getCategories(language);
  return (
    <Suspense fallback={<HomeSkeleton />}>
      <div className="container px-5" style={{ marginTop: "5rem" }}>
        {posts.length > 0 &&
          posts.map((post) => <Post post={post} key={post._id} />)}
      </div>
    </Suspense>
  );
};

export default Languages;
