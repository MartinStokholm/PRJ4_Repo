import styles from "../../styles/Header.module.css";
import { navLinks } from "../utils/nav-data";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.header}>
      {/* <div className={styles.titel}>
        <Link href="/">fatt</Link>
      </div> */}
      <nav className={styles.nav}>
        {navLinks.map((link, index) => {
          return (
            <ul>
              <Link href={link.path}>
                <li key={index}>{link.name}</li>
              </Link>
            </ul>
          );
        })}
      </nav>
    </header>
  );
}
