import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../../redux/auth/selectors.js";
import { useState } from "react";
import { addBoard } from "../../redux/boards/operations.js";

const AddBoardModal = ({ onClose }) => {
    const dispatch = useDispatch();
    const userId = useSelector(selectUserId);
    const [boardName, setBoardName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(addBoard({ userId, boardName }));
            onClose();
        } catch (error) {
            console.error('Failed to create board: ', error);
        }
    };

    return (
        <div className="modal">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={boardName}
                    onChange={(e) => setBoardName(e.target.value)}
                    required
                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default AddBoardModal;
