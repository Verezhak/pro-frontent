import { NavLink } from "react-router-dom";
import clsx from "clsx";
import s from './AuthNav.module.css';

const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
};
const AuthNav = () => {
    return (
        <div>
            <nav>
                <ul className={s.list}>
                    <li><NavLink className={buildLinkClass} to="/register">Registration</NavLink></li>
                    <li> <NavLink className={buildLinkClass} to="/login">
                        Login
                    </NavLink></li>
                </ul>
            </nav>
        </div>
    )
};

export default AuthNav;
