
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../redux/auth/selectors.js";
import { selectSelectedBoard } from "../../redux/boards/selectors.js";
import { addCard, fetchCards } from "../../redux/card/operations.js";
import AddCardModal from "../AddCardModal/AddCardModal.jsx";
import CardList from "../CardList/CardList.jsx";
import s from './Column.module.css';

const Column = ({ columnId }) => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const token = useSelector(selectToken);
    const selectedBoard = useSelector(selectSelectedBoard);
    const boardId = selectedBoard._id;


   

    useEffect(() => {
        if (boardId && columnId) {
            dispatch(fetchCards({ boardId, columnId, token }));
        }
    }, [boardId, columnId, dispatch, token]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAddCard = (taskData) => {
        console.log("Column ID:", columnId);
        dispatch(addCard({
            ...taskData,
            columnId,
            boardId,
            token,
        })).then(() => {

            dispatch(fetchCards({ boardId, columnId, token }));

        });

        handleCloseModal();
    };

    return (
        <div className={s.wrap}>
            <div className={s.wrapper}>
                <h3>{columnId}</h3>

                {isModalOpen && (
                    <AddCardModal
                        onAdd={handleAddCard}
                        onClose={handleCloseModal}
                    />
                )}
                <CardList columnId={columnId} />
                <button onClick={handleOpenModal}>Add Card</button>
            </div>
        </div>
    );
}

export default Column;
