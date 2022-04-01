import { Box, Input, Button, Square, Link, Text } from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import { BsKey } from "react-icons/bs";
import styles from "../styles/Login.module.css";
import { FcGoogle } from "react-icons/fc";

function login() {
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
        h="420px"
        w="400px"
        display="flex"
        p="5px"
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
            width="150px"
            placeholder="Email"
            variant="flushed"
            type="email"
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
            width="150px"
            variant="flushed"
            placeholder="Password"
            type="password"
          />
          <BsKey size="30px" />
        </Square>
        <Button colorScheme="blue" variant="ghost" className={styles.formInput}>
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

export default login;
