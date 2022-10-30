import styleMenu from '../../styles/Menu.module.css';
import { navLinks } from "../utils/nav-data";
import Link from "next/link";


export default  function MenuNav() {
    return (
        <div className="">
            <div className="profileSymbol">
                <h3>Symbol</h3>
            </div>
            
            <nav className="navBar">
                {navLinks.map((link, index) => {
                return (
                    <ul className={styleMenu.navItem}>
                        <Link href={link.path}>
                            <li key={index}>{link.name}</li>
                        </Link>
                    </ul>
                );
                })}
            </nav>
        </div>
    );
}
