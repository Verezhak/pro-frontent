import { useDispatch, useSelector } from 'react-redux';
import s from './UserMenu.module.css';
import { selectUser } from '../../redux/auth/selectors';
import { logOut } from '../../redux/auth/operations';
import { FaRegUserCircle } from 'react-icons/fa';

const UserMenu = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    return (
        <div className={s.wrapper}>
            <p>Welcome, {user.name}!</p>
            <FaRegUserCircle className={s.icon} size="24" />
            <button type="button" onClick={() => dispatch(logOut())}>
                Logout
            </button>
        </div>
    )
};

export default UserMenu;