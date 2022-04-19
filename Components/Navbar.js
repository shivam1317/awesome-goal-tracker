import React from "react";
import {
  Box,
  Hide,
  Show,
  Text,
  CloseButton,
  useColorMode,
} from "@chakra-ui/react";
import NextLink from "next/link";
import styles from "../styles/Dashboard.module.css";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { useRouter } from "next/router";
import { Link, animateScroll as scroll } from "react-scroll";
import { BsFillMoonFill, BsSunFill } from "react-icons/bs";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const logoutUser = async (e) => {
    e.preventDefault();
    const id = toast.loading("Logging out...");
    signOut(auth)
      .then(() => {
        console.log("Signed out successfully!");
        router.push("/login");
        toast.update(id, {
          render: "Logout successful..",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      })
      .catch(() => {
        toast.update(id, {
          render: "Logout Failed!",
          type: "error",
          isLoading: false,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        console.log("Some error occured!");
      });
  };
  const [show, setShow] = useState(false);
  const toggle = () => {
    if (!show) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  return (
    <>
      <Box
        className={styles.navbar}
        display="flex"
        flexDirection="column"
        position="fixed"
      >
        <Box
          display="flex"
          justifyContent={{ lg: "space-between", md: "space-evenly" }}
          alignItems="center"
          p="6"
        >
          <Text
            fontSize="xl"
            w={{ lg: "40%", md: "45%", base: "75%" }}
            mx="5"
            fontWeight="bold"
          >
            Awesome-Goal-Tracker
          </Text>
          <Show above="md">
            <Box
              display="flex"
              justifyContent="space-evenly"
              alignItems="center"
              w="45%"
            >
              <NextLink href="#" passHref>
                <Link
                  to="todo"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className={styles.navlink}
                >
                  Todo
                </Link>
              </NextLink>
              <NextLink href="#" passHref>
                <Link
                  to="meeting"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className={styles.navlink}
                >
                  Meetings
                </Link>
              </NextLink>
              <NextLink href="#" passHref>
                <Link
                  to="note"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className={styles.navlink}
                >
                  Notes
                </Link>
              </NextLink>
              <Text cursor="pointer">
                <a className={styles.navlink} onClick={logoutUser}>
                  Logout
                </a>
              </Text>
              <Text
                cursor="pointer"
                className={styles.navlink}
                onClick={toggleColorMode}
              >
                {colorMode == "light" ? (
                  <BsFillMoonFill color="white" />
                ) : (
                  <BsSunFill />
                )}
              </Text>
            </Box>
            <ToastContainer />
          </Show>
          <Hide above="md">
            {show ? (
              <CloseButton size="md" onClick={toggle} />
            ) : (
              <span className={styles.menu}>
                <FiMenu onClick={toggle} mx="5" />
              </span>
            )}
          </Hide>
        </Box>
        {show ? (
          <>
            <hr className={styles.navhr} />
            <Box
              display="flex"
              w="100%"
              flexDirection="column"
              justifyContent="space-evenly"
              alignItems="center"
              border="2px soild red"
              p="3"
              transition="all 1s ease-in-out"
            >
              <NextLink href="#" passHref>
                <Link
                  className={styles.menuLink}
                  to="todo"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  Todo
                </Link>
              </NextLink>
              <NextLink href="#" passHref>
                <Link
                  className={styles.menuLink}
                  to="meeting"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  Meetings
                </Link>
              </NextLink>
              <NextLink href="#" passHref>
                <Link
                  className={styles.menuLink}
                  to="note"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  Notes
                </Link>
              </NextLink>
              <NextLink href="#" passHref>
                <a className={styles.menuLink} onClick={logoutUser}>
                  Logout
                </a>
              </NextLink>
              <Text
                cursor="pointer"
                className={styles.navlink}
                onClick={toggleColorMode}
              >
                {colorMode == "light" ? (
                  <BsFillMoonFill color="white" />
                ) : (
                  <BsSunFill />
                )}
              </Text>
            </Box>
          </>
        ) : null}
      </Box>
    </>
  );
};

export default Navbar;
