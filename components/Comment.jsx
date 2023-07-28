import Image from "next/image";
import { Alert, Card, Col, Row } from "react-bootstrap";
import moment from "moment";
import useSwr from "swr";
import { useParams } from "next/navigation";
import Error from "./Error";
import CommentSkeleton from "./CommentSkeleton";
import { fetcher } from "@/utlis/helper";

const Comment = () => {
  const { postId } = useParams();
  const { data: comments, isLoading, error } = useSwr(`/api/comment/${postId}`, fetcher);
  
  if (error) return <Error />;
  if (isLoading) return <CommentSkeleton />;

  return (
    <Card className="my-3">
      <Card.Header>
        <p className="h6">Comments</p>
      </Card.Header>
      <Card.Body>
        {comments.length < 1 ? (
          <Alert variant="warning">No Comment Yet</Alert>
        ) : (
          comments?.map((comment) => (
            <div key={comment._id}>
              <Row>
                <Col xs={1}>
                  <Image
                    src={comment.image}
                    alt=""
                    width={30}
                    height={30}
                    className="rounded rounded-circle me-2"
                    unoptimized
                  />
                </Col>
                <Col>
                  <div className="d-flex">
                    <span className="fw-bold small mb-0">{comment.name}</span>
                    <span className="mx-1 small">:</span>
                    <span className="small text-black-50">
                      {moment(comment.createdAt).format("DD MMM YYYY")}
                    </span>
                  </div>
                  <p>{comment.comment}</p>
                </Col>
              </Row>
            </div>
          ))
        )}
      </Card.Body>
    </Card>
  );
};

export default Comment;
