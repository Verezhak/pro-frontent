
// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addCard, fetchCards } from "../../redux/card/operations.js";
import AddCardModal from "../AddCardModal/AddCardModal.jsx";
import sprite from '../../icons/icons.svg';
import s from './Column.module.css';

import CardList from "../CardList/CardList.jsx";
import { closeAddModal, openAddModal } from "../../redux/card/slice.js";
import { selectIsAddModalOpen, selectSelectedBoard } from "../../redux/card/selectors.js";


const Column = ({ columnId, title }) => {
    const dispatch = useDispatch();

    const isAddModalOpen = useSelector(selectIsAddModalOpen);
    // const [isModalOpen, setIsModalOpen] = useState(false);


    const selectedBoard = useSelector(selectSelectedBoard);
    const boardId = selectedBoard._id;


    const handleOpenAddModal = () => {
        dispatch(openAddModal());
    };

    const handleCloseAddModal = () => {
        dispatch(closeAddModal());
    };

    const handleAddCard = (taskData) => {
        dispatch(addCard({
            ...taskData,
            columnId,
            boardId
        })).then(() => {
            dispatch(fetchCards({ boardId }));
        });

        handleCloseAddModal();
    };

    // const handleOpenModal = () => {
    //     setIsModalOpen(true);
    // };

    // const handleCloseModal = () => {
    //     setIsModalOpen(false);
    // };

    // const handleAddCard = (taskData) => {
    //     dispatch(addCard({
    //         ...taskData,
    //         columnId,
    //         boardId
    //     })).then(() => {
    //         dispatch(fetchCards({ boardId }));
    //     });

    //     handleCloseModal();
    // };

    return (
        <div className={s.wrap}>
            <div className={s.wrapper}>
                <h3>{title}</h3>

                {isAddModalOpen && (
                    <AddCardModal
                        onAdd={handleAddCard}
                        onClose={handleCloseAddModal}
                    />
                )}

                {/* {isModalOpen && (
                    <AddCardModal
                        onAdd={handleAddCard}
                        onClose={handleCloseModal}
                    />
                )} */}
                <CardList columnId={columnId} />

                <button className={s.addBtn} onClick={handleOpenAddModal}>
                    <svg className={s.plusIcon} width="14" height="14">
                        <use href={`${sprite}#plus-icon`} />
                    </svg>
                    Add another card
                </button>
                {/* <button onClick={handleOpenModal}>Add Card</button> */}
            </div>
        </div>
    );
}

export default Column;


// import { useReducer } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { selectSelectedBoard } from "../../redux/boards/selectors.js";
// import { addCard, fetchCards } from "../../redux/card/operations.js";
// import AddCardModal from "../AddCardModal/AddCardModal.jsx";
// import s from './Column.module.css';
// import CardList from "../CardList/CardList.jsx";
// import { columnReducer } from "../../reducers/columnReducer.js";

// // Початковий стан
// const initialState = {
//     isModalOpen: false,
// };

// const Column = ({ columnId, title }) => {
//     const dispatch = useDispatch();
//     const [state, columnDispatch] = useReducer(columnReducer, initialState);
//     const selectedBoard = useSelector(selectSelectedBoard);
//     const boardId = selectedBoard._id;

//     const handleOpenModal = () => {
//         columnDispatch({ type: 'TOGGLE_MODAL', payload: true });
//     };

//     const handleCloseModal = () => {
//         columnDispatch({ type: 'TOGGLE_MODAL', payload: false });
//     };

//     const handleAddCard = (taskData) => {
//         dispatch(addCard({
//             ...taskData,
//             columnId,
//             boardId
//         })).then(() => {
//             dispatch(fetchCards({ boardId }));
//         });

//         handleCloseModal();
//     };

//     return (
//         <div className={s.wrap}>
//             <div className={s.wrapper}>
//                 <h3>{title}</h3>

//                 {state.isModalOpen && (
//                     <AddCardModal
//                         onAdd={handleAddCard}
//                         onClose={handleCloseModal}
//                     />
//                 )}

//                 <CardList columnId={columnId} />
//                 <button onClick={handleOpenModal}>Add Card</button>
//             </div>
//         </div>
//     );
// };

// export default Column;
