import { Box, Button, Link, Text, Flex } from "@chakra-ui/react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import goalImage from '../assets/images/goalimage.svg'

function Home() {
  return (
    <Box
      className={styles.container}
    >
      <Box
        className={styles.homeContainer}
        h="500px"
        w= '500px'
        display="flex"
        p="5px"
        justifyContent="space-evenly"
        flexDirection="column"
        alignItems="center"
      >

        <Text fontSize= '4xl' className={styles.heading} fontWeight="bold" margin='5'>
          Awesome Goal Tracker
            <Text fontSize='medium' align='center'>Your ultimate goal setting site</Text>
        </Text>
        <Flex justifyContent='center' alignItems='center' flexDirection='column' marginTop='5' marginBottom='5'>
            <Image src= {goalImage} className={styles.image} />
            <Link href="/login">
                <Button colorScheme="blue" variant="ghost" className={styles.btn}>
                Let's get Started
                </Button>
            </Link>
        </Flex>
        
      </Box>
    </Box>
  );
}

export default Home;
