"use client";

import { login, logout } from "@/redux/userSlice.";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  Button,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import { BiEditAlt, BiLogOut, BiMenu, BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const [search, setSearch] = useState("");
  const [isHero, setIsHero] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const handleColor = () => {
    if (
      window.innerHeight > window.scrollY &&
      window.location.pathname == "/"
    ) {
      setIsHero(true);
    } else {
      setIsHero(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleColor);

    return () => {
      window.removeEventListener("scroll", handleColor);
    };
  }, []);

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

  const handleRouteChange = (url) => {
    router.push(url);
  };

  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      className={`${isHero ? "bg-transparent transition" : "transition"}`}
      fixed="top"
      expand="sm"
    >
      <Container>
        <Navbar.Brand href="#" onClick={() => handleRouteChange("/")}>Blog</Navbar.Brand>
        <Form onSubmit={handleSearch}>
          <Form.Control
            input="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form>
        <Navbar.Toggle className="bg-white">
          <BiMenu />
        </Navbar.Toggle>
        <Navbar.Collapse className="">
          <Nav className="ms-auto">
            {user ? (
              <>
                <Nav.Link
                  onClick={() => handleRouteChange("/posts/createPost")}
                >
                  <Button>
                    Add <BiPlus />
                  </Button>
                </Nav.Link>

                <NavDropdown
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
                  <NavDropdown.Item
                    onClick={() => handleRouteChange("/auth/update")}
                  >
                    <BiEditAlt /> Edit Account
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>
                    <BiLogOut /> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link onClick={() => handleRouteChange("/auth/login")}>
                  <Button variant="light">Login</Button>
                </Nav.Link>
                <Nav.Link onClick={() => handleRouteChange("/auth/register")}>
                  <Button variant="outline-primary">Create an account</Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
