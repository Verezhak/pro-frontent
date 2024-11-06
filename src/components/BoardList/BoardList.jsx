
import { useDispatch, useSelector } from "react-redux";
import s from './BoardList.module.css';
import { selectBoards, selectSelectedBoard,} from "../../redux/boards/selectors.js";
import { setSelectedBoard } from "../../redux/boards/slice.js";
import { fetchCards } from "../../redux/card/operations.js";
import { selectToken } from "../../redux/auth/selectors.js";
import { useEffect } from "react";


const BoardList = () => {
    const dispatch = useDispatch();
    const boards = useSelector(selectBoards);
    const token = useSelector(selectToken); 
    const selectedBoard = useSelector(selectSelectedBoard);
    const boardId = selectedBoard?._id;
    
    const handleBoardClick = (board) => {
        dispatch(setSelectedBoard(board));
        // dispatch(fetchCards({ boardId: board._id, token }));
    };
    useEffect(() => {
        if (boardId && token) {
            dispatch(fetchCards({ boardId, token }));
        }
    }, [dispatch, boardId, token]);

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
