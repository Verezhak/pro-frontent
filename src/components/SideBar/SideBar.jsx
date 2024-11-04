import { useDispatch, useSelector } from "react-redux";
import Logout from "../Logout/Logout.jsx";
import { selectError, selectLoading } from "../../redux/boards/selectors.js";
import { selectToken, selectUserId } from "../../redux/auth/selectors.js";
import { fetchBoards } from "../../redux/boards/operations.js";
import { useEffect, useState } from "react";
import s from './SideBar.module.css';
import BoardList from "../BoardList/BoardList.jsx";
import AddBoardModal from "../AddBoardModal/AddBoardModal.jsx";

const SideBar = () => {
    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const userId = useSelector(selectUserId);
    const token = useSelector(selectToken);

    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        if (userId && token) {
            dispatch(fetchBoards({ userId, token }));
        }
    }, [dispatch, userId, token]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={s.wrapper}>
            <button onClick={handleOpenModal}>Add Board</button>
            {isModalOpen && (
                <AddBoardModal onClose={handleCloseModal} />
            )}
            <BoardList />
            <Logout />
        </div>
    );
}

export default SideBar;
