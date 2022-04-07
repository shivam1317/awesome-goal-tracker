import React from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import { Box, Button } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <ToastContainer />
      </Box>
    </>
  );
}

export default Home;
