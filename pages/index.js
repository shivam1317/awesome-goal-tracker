import { Box, Text, Button } from "@chakra-ui/react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import { CgNotes } from "react-icons/cg";
import { SiGooglemeet } from "react-icons/si";
import { MdOutlineNoteAlt } from "react-icons/md";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Awesome Goal tracker</title>
        <meta name="description" content="Awesome goal tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        mt="10px"
        p="20px"
        className={styles.headDiv}
      >
        <Box
          w="50%"
          display="flex"
          // border="2px solid blue"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          p="35px"
          className={styles.intro}
        >
          <Text fontSize="3xl" fontWeight="bold" my="15px">
            <span className={styles.highlighted}>Awesome Goal Tracker</span>
          </Text>
          <Text textAlign="center" my="15px" fontWeight="bold">
            Track Your daily progress,meetings,notes and more...
          </Text>
          <Button my="15px" size="lg">
            <Link href="/login">Get started</Link>
          </Button>
        </Box>
        <Image
          src={"/Home/progress_tracking.svg"}
          height={350}
          width={350}
          alt="Progress_tracking"
        />
      </Box>

      <Box className={styles.featuresDiv}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="wave1"
        >
          <path
            fill="#f2f2f2"
            fillOpacity="1"
            d="M0,128L48,133.3C96,139,192,149,288,170.7C384,192,480,224,576,218.7C672,213,768,171,864,170.7C960,171,1056,213,1152,208C1248,203,1344,149,1392,122.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
        <Box p="25px">
          <Text fontSize="3xl" textAlign="center" fontWeight="bold">
            <span>⚡ Features ⚡</span>
          </Text>
          <Box
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
            my="20px"
          >
            <Image
              src={"/Home/features.svg"}
              height={350}
              width={350}
              alt="features"
            />
            <Box
              w="50%"
              display="flex"
              justifyContent="space-evenly"
              flexWrap="wrap"
              alignItems="center"
            >
              <Text className={styles.featureCard}>
                <Image
                  src="/Home/progress_icon.png"
                  alt="progress"
                  width="35"
                  height="35"
                />
                Track your progress with exclusive progress bar
              </Text>
              <Text className={styles.featureCard}>
                <CgNotes color="white" size="30px" /> Manage your daily to-do
                list
              </Text>
              <Text className={styles.featureCard}>
                <SiGooglemeet color="white" size="30px" />
                Manage your meetings
              </Text>
              <Text className={styles.featureCard}>
                <MdOutlineNoteAlt color="white" size="30px" />
                Manage your personal notes
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
