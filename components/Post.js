"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { readingTime } from "reading-time-estimator";

const Post = ({ post }) => {

  return (
    <>
      <Row className="mb-5">
        <Col xs="12" md="3">
          <Link href={`/posts/${post._id}`}>
            <Image
              src={post.image || `/${post.photo}`}
              alt=""
              width={100}
              height={100}
              className="w-100 h-100"
              style={{objectFit: "contain"}}
            />
          </Link>
        </Col>
        <Col>
          <div>
            {post.languages.map((language, index) => (
              <Link href={`/posts/category/${language}`} key={index} className="text-decoration-none me-3">
                #{language}
              </Link>
            ))}
          </div>
          <Link href={`/posts/${post._id}`} className="text-decoration-none text-black">
            <h1>{post.title}</h1>
          </Link>
          <Row>
            <Col>
              <Image
                src={post.author?.image}
                alt=""
                width={30}
                height={30}
                className="rounded rounded-circle me-2"
              />
              <span>{post.author?.name}</span>
            </Col>
            <Col>
              <p>{readingTime(post.description).text}</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Post;
