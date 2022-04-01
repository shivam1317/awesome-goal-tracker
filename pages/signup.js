import { Box, Input, Button, Square, Link, Text } from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import { BsKey } from "react-icons/bs";
import styles from "../styles/Signup.module.css";

const Signup = () => {
  return (
    <Box
      className={styles.loginContainer}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        className={styles.loginForm}
        h="400px"
        w="380px"
        display="flex"
        p="5px"
        justifyContent="space-evenly"
        flexDirection="column"
        alignItems="center"
      >
        <Text fontSize="2xl" className={styles.heading} fontWeight="bold">
          Sign up
        </Text>
        <Square
          display="flex"
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          w="85%"
          h="15%"
          mt="15px"
          className={styles.formInput}
        >
          <Input
            width="50%"
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
          mt="15px"
          className={styles.formInput}
        >
          <Input
            width="50%"
            placeholder="Password"
            variant="flushed"
            type="password"
          />
          <BsKey size="30px" />
        </Square>
        <Button colorScheme="blue" variant="ghost" className={styles.formInput}>
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
