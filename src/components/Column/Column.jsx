
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// // import { selectColumns } from "../../redux/columns/selectors.js";
// import { selectToken } from "../../redux/auth/selectors.js";
// import { selectSelectedBoard } from "../../redux/boards/selectors.js";
// import { addCard, fetchCards } from "../../redux/card/operations.js";
// import AddCardModal from "../AddCardModal/AddCardModal.jsx";


// import CardList from "../CardList/CardList.jsx";
// import s from './Column.module.css';

// const Column = ({ columnId }) => {
//     const dispatch = useDispatch();
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const token = useSelector(selectToken);
//     const selectedBoard = useSelector(selectSelectedBoard);
//     const boardId = selectedBoard?._id;
//     // const boardId = setSelectedBoard._id;


//     useEffect(() => {
//         if (boardId && token) {
//             dispatch(fetchCards({ boardId, columnId, token }));
//         }
//     }, [dispatch, boardId, token, columnId]);
//     const handleOpenModal = () => {
//         setIsModalOpen(true);
//     };

//     const handleCloseModal = () => {
//         setIsModalOpen(false);
//     };

//     const handleAddCard = (taskData) => {
//         console.log("Column ID:", columnId);
//         dispatch(addCard({
//             ...taskData,
//             columnId,
//             boardId,
//             token,
//         })).then(() => {
//             // Після успішного додавання, фетчимо карточки
//             dispatch(fetchCards({ boardId, columnId, token }));
//         });
//         handleCloseModal(columnId);
//     };



//     return (
//         <div className={s.wrap}>
//             <div className={s.wrapper}>
//                 <h3>{columnId}</h3> {/* Ви можете також відобразити заголовок колонки тут */}
//                 <button onClick={handleOpenModal}>Add Card</button>
//                 {isModalOpen && (
//                     <AddCardModal
//                         onAdd={handleAddCard}
//                         onClose={handleCloseModal}
//                     />
//                 )}
//                 <CardList columnId={columnId} />
//             </div>
//         </div>
//     );
// }

// export default Column;






import { useState } from "react";
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
    const boardId = selectedBoard?._id;

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
                <h3>{columnId}</h3> {/* Ви можете також відобразити заголовок колонки тут */}
                <button onClick={handleOpenModal}>Add Card</button>
                {isModalOpen && (
                    <AddCardModal
                        onAdd={handleAddCard}
                        onClose={handleCloseModal}
                    />
                )}
                <CardList columnId={columnId} />
            </div>
        </div>
    );
}

export default Column;
