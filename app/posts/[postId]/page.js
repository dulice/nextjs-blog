"use client";

import Comment from "@/components/Comment";
import CommentForm from "@/components/CommentForm";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import MdxComponent from "@/components/mdxComponent";
import { usePost } from "@/utlis/fetch";
import axios from "axios";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Container, Dropdown, DropdownButton } from "react-bootstrap";
import { BiDotsVerticalRounded, BiEdit, BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import { readingTime } from "reading-time-estimator";

const SinglePost = () => {
  const { user } = useSelector((state) => state.user);
  const { postId } = useParams();
  const route = useRouter();
  const [deleteing, setDeleting] = useState(false);

  const { post, error, isLoading } = usePost(postId);
  console.log(post);

  const handleDelte = async () => {
    setDeleting(true);
    await axios.delete(`/api/posts/${postId}`);
    await axios.put("/api/upload", { publicId: post.publicId });
    setDeleting(false);
    route.push("/");
  };
  if (error) return <Error />;
  if (isLoading) return <Loading />;
  return (
    <>
      <Container style={{ marginTop: "5rem" }}>
        {deleteing && <Loading />}
        {user && user.email === post.author?.email && (
          <DropdownButton
            variant="secondary"
            align="end"
            id="menu"
            title={<BiDotsVerticalRounded />}
            className="text-end mb-3">
            <Dropdown.Item
              onClick={() => route.push(`/posts/editPost/${postId}`)}>
              Edit Post <BiEdit />
            </Dropdown.Item>
            <Dropdown.Item onClick={handleDelte} className="text-danger">
              Delete <BiTrash />
            </Dropdown.Item>
          </DropdownButton>
        )}
        <>
          <Image
            src={post.image}
            alt=""
            width={300}
            height={400}
            className="w-100 rounded pb-3"
            style={{ objectFit: "cover" }}
            unoptimized
          />
          <div className="px-sm-5 px-1">
            <div className="d-flex justify-content-between align-items-baseline">
              <div className="d-flex align-items-center my-3">
                <Image
                  src={post.author?.image}
                  alt=""
                  width={40}
                  height={40}
                  className="rounded rounded-circle me-2"
                />
                <div>
                  <span>{post.author?.name}</span>
                  <small className="text-white-50 d-block text-sm">
                    Posted On: {moment(post.createdAt).format("DD MMM YYYY")}
                  </small>
                </div>
              </div>
              <div>
                <p className="text-white-50">
                  {readingTime(post.description, 180).text}
                </p>
              </div>
            </div>
            <h1>{post.title}</h1>
            {post.languages.map((language, index) => (
              <Link
                className="text-white-50 me-3 text-decoration-none"
                href={`/posts/category/${language}`}
                key={index}>
                #{language}
              </Link>
            ))}
            <MdxComponent description={post.description} />
            <CommentForm postId={postId} />
            <Comment />
          </div>
        </>
      </Container>
    </>
  );
};

export default SinglePost;
