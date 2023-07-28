import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const CommentSkeleton = () => {
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <SkeletonTheme baseColor="#e2e2e2" highlightColor="#eee" key={i}>
          <div className="d-flex mb-3">
            <Skeleton circle height={50} width={50} />
            <Skeleton count={2} width={200} />
          </div>
        </SkeletonTheme>
      ))}
    </>
  );
};

export default CommentSkeleton;
