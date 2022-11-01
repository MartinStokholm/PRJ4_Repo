import { useRouter } from "next/router";
import propTypes from "prop-types";
import Link from "next/link";
import styles from '../../styles/NavItem.module.css'

const NavItem = ({ text, href, active }) => {
  return (
    <Link href={href}  className={styles.nav__link}>
      {text}
    </Link>
  );
};

export default NavItem;


NavItem.propTypes = {
  text: propTypes.string,
  href: propTypes.string,
  active: propTypes.bool,
};




// const NavItem  = ({item}) => {
//     const router = useRouter();
//     return <>{router.pathname === "/" ? item : ""} </>;

// }
