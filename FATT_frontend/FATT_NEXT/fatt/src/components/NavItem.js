import { useRouter} from "next/router";
import propTypes from "prop-types";

const NavItem  = ({item}) => {
    const router = useRouter();
    return <>{router.pathname === "/" ? item : ""} </>;

}

export default NavItem;

NavItem.propTypes = {
    item: propTypes.string,
}