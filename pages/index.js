import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Awesome Goal tracker</title>
        <meta name="description" content="Awesome goal tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p>Welcome to Awesome Goal Tracker</p>
    </div>
  );
}
