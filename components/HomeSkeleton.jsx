import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HomeSkeleton = () => {
  return (
    <div className="container px-5">
      {[...Array(4)].map((_, i) => (
        <SkeletonTheme key={i} baseColor="#e2e2e2" highlightColor="#eee">
          <div className="row mb-5">
            <div className="col-3 col-md-12">
              <Skeleton height={100} />
            </div>
            <div className="col">
              <Skeleton width={100} />
              <Skeleton count={2} />
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <Skeleton circle width={50} height={50} />
                  <Skeleton width={100} className="ms-3" />
                </div>
                <Skeleton width={100} />
              </div>
            </div>
          </div>
        </SkeletonTheme>
      ))}
    </div>
  );
};

export default HomeSkeleton;
