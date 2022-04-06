import { Box, Input, Button, Square, Link, Text } from "@chakra-ui/react";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { BsKey } from "react-icons/bs";
import styles from "../styles/Signup.module.css";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";

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
    const { username, email, password } = userDetails;
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: username,
      });
      router.push("/home");
    } catch (error) {
      // Show different popups on different errors:
      // 1. Firebase: Error (auth/email-already-in-use).
      // 2. Firebase: Password should be at least 6 characters (auth/weak-password).
      console.log(error.message);
      setUserDetails({
        username: "",
        email: "",
        password: "",
      });
    }
  };

  return (
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
        <Text>
          {"Already registered?"}
          <Link color="blue.600" href="/login">
            {" "}
            Login
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

export default Signup;
