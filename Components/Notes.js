import { useRef, useState, useEffect } from "react";
import {
  Box,
  Text,
  Button,
  Input,
  useDisclosure,
  Textarea,
  useColorMode,
} from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase-config";
import { getDoc, doc, setDoc, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
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
} from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import styles from "../styles/Dashboard.module.css";

const Notes = () => {
  const {
    isOpen: isAddModalOpen,
    onOpen: onAddModalOpen,
    onClose: onAddModalClose,
  } = useDisclosure();
  const {
    isOpen: isShowModalOpen,
    onOpen: onShowModalOpen,
    onClose: onShowModalClose,
  } = useDisclosure();
  const { colorMode } = useColorMode();
  const noteHeading = useRef("");
  const noteDescription = useRef("");
  const [notes] = useCollection(collection(db, "Notes"));
  const [windowWidth, setWindowWidth] = useState(1024);
  const [noteDetails, setNoteDetails] = useState({
    noteName: "",
    noteDesc: "",
  });
  const [user] = useAuthState(auth);
  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);
  const clearData = () => {
    onAddModalClose();
    noteHeading.current.value = "";
    noteDescription.current.value = "";
  };
  const addNote = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "Notes", user.displayName);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let currNotes = docSnap.data().notes;
      if (currNotes === undefined) {
        currNotes = [];
      }
      if (
        noteHeading.current.value != "" &&
        noteDescription.current.value != ""
      ) {
        currNotes.push({
          noteName: noteHeading.current.value,
          noteDesc: noteDescription.current.value,
        });
        await setDoc(doc(db, "Notes", user.displayName), {
          notes: currNotes,
        });
        toast.success("Note added successfully!", {
          theme: "light",
          autoClose: 3000,
          closeOnClick: true,
        });
        noteHeading.current.value = "";
        noteDescription.current.value = "";
        onAddModalClose();
      }
    } else {
      let currNotes = [];
      if (
        noteHeading.current.value != "" &&
        noteDescription.current.value != ""
      ) {
        currNotes.push({
          noteName: noteHeading.current.value,
          noteDesc: noteDescription.current.value,
        });
        await setDoc(doc(db, "Notes", user.displayName), {
          notes: currNotes,
        });
        toast.success("Note added successfully!", {
          theme: "light",
          autoClose: 3000,
          closeOnClick: true,
        });
        noteHeading.current.value = "";
        noteDescription.current.value = "";
        onAddModalClose();
      }
    }
  };
  const deleteNote = async (e) => {
    const docRef = doc(db, "Notes", user.displayName);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let currNotes = docSnap.data().notes;
      currNotes.map((note, i) => {
        if (note.noteName === e) {
          currNotes.splice(i, 1);
        }
      });
      await setDoc(doc(db, "Notes", user.displayName), {
        notes: currNotes,
      });
      toast.success("Note Deleted successfully!", {
        theme: "light",
        autoClose: 3000,
        closeOnClick: true,
      });
      onShowModalClose();
    }
  };
  const readMore = (noteName, noteDesc) => {
    setNoteDetails({
      noteName: noteName,
      noteDesc: noteDesc,
    });
    onShowModalOpen();
  };
  return (
    <>
      <Modal isOpen={isAddModalOpen} onClose={clearData}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl my="2" isRequired>
              <FormLabel htmlFor="noteName">Note Heading</FormLabel>
              <Input id="noteName" type="text" ref={noteHeading} />
            </FormControl>
            <FormControl my="2" isRequired>
              <FormLabel htmlFor="noteDesc">Note Description</FormLabel>
              {/* <Input id="noteDesc" type="textarea" ref={noteDescription} /> */}
              <Textarea
                ref={noteDescription}
                id="noteDesc"
                placeholder="Add your note description"
                resize="vertical"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              variant="outline"
              mr={3}
              onClick={onAddModalClose}
            >
              Close
            </Button>
            <Button variant="solid" colorScheme="purple" onClick={addNote}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ToastContainer />
      <Modal
        isOpen={isShowModalOpen}
        onClose={onShowModalClose}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{noteDetails.noteName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{noteDetails.noteDesc}</ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              variant="outline"
              mr={3}
              onClick={onShowModalClose}
            >
              Close
            </Button>
            <Button
              variant="solid"
              colorScheme="purple"
              onClick={() => deleteNote(noteDetails.noteName)}
            >
              Delete Note
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box w="95%" my="5">
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
            Your Notes
          </Text>
          <Button size="md" mx="4" onClick={onAddModalOpen}>
            Add Note
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
          {notes?.docs.map((noteList) => {
            if (user && noteList.id === user.displayName) {
              return noteList.data().notes?.map((e) => {
                return (
                  <>
                    <SwiperSlide
                      className={
                        colorMode == "light"
                          ? styles.mySwiperSlide2
                          : styles.mySwiperSlide2Dark
                      }
                      key={e.noteName}
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
                            ? styles.noteName
                            : styles.noteNameDark
                        }
                      >
                        {e.noteName}
                      </Text>

                      <Text
                        fontSize="md"
                        textAlign="center"
                        my="2"
                        w="90%"
                        display="flex"
                        color={
                          colorMode == "light" ? "black" : "whiteAlpha.800"
                        }
                      >
                        {e.noteDesc.substring(0, 100)}
                        {"..."}
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
                          color={colorMode == "light" ? "white" : "gray.700"}
                          colorScheme="purple"
                          onClick={() => readMore(e.noteName, e.noteDesc)}
                        >
                          Read More
                        </Button>
                        <Button
                          className={styles.deleteMeet}
                          variant="unstyled"
                          backgroundColor="#ed4542"
                          color="white"
                          p="2"
                          onClick={() => deleteNote(e.noteName)}
                        >
                          Delete Note
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

export default Notes;
