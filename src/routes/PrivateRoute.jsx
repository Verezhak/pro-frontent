import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/selectors';




export const PrivateRoute = ({ children }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const location = useLocation();

    if (isLoggedIn) {
        return children;
    }
    return <Navigate to='/login' state={location} />;
};