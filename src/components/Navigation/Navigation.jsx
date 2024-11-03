import { NavLink } from "react-router-dom";
import s from './Navigation.module.css';
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
};

const Navigation = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    return (
        <nav className={s.nav}>
            <NavLink className={buildLinkClass} to="/">
                Home
            </NavLink>
            {isLoggedIn &&
                <NavLink className={buildLinkClass} to="/contacts">
                    Contacts
                </NavLink >}
        </nav>
    )
};
export default Navigation;