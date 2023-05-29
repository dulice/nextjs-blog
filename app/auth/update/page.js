"use client";

import { logout } from "@/redux/userSlice.";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button, Container, Form, Image, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export const metadata = {
  title: "Blog | UserProfile",
};

const UpdateUser = () => {
  const { user } = useSelector((state) => state.user);
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setname(user.name);
      setEmail(user.email);
      setImage(user.image);
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== updatePassword)
      return toast.error("Password Do not Match");
    setIsLoading(true);
    try {
      if (user.image !== image) {
        user.publicId &&
          (await axios.put("/api/upload", { publicId: user.publicId }));
        const { data: imageInfo } = await axios.post("/api/upload", { image });
        if (imageInfo) {
          await axios.put(`/api/users/${user._id}`, {
            name,
            email,
            password,
            image: imageInfo.imageUrl,
            publicId: imageInfo.publicId,
          });
        }
      } else {
        await axios.put(`/api/users/${user._id}`, {
          name,
          email,
          password,
        });
      }
      toast.success("User Updated!");
      dispatch(logout());
      router.push('/auth/login')
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Container>
        <Form className="my-3" onSubmit={handleSubmit}>
          <Stack gap={3}>
            <Form.Group className="mx-auto">
              <Form.Label htmlFor="image">
                {image ? (
                  <Image
                    src={image}
                    alt=""
                    height={200}
                    width={200}
                    className="rounded-circle"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <div className="imgFrame">
                    <span>
                      Upload your photo here or{" "}
                      <Button variant="primary">Browse</Button>
                    </span>
                  </div>
                )}
              </Form.Label>
              <Form.Control
                type="file"
                id="image"
                hidden={true}
                onChange={handleImageChange}
                accept="image/*"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="title">name:</Form.Label>
              <Form.Control
                id="title"
                input="text"
                placeholder="name..."
                name="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="title">Email:</Form.Label>
              <Form.Control
                id="title"
                input="text"
                placeholder="email..."
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="title">Password:</Form.Label>
              <Form.Control
                id="title"
                input="text"
                placeholder="password..."
                name="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="title">Reenter Password:</Form.Label>
              <Form.Control
                id="title"
                input="text"
                placeholder="reenter Password..."
                name="retype"
                value={updatePassword}
                onChange={(e) => setUpdatePassword(e.target.value)}
              />
              {updatePassword.length > 0 && updatePassword !== password && (
                <Form.Text className="text-danger">
                  Password do not match
                </Form.Text>
              )}
            </Form.Group>
            <Button type="submit" variant="success" disabled={isLoading}>
              {isLoading ? "Updating" : "Update"}
            </Button>
          </Stack>
        </Form>
      </Container>
    </>
  );
};

export default UpdateUser;
