import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HomeSkeleton = () => {
  return (
    <Container className="px-5">
      {[...Array(4)].map((_, i) => (
        <SkeletonTheme
          key={i}
          baseColor="#e2e2e2"
          highlightColor="#eee"
        >
          <Row className="mb-5">
            <Col xs="12" md="3">
              <Skeleton height={100} />
            </Col>
            <Col>
              <Skeleton width={100} />
              <Skeleton count={2} />
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <Skeleton circle width={50} height={50} />
                  <Skeleton width={100} className="ms-3" />
                </div>
                <Skeleton width={100} />
              </div>
            </Col>
          </Row>
        </SkeletonTheme>
      ))}
    </Container>
  );
};

export default HomeSkeleton;
