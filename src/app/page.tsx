// import Image from "next/image";
import styles from "./page.module.css";
import Header from "./components/header/header";
import Terminal from "./components/Terminal/Terminal";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header link="/curriculo.pdf" linkLabel="Document" />
      <Terminal />
    </div>
  );
}
