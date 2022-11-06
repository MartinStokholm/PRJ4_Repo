import Image from "next/image";
import React, { useState } from "react";
import styles from "../../styles/Nav.module.css";
import { MENULIST } from "../utils/Menu-List";
import NavItem from "./NavItem";
import Link from "next/link";

const NavBar = () => {
  const [navActive, setNavActive] = useState(null);
  const [activeIdx, setActiveIdx] = useState(-1);

  return (
    <header>
      <nav className={styles.nav}>
        <Link href={"/"}>
            <Image src="/fatt-logo.png" alt="logo" width={100} height={100} />
        </Link>
        <div
          onClick={() => setNavActive(!navActive)}
          className={styles.nav_menu_bar}
        >
          <div></div>
          <div></div>
          <div></div>          
        </div>
        <div className={`${navActive ? "active" : ""} nav__menu-list`}>
          {MENULIST.map((menu, idx) => (
            <div
              onClick={() => {
                setActiveIdx(idx);
                setNavActive(false);
              }}
              key={menu.path}
            >
              <NavItem active={activeIdx === idx} {...menu} />
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
};




export default NavBar;

{/* <div className={styles.titel}>
<Link href="/">fatt</Link>
</div>
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
</nav> */}