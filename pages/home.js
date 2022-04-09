import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import { Box, Button, Text } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/Dashboard.module.css";
import Navbar from "../Components/Navbar";
import Image from "next/image";

const progress = () => {
  let colors = {
    dark: "#2dc22f",
    light: "#7ee07f",
  };

  let progressBar = document.querySelector("#circularProgress");
  let valueContainer = document.querySelector("#valueContainer");
  let progressValue = 0;
  let progressEndValue = 90;
  let speed = 20;
  if (progressEndValue >= 0 && progressEndValue < 40) {
    colors.light = "#e8765f";
    colors.dark = "#ed4b2b";
  } else if (progressEndValue >= 40 && progressEndValue < 80) {
    colors.light = "#d99d6f";
    colors.dark = "#e37622";
  }
  // console.log("i got triggered!");

  let progress = setInterval(() => {
    progressValue++;

    valueContainer.textContent = `${progressValue}%`;
    progressBar.style.background = `conic-gradient(
            ${colors.dark} ${progressValue * 3.6}deg,
            ${colors.light} ${progressValue * 3.6}deg
        )`;

    if (progressValue == progressEndValue) {
      clearInterval(progress);
    }
  }, speed);
};

function Home() {
  const [displayName, setDisplayName] = useState("");
  const router = useRouter();
  const [user] = useAuthState(auth);
  useEffect(() => {
    progress();
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

  return (
    <>
      <Box
        // display="flex"
        // justifyContent="center"
        // alignItems="center"
        w="100%"
        h="100vh"
        flexDirection="column"
        className={styles.container}
      >
        <Navbar />
        <Box
          w="100%"
          h="fit-content"
          // border="2px solid red"
          display="flex"
          justifyContent="center"
          alignItems="center"
          p="5"
          // border="2px solid red"
        >
          <Box
            mt="100px"
            w="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Text mx="2" fontSize="xl">
              Welcome {displayName}
            </Text>
            <Image
              src="/Home/waving-hi.gif"
              width={35}
              height={35}
              alt="waving"
              className={styles.wave}
            />
          </Box>
          {/* <Button onClick={logoutUser} mx="10">
            Logout
          </Button> */}
        </Box>
        <ToastContainer />
        <Box
          m="10"
          p="5"
          // border="2px solid red"
          w={{ lg: "30%", base: "85%" }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          className={styles.progressContainer}
        >
          <div className={styles.circularProgress} id="circularProgress">
            <div className={styles.valueContainer} id="valueContainer">
              0%
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
}

export default Home;
