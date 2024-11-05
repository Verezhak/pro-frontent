
import { useDispatch, useSelector } from "react-redux";
import s from './BoardList.module.css';
import { selectBoards } from "../../redux/boards/selectors.js";
import { setSelectedBoard } from "../../redux/boards/slice.js";

const BoardList = () => {
    const dispatch = useDispatch();
    const boards = useSelector(selectBoards);

    const handleBoardClick = (board) => {
        dispatch(setSelectedBoard(board));
    };

    return (
        <div className={s.boards}>
            <h2>My Boards</h2>
            <ul>
                {boards.map(board => (
                    <li key={board._id} onClick={() => handleBoardClick(board)}>{board.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default BoardList;
