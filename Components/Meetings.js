import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import styles from "../styles/Dashboard.module.css";
import {
  Box,
  Text,
  Button,
  useDisclosure,
  Input,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { Timestamp, doc, setDoc, getDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import Link from "next/link";
import { MdDateRange } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Meetings = () => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [meetings] = useCollection(collection(db, "Meetings"));
  const [meetDetails, setMeetDetails] = useState({
    meetingName: "",
    meetingTime: "",
    meetingLink: "",
  });
  const [user] = useAuthState(auth);
  const [windowWidth, setWindowWidth] = useState(1024);
  const addMeeting = async () => {
    const { meetingName, meetingTime, meetingLink } = meetDetails;
    const docRef = doc(db, "Meetings", user.displayName);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let currMeetings = docSnap.data().meetings;
      if (currMeetings === undefined) {
        currMeetings = [];
      }
      if (meetingName != "" && meetingTime != "" && meetingLink != "") {
        currMeetings.push({
          meetingName: meetingName,
          meetingTime: Timestamp.fromDate(new Date(meetingTime)),
          meetingLink: meetingLink,
        });
        await setDoc(doc(db, "Meetings", user.displayName), {
          meetings: currMeetings,
        });
        toast.success("Meeting added successfully!", {
          theme: "light",
          autoClose: 3000,
          closeOnClick: true,
        });
        setMeetDetails({
          meetingName: "",
          meetingTime: "",
          meetingLink: "",
        });
        onClose();
      }
    } else {
      let currMeetings = [];
      if (meetingName != "" && meetingTime != "" && meetingLink != "") {
        currMeetings.push({
          meetingName: meetingName,
          meetingTime: Timestamp.fromDate(new Date(meetingTime)),
          meetingLink: meetingLink,
        });
        await setDoc(doc(db, "Meetings", user.displayName), {
          meetings: currMeetings,
        });
        setMeetDetails({
          meetingName: "",
          meetingTime: "",
          meetingLink: "",
        });
        toast.success("Meeting added successfully!", {
          theme: "light",
          autoClose: 3000,
          closeOnClick: true,
        });
        onClose();
      }
    }
  };

  const deleteMeeting = async (e) => {
    const docRef = doc(db, "Meetings", user.displayName);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let currMeetings = docSnap.data().meetings;
      currMeetings.map((meeting, i) => {
        if (meeting.meetingName === e) {
          currMeetings.splice(i, 1);
        }
      });
      await setDoc(doc(db, "Meetings", user.displayName), {
        meetings: currMeetings,
      });
      toast.success("Meeting Deleted successfully!", {
        theme: "light",
        autoClose: 3000,
        closeOnClick: true,
      });
    }
  };
  const inputEvent = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setMeetDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const clearData = () => {
    onClose();
    setMeetDetails({
      meetingName: "",
      meetingTime: "",
      meetingLink: "",
    });
  };
  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);
  return (
    <>
      <Modal isOpen={isOpen} onClose={clearData}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a meeting</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={meetDetails.meetingName === ""} my="2">
              <FormLabel htmlFor="name">Meeting Name</FormLabel>
              <Input
                id="name"
                type="text"
                onChange={inputEvent}
                name="meetingName"
                value={meetDetails.meetingName}
              />
              {meetDetails.meetingName === "" ? (
                <FormErrorMessage>This field is required</FormErrorMessage>
              ) : null}
            </FormControl>
            <FormControl isInvalid={meetDetails.meetingTime === ""} my="2">
              <FormLabel htmlFor="time">Meeting Time</FormLabel>
              <Input
                id="time"
                type="datetime-local"
                onChange={inputEvent}
                name="meetingTime"
                value={meetDetails.meetingTime}
              />
              {meetDetails.meetingTime === "" ? (
                <FormErrorMessage>This field is required</FormErrorMessage>
              ) : null}
            </FormControl>
            <FormControl isInvalid={meetDetails.meetingLink === ""} my="2">
              <FormLabel htmlFor="link">Meeting Link</FormLabel>
              <Input
                id="link"
                type="text"
                onChange={inputEvent}
                name="meetingLink"
                value={meetDetails.meetingLink}
              />
              {meetDetails.meetingLink === "" ? (
                <FormErrorMessage>This field is required</FormErrorMessage>
              ) : null}
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
            <Button variant="solid" colorScheme="purple" onClick={addMeeting}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ToastContainer />
      <Box w="95%" my="10">
        <Box
          display="flex"
          justifyContent="space-between"
          w="100%"
          p="4"
          alignItems="center"
          background="#6d71b6"
          boxShadow="rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"
          borderRadius="md"
        >
          <Text fontSize="xl" mx="4" color="white" fontWeight="bold">
            Your Meetings
          </Text>
          <Button size="md" mx="4" onClick={onOpen}>
            Add Meeting
          </Button>
        </Box>
        <Swiper
          navigation
          pagination={{
            clickable: true,
          }}
          spaceBetween={20}
          slidesPerView={windowWidth <= 768 ? 1 : 3}
          modules={[Pagination, Navigation]}
          className={styles.mySwiper}
        >
          {meetings?.docs.map((meetingList) => {
            if (user && meetingList.id === user.displayName) {
              return meetingList.data().meetings?.map((e) => {
                return (
                  <>
                    <SwiperSlide
                      className={
                        colorMode == "light"
                          ? styles.mySwiperSlide
                          : styles.mySwiperSlideDark
                      }
                      key={e.meetingName}
                    >
                      <Text
                        width="100%"
                        fontSize="xl"
                        my="1"
                        p="2"
                        textAlign="center"
                        fontWeight="bold"
                        className={
                          colorMode == "light"
                            ? styles.meetingName
                            : styles.meetingNameDark
                        }
                      >
                        {e.meetingName}
                      </Text>
                      <Text
                        fontSize="md"
                        textAlign="center"
                        my="1"
                        display="flex"
                        justifyContent="space-evenly"
                        w="65%"
                        color={
                          colorMode == "light" ? "black" : "whiteAlpha.800"
                        }
                      >
                        Date: {e.meetingTime.toDate().toLocaleDateString()}
                        <MdDateRange size={22} />
                      </Text>
                      <Text
                        fontSize="md"
                        textAlign="center"
                        my="1"
                        display="flex"
                        justifyContent="space-evenly"
                        w="65%"
                        color={
                          colorMode == "light" ? "black" : "whiteAlpha.800"
                        }
                      >
                        Time: {e.meetingTime.toDate().toLocaleTimeString()}
                        <AiOutlineClockCircle size={22} />
                      </Text>
                      <Box
                        display="flex"
                        justifyContent="space-evenly"
                        alignItems="center"
                        w="85%"
                      >
                        <Button
                          size="md"
                          p="2"
                          my="1"
                          // backgroundColor="#8e98f0"
                          color={colorMode == "light" ? "white" : "gray.700"}
                          colorScheme="purple"
                        >
                          <Link href={e.meetingLink}>
                            <a>Join now</a>
                          </Link>
                        </Button>
                        <Button
                          className={styles.deleteMeet}
                          variant="unstyled"
                          backgroundColor="#ed4542"
                          color="white"
                          p="2"
                          onClick={() => deleteMeeting(e.meetingName)}
                        >
                          Delete Meeting
                        </Button>
                      </Box>
                    </SwiperSlide>
                  </>
                );
              });
            }
          })}
        </Swiper>
      </Box>
    </>
  );
};

export default Meetings;
