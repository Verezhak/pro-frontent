import { useDispatch, useSelector } from "react-redux";
import { selectIsModalOpen, selectSelectedBoard } from "../../redux/boards/selectors.js";
import { selectToken } from "../../redux/auth/selectors.js";
import { useEffect } from "react";
import { addColumn, fetchColumns } from "../../redux/columns/operations.js";
import ColumnList from "../ColumnList/ColumnList.jsx";
import AddColumnModal from "../AddColumnModal/AddColumnModal.jsx";
import { closeModal, openModal } from "../../redux/boards/slice.js";


const Board = () => {
    const dispatch = useDispatch();
    const isModalOpen = useSelector(selectIsModalOpen);
    const selectedBoard = useSelector(selectSelectedBoard);
    const token = useSelector(selectToken);

    const handleOpenModal = () => {
        dispatch(openModal());
    };

    const handleCloseModal = () => {
        dispatch(closeModal());
    };

    useEffect(() => {
        if (selectedBoard && token) {
            dispatch(fetchColumns({ boardId: selectedBoard._id, token }));
        }
        console.log("Selected Board:", selectedBoard);
    }, [dispatch, selectedBoard, token]);


    const handleAddColumn = columnName => {
        if (selectedBoard && token) {
            dispatch(addColumn({ boardId: selectedBoard._id, columnName, token }));
        }
        handleCloseModal();
    };

    if (!selectedBoard) return <div>Select a board to see details.</div>;
    return (
        <div>
            <h2>board: {selectedBoard.title}</h2>
            <button onClick={handleOpenModal}>add column</button>

            {isModalOpen && (
                <AddColumnModal
                    onAdd={handleAddColumn}
                    onClose={handleCloseModal}
                />
            )}
            <ColumnList />
        </div>
    )
}

export default Board
