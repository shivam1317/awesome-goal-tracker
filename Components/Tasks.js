import React from "react";
import { Box, Text, useColorMode } from "@chakra-ui/react";
import { BsClipboardCheck } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase-config";
import styles from "../styles/Dashboard.module.css";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const Tasks = (props) => {
  const [user] = useAuthState(auth);
  const { colorMode } = useColorMode();
  const [displayName, setDisplayName] = useState("");
  const [completed, setCompleted] = useState(false);
  const markCompleted = async () => {
    if (user) {
      const docRef = doc(db, "Tasks", user.displayName);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let currTaskChecker = docSnap.data().taskChecker;
        currTaskChecker.map((task) => {
          if (task.completed === true && task.taskName === props.task) {
            setCompleted(true);
          }
        });
      }
    }
  };
  useEffect(() => {
    markCompleted();
  });
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setDisplayName(user.displayName);
    }
  });
  const checkCompleted = async (e) => {
    const docRef = doc(db, "Tasks", displayName);
    const docSnap = await getDoc(docRef);
    setCompleted(!completed);
    if (docSnap.exists()) {
      let currTasks = docSnap.data().task;
      let currTaskChecker = docSnap.data().taskChecker;
      currTaskChecker.map((task) => {
        if (task.taskName === e) {
          task.completed = !task.completed;
        }
      });
      await setDoc(doc(db, "Tasks", displayName), {
        task: currTasks,
        taskChecker: currTaskChecker,
      });
    }
  };
  const deleteTask = async (e) => {
    const docRef = doc(db, "Tasks", displayName);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let currTasks = docSnap.data().task;
      let currTaskChecker = docSnap.data().taskChecker;
      currTasks.map((task, i) => {
        if (task === e) {
          currTasks.splice(i, 1);
          currTaskChecker.splice(i, 1);
        }
      });
      await setDoc(doc(db, "Tasks", displayName), {
        task: currTasks,
        taskChecker: currTaskChecker,
      });
    }
  };
  return (
    <Box
      className={colorMode == "light" ? styles.taskDiv : styles.taskDivDark}
      p="2"
      my="3"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <BsClipboardCheck
        size="25px"
        onClick={() => checkCompleted(props.task)}
        className={styles.taskTick}
      />
      <Text
        display="flex"
        fontSize="md"
        mx="2"
        w="70%"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        textDecoration={completed ? "line-through" : "none"}
        color={colorMode == "light" ? "gray.800" : "whiteAlpha.800"}
      >
        {props.task}
      </Text>
      <MdDelete
        className={styles.deleteIcon}
        size="25px"
        onClick={() => deleteTask(props.task)}
      />
    </Box>
  );
};

export default Tasks;
