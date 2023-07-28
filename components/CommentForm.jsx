import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button, Card, Form, FormControl, Stack } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useSWRConfig } from "swr";

const CommentForm = ({ postId }) => {
  const { mutate } = useSWRConfig();
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!user) {
      return router.push('/auth/login');
    } else {
      setIsLoading(true);
      try {
        await axios.post("/api/comment", {
          comment,
          postId,
          image: user.image,
          name: user.name
        });
        mutate(`/api/comment/${postId}`)
        setIsLoading(false);
        setComment("");
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  };
  return (
    <div>
      <Card>
        <Card.Header>Write your suggestion</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Stack gap={3}>
              <FormControl
                as="textarea"
                rows={5}
                placeholder="Write Comment.."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div className="d-flex justify-content-end">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Adding Comment" : "Add Comment"}
                </Button>
                {/* <Button type="submit">Add Comment</Button> */}
              </div>
            </Stack>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CommentForm;
