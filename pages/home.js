import React from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import { Box, Button } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Home() {
  const [displayName, setDisplayName] = useState("");
  const router = useRouter();
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  });
  onAuthStateChanged(auth, (currUser) => {
    if (currUser) {
      setDisplayName(currUser.displayName);
    } else {
    }
  });
  const logoutUser = async (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        console.log("Signed out successfully!");
        router.push("/login");
      })
      .catch(() => {
        console.log("Some error occured!");
      });
  };
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        w="100%"
        h="100vh"
        flexDirection="column"
      >
        <div>Hello {displayName}</div>
        <Button onClick={logoutUser}>Logout</Button>
      </Box>
    </>
  );
}

export default Home;
