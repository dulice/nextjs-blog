"use client";

import Error from "@/components/Error";
import HomeSkeleton from "@/components/HomeSkeleton";
import Post from "@/components/Post";
import { fetcher } from "@/utlis/helper";
import Link from "next/link";
import { Alert, Container } from "react-bootstrap";
import useSWR from "swr";

const Search = ({ params }) => {
  const { search } = params;
  const {
    data: posts,
    isLoading,
    error,
  } = useSWR(`/api/posts/search/${search}`, fetcher);

  if (error) return <Error />;
  if (isLoading) return <HomeSkeleton />;
  return (
    <div>
      <Container className="px-5" style={{marginTop: '5rem'}}>
        {posts.length <= 0 ? (
          <Alert variant="danger">
            The title you are finding not include in our blog. We are having
            interesting blog you might like, go to{" "}
            <Link href="/">Homepage</Link>
          </Alert>
        ) : (
          posts.map((post) => <Post post={post} key={post._id} />)
        )}
      </Container>
    </div>
  );
};

export default Search;
// export const dynamic = "error";
// export const dynamicParams = false;
// export async function generateStaticParams({ params: search }) {
//   const products = await fetch(`/api/posts/search/${search}`).then((res) =>
//     res.json()
//   );

//   return products.map((product) => ({
//     product: product._id,
//   }));
// }
