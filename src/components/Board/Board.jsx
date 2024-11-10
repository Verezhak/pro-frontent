


import { useDispatch, useSelector } from "react-redux";
import { selectIsModalOpen, selectSelectedBoard } from "../../redux/boards/selectors.js";

import { useEffect } from "react";
import { addColumn, fetchColumns } from "../../redux/columns/operations.js";
import AddColumnModal from "../AddColumnModal/AddColumnModal.jsx";
import { closeModal, openModal } from "../../redux/boards/slice.js";
import Column from "../Column/Column.jsx";
import s from './Board.module.css'



const Board = () => {
    const dispatch = useDispatch();
    const isModalOpen = useSelector(selectIsModalOpen);
    const selectedBoard = useSelector(selectSelectedBoard);
    const columns = useSelector(state => state.columns.items);




    const handleOpenModal = () => {
        dispatch(openModal());
    };

    const handleCloseModal = () => {
        dispatch(closeModal());
    };

    useEffect(() => {
        if (selectedBoard) {
            dispatch(fetchColumns({ boardId: selectedBoard._id }));
        }
    }, [dispatch, selectedBoard]);



    const handleAddColumn = columnName => {
        if (selectedBoard) {
            dispatch(addColumn({ boardId: selectedBoard._id, columnName}));
        }
        handleCloseModal();
    };

    if (!selectedBoard) return <div>Select a board to see details.</div>;

    return (
        <div className={s.board}>
            <h2>Board: {selectedBoard.title}</h2>
            <button onClick={handleOpenModal}>Add Column</button>

            {isModalOpen && (
                <AddColumnModal
                    onAdd={handleAddColumn}
                    onClose={handleCloseModal}
                />
            )}

            <div className={s.columns}>
                {columns.map(column => (
                    <Column key={column._id} columnId={column._id} title={column.title} />
                ))}
            </div>
        </div>
    );
}

export default Board;


