import {
  Box,
  Input,
  Button,
  Square,
  Link,
  Text,
  LightMode,
} from "@chakra-ui/react";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    const id = toast.loading("Logging in...");
    console.log("Logging in...");
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      toast.update(id, {
        render: "Successfully logged in!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });
      console.log(user);
      router.push("/home");
    } catch (error) {
      console.log(error.message);
      toast.update(id, {
        render: "Invalid email or password!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });
      setUserDetails({
        email: "",
        password: "",
      });
    }
  };
  const googleLogin = async (e) => {
    e.preventDefault();
    const id = toast.loading("Logging in with google...");
    try {
      const provider = new GoogleAuthProvider();
      const userDetail = await signInWithPopup(auth, provider);
      toast.update(id, {
        render: "Login successfull",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });
      router.push("/home");
    } catch (error) {
      console.log(error.message);
      toast.update(id, {
        render: "Google auth failed!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
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
              _placeholder={{ color: "gray.500" }}
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
          <ToastContainer />
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
    </LightMode>
  );
}

export default Login;
