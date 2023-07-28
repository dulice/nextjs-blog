"use client";

import { login, logout } from "@/redux/userSlice.";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  Button,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Navbar,
} from "react-bootstrap";
import { BiEditAlt, BiLogOut, BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUser = async () => {
      if (session) {
        dispatch(login(session.user));
      }
    };
    fetchUser();
  }, [session, dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/posts/search/${search}`);
    setSearch("");
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/auth/login" });
    dispatch(logout());
  };

  const handleEdit = () => {
    router.push("/auth/update");
  };
  return (
    <Navbar bg="light" className="border mb-3" sticky="top">
      <Container>
        <Navbar.Brand>
          <Link href={"/"} className="text-decoration-none text-bl">
            Blog
          </Link>
        </Navbar.Brand>
        <Form onSubmit={handleSearch}>
          <Form.Control
            input="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end gap-3">
          {user ? (
            <>
              <Button variant="light">
                <Link
                  href="/posts/createPost"
                  className="text-decoration-none text-black"
                >
                  Add <BiPlus />
                </Link>
              </Button>
              <DropdownButton
                variant="light"
                title={
                  <Image
                    src={user.image}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-circle"
                    style={{ objectFit: "cover" }}
                    unoptimized
                  />
                }
              >
                <Dropdown.Item onClick={handleEdit}>
                  <BiEditAlt /> Edit Account
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>
                  <BiLogOut /> Logout
                </Dropdown.Item>
              </DropdownButton>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="light">Login</Button>
              </Link>

              <Link href="/auth/register">
                <Button variant="outline-primary">Create an account</Button>
              </Link>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
