import { useDispatch, useSelector } from 'react-redux';
import s from './BoardDetails.module.css';

import { useEffect, useState } from 'react';


import ColumnDetails from '../ColumnDetails/ColumnDetails.jsx';

import { addColumn, fetchColumns } from '../../redux/columns/operations.js';
import AddColumnModal from '../AddColumnModal/AddColumnModal.jsx';
import { selectSelectedBoard } from '../../redux/boards/selectors.js';
import { selectToken } from '../../redux/auth/selectors.js';
import { selectColumns } from '../../redux/columns/selectors.js';

const BoardDetails = () => {
    const dispatch = useDispatch();
    const selectedBoard = useSelector(selectSelectedBoard);
    const token = useSelector(selectToken);
    const columns = useSelector(selectColumns);
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (selectedBoard && token) {
            dispatch(fetchColumns({ boardId: selectedBoard._id, token }));
        }
    }, [dispatch, selectedBoard, token]);

    const handleAddColumn = (columnName) => {
        if (selectedBoard && token) {
            dispatch(addColumn({ boardId: selectedBoard._id, columnName, token }));
        }
    };

    if (!selectedBoard) return <div>Select a board to see details.</div>;

    return (
        <div className={s.wrap}>
            <h2>{selectedBoard.title}</h2>
            <button onClick={() => setModalOpen(true)}>Add Column</button>

            {isModalOpen && (
                <AddColumnModal
                    onAdd={handleAddColumn}
                    onClose={() => setModalOpen(false)}
                />
            )}

            <div className={s.columns}>
                <h3>Columns</h3>
                <ul className={s.list}>
                    {columns.map(column => (
                        <li key={column._id}>
                            <h4>{column.title}</h4>
                            <ColumnDetails columnId={column._id} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default BoardDetails;

