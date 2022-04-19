import {
  Box,
  Input,
  Button,
  Square,
  Link,
  Text,
  LightMode,
} from "@chakra-ui/react";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { BsKey } from "react-icons/bs";
import styles from "../styles/Signup.module.css";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      router.push("/home");
    }
  });

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const inputEvent = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const passwordSignUp = async (e) => {
    e.preventDefault();
    console.log("Creating a user...");
    const id = toast.loading("Signing up...");
    const { username, email, password } = userDetails;
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: username,
      });
      toast.update(id, {
        render: "Successfully logged in!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });
      router.push("/home");
    } catch (error) {
      // Show different popups on different errors:
      // 1. Firebase: Error (auth/email-already-in-use).
      // 2. Firebase: Password should be at least 6 characters (auth/weak-password).
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        toast.update(id, {
          render: "Email is already in use!",
          type: "error",
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
        });
      } else if (
        error.message ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        toast.update(id, {
          render: "Password must be atleast 6 characters",
          type: "error",
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
        });
      } else if (error.message === "Firebase: Error (auth/invalid-email).") {
        toast.update(id, {
          render: "Invalid Email",
          type: "error",
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
        });
      } else {
        toast.update(id, {
          render: "An error occured!",
          type: "error",
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
        });
      }
      console.log(error.message);
      setUserDetails({
        username: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <LightMode>
      <Box
        className={styles.loginContainer}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          className={styles.loginForm}
          h="450px"
          w={{ lg: "400px", base: "90%" }}
          display="flex"
          p={{ lg: "5px", base: "15px" }}
          justifyContent="space-evenly"
          flexDirection="column"
          alignItems="center"
        >
          <Text fontSize="2xl" className={styles.heading} fontWeight="bold">
            Sign Up
          </Text>
          <Square
            display="flex"
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            w="85%"
            h="15%"
            my="5px"
            className={styles.formInput}
          >
            <Input
              width="65%"
              placeholder="Username"
              variant="flushed"
              type="email"
              onChange={inputEvent}
              name="username"
              value={userDetails.username}
              _placeholder={{ color: "gray.500" }}
            />
            <AiOutlineUser size="30px" />
          </Square>
          <Square
            display="flex"
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            w="85%"
            h="15%"
            my="5px"
            className={styles.formInput}
          >
            <Input
              width="65%"
              placeholder="Email"
              variant="flushed"
              type="email"
              onChange={inputEvent}
              name="email"
              value={userDetails.email}
              _placeholder={{ color: "gray.500" }}
            />
            <AiOutlineMail size="30px" />
          </Square>

          <Square
            display="flex"
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            w="85%"
            h="15%"
            my="5px"
            className={styles.formInput}
          >
            <Input
              width="65%"
              placeholder="Password"
              variant="flushed"
              type="password"
              onChange={inputEvent}
              name="password"
              value={userDetails.password}
              _placeholder={{ color: "gray.500" }}
            />
            <BsKey size="30px" />
          </Square>
          <Button
            colorScheme="blue"
            variant="ghost"
            className={styles.formInput}
            onClick={passwordSignUp}
          >
            {" "}
            Sign up
          </Button>
          <ToastContainer />
          <Text>
            {"Already registered?"}
            <Link color="blue.600" href="/login">
              {" "}
              Login
            </Link>
          </Text>
        </Box>
      </Box>
    </LightMode>
  );
};

export default Signup;
