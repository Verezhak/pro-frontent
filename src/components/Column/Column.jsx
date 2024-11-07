// CardColumn   ColumnWithCards
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../redux/auth/selectors.js";
import { selectSelectedBoard } from "../../redux/boards/selectors.js";
import { addCard, fetchCards } from "../../redux/card/operations.js";
import AddCardModal from "../AddCardModal/AddCardModal.jsx";

import s from './Column.module.css';

import CardList from "../CardList/CardList.jsx";


const Column = ({ columnId, title }) => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const token = useSelector(selectToken);
    const selectedBoard = useSelector(selectSelectedBoard);
    const boardId = selectedBoard._id;


    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAddCard = (taskData) => {
        dispatch(addCard({
            ...taskData,
            columnId,
            boardId,
            token,
        })).then(() => {
            dispatch(fetchCards({ boardId, token }));
        });

        handleCloseModal();
    };

    return (
        <div className={s.wrap}>
            <div className={s.wrapper}>
                <h3>{title}</h3>

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
