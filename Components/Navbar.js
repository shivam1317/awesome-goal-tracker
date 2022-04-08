import React from "react";
import { Box, Hide, Show, Text, CloseButton } from "@chakra-ui/react";
import Link from "next/link";
import styles from "../styles/Dashboard.module.css";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { useRouter } from "next/router";

const Navbar = () => {
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
      <Box className={styles.navbar} display="flex" flexDirection="column">
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
              <Link href="#">
                <a className={styles.navlink}>Todo</a>
              </Link>
              <Link href="#">
                <a className={styles.navlink}>Meetings</a>
              </Link>
              <Link href="#">
                <a className={styles.navlink}>Notes</a>
              </Link>
              <Text cursor="pointer">
                <a className={styles.navlink} onClick={logoutUser}>
                  Logout
                </a>
              </Text>
            </Box>
            <ToastContainer />
          </Show>
          <Hide above="md">
            {show ? (
              <CloseButton size="md" onClick={toggle} />
            ) : (
              <span className={styles.menu}>
                <FiMenu onClick={toggle} cursor="pointer" mx="5" />
              </span>
            )}
          </Hide>
        </Box>
        {show ? (
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
            <Link href="#">
              <a className={styles.menuLink}>Todo</a>
            </Link>
            <Link href="#">
              <a className={styles.menuLink}>Meetings</a>
            </Link>
            <Link href="#">
              <a className={styles.menuLink}>Notes</a>
            </Link>
            <Link href="#">
              <a className={styles.menuLink}>Logout</a>
            </Link>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Navbar;
