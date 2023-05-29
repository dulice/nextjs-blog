"use client";

import Loading from "@/components/Loading";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Container, Dropdown, DropdownButton } from "react-bootstrap";
import { BiDotsVerticalRounded, BiEdit, BiTrash } from "react-icons/bi";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useSelector } from "react-redux";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "react-toastify";
import { readingTime } from "reading-time-estimator";

const SinglePost = () => {
  const { user } = useSelector((state) => state.user);
  const { postId } = useParams();
  const route = useRouter();
  const [deleteing, setDeleting] = useState(false);
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/posts/${postId}`, {
          cache: "force-cache",
        });
        const post = await res.json();
        setPost(post);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        toast.error(err);
      }
    };
    fetchPost();
  }, [postId]);

  const handleDelte = async () => {
    setDeleting(true);
    await axios.delete(`/api/posts/${postId}`);
    await axios.put("/api/upload", { publicId: post.publicId });
    setDeleting(false);
    route.push("/");
  };
  if (isLoading) return <Loading />;
  return (
    <>
      <Container>
        {deleteing && <Loading />}
        {user && (
          <DropdownButton
            variant="light"
            id="menu"
            title={<BiDotsVerticalRounded />}
            className="text-end mb-3"
          >
            <Link
              href={`/posts/editPost/${postId}`}
              className="text-decoration-none text-black-50 ms-3 mb-3"
            >
              Edit Post <BiEdit />
            </Link>
            <Dropdown.Item onClick={handleDelte} className="text-danger">
              Delete <BiTrash />
            </Dropdown.Item>
          </DropdownButton>
        )}
        {post && (
          <>
            <Image
              src={post.image}
              alt=""
              width={300}
              height={400}
              className="w-100 rounded pb-3"
              style={{ objectFit: "cover" }}
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
                    <small className="text-black-50 d-block text-sm">
                      Posted On: {post.createdAt.substring(0, 10)}
                    </small>
                  </div>
                </div>
                <div>
                  <p className="text-black-50">
                    {readingTime(post.description).text}
                  </p>
                </div>
              </div>
              <h1>{post.title}</h1>
              {post.languages.map((language, index) => (
                <Link
                  className="text-black-50 me-3 text-decoration-none"
                  href={`/posts/category/${language}`}
                  key={index}
                >
                  #{language}
                </Link>
              ))}
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        {...props}
                        style={coldarkDark}
                        language={match[1]}
                        PreTag="div"
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code {...props}>{children}</code>
                    );
                  },
                }}
              >
                {post.description}
              </ReactMarkdown>
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default SinglePost;
