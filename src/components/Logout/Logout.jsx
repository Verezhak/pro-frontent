import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../redux/auth/operations.js"
import { Navigate } from "react-router";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";


const Logout = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const handleClick = () => {
        dispatch(logout())
    };
    if (!isLoggedIn) {
        return <Navigate to='/' />;
    }
    return (
        <div>
            <button type="button" onClick={handleClick}>
                Logout
            </button>
        </div>
    )
}

export default Logout
