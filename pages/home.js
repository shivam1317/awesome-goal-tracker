import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase-config";
import {
  Box,
  Button,
  Text,
  useDisclosure,
  Input,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/Dashboard.module.css";
import Navbar from "../Components/Navbar";
import Image from "next/image";
import { setDoc, doc, collection, getDoc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import Tasks from "../Components/Tasks";
import Meetings from "../Components/Meetings";
import Notes from "../Components/Notes";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";

function Home() {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tasks] = useCollection(collection(db, "Tasks"));
  const [displayName, setDisplayName] = useState("");
  const taskInput = useRef("");
  const router = useRouter();
  const [user] = useAuthState(auth);
  const progress = async (currdisplayName) => {
    const docRef = await doc(db, "Tasks", currdisplayName);
    const docSnap = await getDoc(docRef);
    let taskLength = 0,
      count = 0;
    if (docSnap.exists()) {
      let currTaskChecker = docSnap.data().taskChecker;
      if (currTaskChecker === undefined) {
        taskLength = 0;
      } else {
        taskLength = currTaskChecker.length;
        currTaskChecker.map((task) => {
          if (task.completed) {
            count = count + 1;
          }
        });
      }
    }
    let colors = {
      dark: "#2dc22f",
      light: "#7ee07f",
    };

    let progressBar = document.querySelector("#circularProgress");
    let valueContainer = document.querySelector("#valueContainer");
    let progressValue = 0;
    let progressEndValue = parseInt((100 * count) / taskLength);
    if (isNaN(progressEndValue)) {
      progressEndValue = 0;
    }
    console.log(progressEndValue);
    // let progressEndValue = 10;
    let speed = 20;
    if (progressEndValue >= 0 && progressEndValue < 40) {
      colors.light = "#e8765f";
      colors.dark = "#ed4b2b";
    } else if (progressEndValue >= 40 && progressEndValue < 80) {
      colors.light = "#d99d6f";
      colors.dark = "#e37622";
    }
    if (progressEndValue == 0) {
      valueContainer.textContent = `${progressValue}%`;
      progressBar.style.background = `conic-gradient(
              ${colors.dark} ${progressValue * 3.6}deg,
              ${colors.light} ${progressValue * 3.6}deg
          )`;
    } else {
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
    }
  };
  useEffect(() => {
    onAuthStateChanged(auth, (currUser) => {
      if (currUser) {
        progress(currUser.displayName);
      }
    });

    if (!user) {
      router.push("/login");
    }
  });

  onAuthStateChanged(auth, (currUser) => {
    if (currUser) {
      setDisplayName(currUser.displayName);
    }
  });
  const addTask = async (e) => {
    e.preventDefault();
    const task = taskInput.current.value;
    const docRef = doc(db, "Tasks", displayName);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let currTasks = docSnap.data().task;
      let currTaskChecker = docSnap.data().taskChecker;
      if (currTaskChecker == undefined) {
        currTaskChecker = [];
      }
      if (currTasks === undefined) {
        currTasks = [];
      }
      if (task) {
        currTasks.push(task);
        currTaskChecker.push({
          taskName: task,
          completed: false,
        });
        await setDoc(doc(db, "Tasks", displayName), {
          task: currTasks,
          taskChecker: currTaskChecker,
        });
        onClose();
        taskInput.current.value = "";
      }
    } else {
      let currTasks = [];
      let currTaskChecker = [];
      if (task) {
        currTasks.push(task);
        currTaskChecker.push({
          taskName: task,
          completed: false,
        });
        await setDoc(doc(db, "Tasks", displayName), {
          task: currTasks,
          taskChecker: currTaskChecker,
        });
        onClose();
        taskInput.current.value = "";
      }
    }
  };
  const clearData = () => {
    onClose();
    taskInput.current.value = "";
  };

  // Dark mode config
  const bg = useColorModeValue("#f2f2f2", "#242d3b");
  const meetbg = useColorModeValue("#f1efef", "#242d3b");
  return (
    <>
      <Box
        // display="flex"
        // justifyContent="center"
        // alignItems="center"
        backgroundColor={bg}
        w="100%"
        h="100vh"
        flexDirection="column"
        className={styles.container}
      >
        <Navbar />
        <Box
          w="100%"
          h="fit-content"
          display="flex"
          justifyContent="center"
          alignItems="center"
          p="5"
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
        </Box>
        <ToastContainer />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          w="100%"
          flexWrap="wrap"
          // border="2px solid red"
          h={{ lg: "430px", base: "fit-content" }}
          p="6"
          backgroundColor={bg}
          id="todo"
        >
          <Box
            m="10"
            w={{ lg: "30%", base: "100%" }}
            display="flex"
            h="90%"
            justifyContent="center"
            alignItems="center"
            className={
              colorMode == "light"
                ? styles.progressContainer
                : styles.progressContainerDark
            }
            flexDirection="column"
          >
            <Text
              backgroundColor="#6d71b6"
              color="white"
              textAlign="center"
              w="100%"
              p="4"
              mb="4"
              fontSize="xl"
              borderRadius="30px 30px 0px 0px"
              boxShadow="rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"
            >
              Your progress
            </Text>
            <Box
              className={
                colorMode == "light"
                  ? styles.circularProgress
                  : styles.circularProgressDark
              }
              background={bg}
              id="circularProgress"
              mb="4"
            >
              <Box
                className={styles.valueContainer}
                id="valueContainer"
                color={colorMode == "dark" ? "white" : "black"}
              >
                0%
              </Box>
            </Box>
          </Box>
          <Modal isOpen={isOpen} onClose={clearData}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add a Task</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl my="2" isRequired>
                  <FormLabel htmlFor="name">Task Name</FormLabel>
                  <Input id="name" type="text" ref={taskInput} />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  variant="outline"
                  mr={3}
                  onClick={onClose}
                >
                  Close
                </Button>
                <Button variant="solid" colorScheme="purple" onClick={addTask}>
                  Submit
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Box
            w={{ lg: "60%", base: "95%" }}
            h={{ lg: "100%", base: "50%" }}
            // p="2"
            my="4"
            className={
              colorMode == "light"
                ? styles.progressContainer
                : styles.progressContainerDark
            }
          >
            <Box
              display="flex"
              justifyContent="space-between"
              p="4"
              alignItems="center"
              className={styles.headDiv}
              h="20%"
            >
              <Text fontSize="xl" mx="4" color="white">
                Your Todo List
              </Text>
              <Button size="md" onClick={onOpen} mx="4">
                Add Task
              </Button>
            </Box>
            <Box
              // my="2"

              p="4"
              overflowY="scroll"
              h={{ lg: "80%", base: "300px" }}
              sx={{
                "&::-webkit-scrollbar": {
                  width: "10px",
                  borderRadius: "8px",
                  backgroundColor: colorMode == "light" ? "#f2f2f2" : "2D3748",
                  cursor: "pointer",
                },
                "&::-webkit-scrollbar-thumb": {
                  borderRadius: "8px",
                  backgroundColor: `#6d71b6`,
                },
              }}
            >
              {tasks?.docs.map((taskArr) => {
                if (taskArr.id === displayName) {
                  return taskArr.data().task?.map((e) => {
                    return (
                      <>
                        <Tasks key={e} task={e} />
                      </>
                    );
                  });
                }
              })}
            </Box>
          </Box>
        </Box>
        <Box
          w="100%"
          backgroundColor={meetbg}
          display="flex"
          justifyContent="center"
          alignItems="center"
          id="meeting"
        >
          <Meetings />
        </Box>
        <Box
          w="100%"
          backgroundColor={meetbg}
          display="flex"
          justifyContent="center"
          alignItems="center"
          id="note"
        >
          <Notes />
        </Box>
      </Box>
    </>
  );
}

export default Home;
