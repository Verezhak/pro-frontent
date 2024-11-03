import { Link } from 'react-router-dom';
import s from './NotFoundPage.module.css';

const NotFoundPage = () => {
    return (
        <div>
            <h1 className={s.notFound}>404 - Page Not Found</h1>
            <Link className={s.link} to="/">Go to Home</Link>
        </div>
    )
};

export default NotFoundPage;
