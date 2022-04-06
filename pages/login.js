import { Box, Input, Button, Square, Link, Text } from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import { BsKey } from "react-icons/bs";
import styles from "../styles/Login.module.css";
import { FcGoogle } from "react-icons/fc";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase-config.js";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function Login() {
  const [user] = useAuthState(auth);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/home");
    }
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

  const userLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userDetails;

    console.log("Logging in...");
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      router.push("/home");
    } catch (error) {
      console.log(error.message);
      setUserDetails({
        email: "",
        password: "",
      });
    }
  };
  const googleLogin = () => {
    console.log("Doing google login...");
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
        h={{ lg: "420px", base: "450px" }}
        w={{ lg: "400px", base: "90%" }}
        display="flex"
        p={{ lg: "5px", base: "15px" }}
        justifyContent="space-evenly"
        flexDirection="column"
        alignItems="center"
      >
        <Text fontSize="2xl" className={styles.heading} fontWeight="bold">
          Login
        </Text>
        <Square
          display="flex"
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          w="85%"
          h="15%"
          my="8px"
          className={styles.formInput}
        >
          <Input
            width="65%"
            placeholder="Email"
            variant="flushed"
            type="email"
            name="email"
            value={userDetails.email}
            onChange={inputEvent}
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
          my="8px"
          className={styles.formInput}
        >
          <Input
            width="65%"
            variant="flushed"
            placeholder="Password"
            type="password"
            name="password"
            value={userDetails.password}
            onChange={inputEvent}
          />
          <BsKey size="30px" />
        </Square>
        <Button
          colorScheme="blue"
          variant="ghost"
          className={styles.formInput}
          onClick={userLogin}
        >
          {" "}
          Login
        </Button>
        <Square
          display="flex"
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          w="85%"
          h="15%"
          my="8px"
          className={styles.formInput}
          cursor="pointer"
          onClick={googleLogin}
        >
          Continue with <FcGoogle size="25px" />
        </Square>
        <Text>
          {"Haven't registered?"}
          <Link color="blue.600" href="/signup">
            {" "}
            Register now
          </Link>
        </Text>
      </Box>
    </Box>
  );
}

export default Login;
