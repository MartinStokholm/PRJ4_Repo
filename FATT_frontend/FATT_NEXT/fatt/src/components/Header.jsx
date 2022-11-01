import Image from "next/image";
import React, { useState } from "react";
import styles from "../../styles/Header.module.css";
// import Logo from "./Logo";
import { MENULIST } from "../utils/Menu-List";
import NavItem from "./NavItem";
import Link from "next/link";


// const NavBar = () => {
//   const [navActive, setNavActive] = useState(null);
//   const [activeIdx, setActiveIdx] = useState(-1);

//   return (
//     <header className={styles.header}>
//       <nav className={styles.nav}>
//         <Link href={"/"}>
//           <h1 className={styles.logo}>Logo</h1>
//         </Link>

//         <div onClick={() => setNavActive(!navActive)}
//           className={styles.nav_menu_bar}
//         >
//             <div></div>
//             <div></div>
//             <div></div>
//         </div>

//       <div className={`${navActive ? "active" : ""} nav_menu_list`}>
//           {MENULIST.map((menu, idx) => (
//             <div
//               onClick={() => {
//                 setActiveIdx(idx);
//                 setNavActive(false);
//               }}
//               key={menu.text}
//             >
//               <NavItem active={activeIdx === idx} {...menu} />
//             </div>
//           ))}
//         </div>
//       </nav>
//     </header>
//   );
// };

const NavBar = () => {
  const [navActive, setNavActive] = useState(null);
  const [activeIdx, setActiveIdx] = useState(-1);

  return (
    <header>
      <nav className={styles.nav}>
        <Link href={"/"}>

            <h1 className="logo">Logo</h1>

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
              key={menu.text}
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