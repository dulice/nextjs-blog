"use client";

import { logout } from "@/redux/userSlice.";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
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
  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/posts/search/${search}`);
  };

  const handleLogout = () => {
    signOut({callbackUrl: '/auth/login'});
    dispatch(logout());
  }
  return (
    <Navbar bg="light" className="border mb-5" sticky="top">
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
              <DropdownButton variant="light"
                title={
                  <Image
                    src={user.image}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-circle"
                    style={{ objectFit: "cover" }}
                  />
                }
              >
                <>
                  <Link href={`/auth/update`} className="text-decoration-none text-black-50 ms-3 mb-3"><BiEditAlt /> Edit Account</Link>
                </>
                <Dropdown.Item>
                  <Button variant="danger" onClick={handleLogout}><BiLogOut /> Logout</Button>
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
