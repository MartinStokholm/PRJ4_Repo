import React from "react";
import { navLinks } from "../utils/footer-data";
import styles from '../../styles/Footer.module.css'
import Link from "next/link";



export default  function Footer() {
    return (
        <footer className={styles.footer}>            
            <nav className={styles.footeBar}>
                {navLinks.map((link, index) => {
                return (
                    <ul className={styles.footerItems}>
                        <Link href={link.path}>
                            <li key={index}>{link.name} </li>
                        </Link>
                    </ul>
                );
                })}
            </nav>
        </footer>
    );
}


