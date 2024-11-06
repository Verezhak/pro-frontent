import { useDispatch, useSelector } from "react-redux";
import { selectColumns } from "../../redux/columns/selectors.js"; 
import { fetchCards, moveCard} from "../../redux/card/operations.js"; 
import { selectToken } from "../../redux/auth/selectors.js";

const MoveCardMenu = ({ cardId, columnId, boardId, onClose }) => {
  const dispatch = useDispatch();
  const columns = useSelector(selectColumns);
  const token = useSelector(selectToken);
  const handleMoveCard = (newColumnId) => {
    dispatch(moveCard({ cardId, newColumnId, boardId, token }));
    onClose(); // закриваємо меню
    dispatch(fetchCards({ boardId }));  // оновлюємо список карток
  };

  return (
    <div className="moveCardMenu">
      <h4>Move to Column</h4>
      {columns.map((column) => (
        column._id !== columnId && (
          <button key={column._id} onClick={() => handleMoveCard(column._id)}>
            {column.title}
          </button>
        )
      ))}
      <button onClick={onClose}>Cancel</button> 
    </div>
  );
};

export default MoveCardMenu;
