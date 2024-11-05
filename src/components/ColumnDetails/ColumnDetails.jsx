
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../redux/auth/selectors.js';
import { selectSelectedBoard } from '../../redux/boards/selectors.js';
import { addCard, deleteCard, fetchCards } from '../../redux/card/operations.js';
import AddCardModal from '../AddCardModal/AddCardModal.jsx';
import { selectCardsByColumnId } from '../../redux/card/selectors.js';


const ColumnDetails = ({ columnId, columnTitle }) => {
    const dispatch = useDispatch();
    const [isCardModalOpen, setCardModalOpen] = useState(false);
    const token = useSelector(selectToken);
    const selectedBoard = useSelector(selectSelectedBoard);
    const boardId = selectedBoard?._id;
    const cards = useSelector((state) => selectCardsByColumnId(state, columnId));

    useEffect(() => {
        if (boardId && token) {
            console.log("Fetching cards for boardId:", boardId, "columnId:", columnId);
            dispatch(fetchCards({ boardId, columnId, token }));
        }
    }, [dispatch, boardId, token, columnId]);

    const handleAddTask = (task) => {
        if (boardId) {
            console.log("Adding task with boardId:", boardId);
            dispatch(addCard({
                ...task,
                columnId,
                boardId,
                token,
            }));
            setCardModalOpen(false);
        }
    };


    const handleDeleteCard = (cardId) => {
        dispatch(deleteCard({ boardId, cardId, token }));
    };

    console.log("Cards in Column:", cards); // Лог для перевірки карток

    return (
        <div>
            <h4>{columnTitle}</h4>
            <button onClick={() => setCardModalOpen(true)}>Додати картку</button>

            {isCardModalOpen && (
                <AddCardModal
                    onAdd={handleAddTask}
                    onClose={() => setCardModalOpen(false)}
                />
            )}

            <div className="cards-container">
                {cards.map((card) => (
                    <div key={card._id} className="card">
                        <h5>{card.title}</h5>
                        <p>{card.description}</p>
                        <span style={{ backgroundColor: card.color }}>{card.color}</span>
                        <button onClick={() => handleDeleteCard(card._id)}>Видалити</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ColumnDetails;



// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectToken } from '../../redux/auth/selectors.js';
// import { selectSelectedBoard } from '../../redux/boards/selectors.js';
// import { addCard, fetchCards } from '../../redux/card/operations.js';
// import AddTaskModal from '../AddCardModal/AddCardModal.jsx';
// import { selectCardsByColumnId } from '../../redux/card/selectors.js';

// const ColumnDetails = ({ columnId, columnTitle }) => {
//     const dispatch = useDispatch();
//     const [isTaskModalOpen, setTaskModalOpen] = useState(false);
//     const token = useSelector(selectToken);
//     const selectedBoard = useSelector(selectSelectedBoard);
//     const boardId = selectedBoard ? selectedBoard._id : null;
//     const cards = useSelector((state) => selectCardsByColumnId(state, columnId));

//     useEffect(() => {
//         if (selectedBoard && token) {
//             console.log("Fetching cards for boardId:", selectedBoard._id, "columnId:", columnId);
//             dispatch(fetchCards({ boardId: selectedBoard._id, columnId, token })); // Перевірте порядок параметрів
//         }
//     }, [dispatch, selectedBoard, token, columnId]);

//     const handleAddTask = (task) => {
//         console.log("Adding task with boardId:", boardId);
//         dispatch(addCard({
//             ...task,
//             columnId,
//             boardId,
//             token
//         }));
//         setTaskModalOpen(false);
//     };

//     console.log("Cards in Column:", cards); // Лог для перевірки карток

//     return (
//         <div>
//             <h4>{columnTitle}</h4>
//             <button onClick={() => setTaskModalOpen(true)}>Додати картку</button>

//             {isTaskModalOpen && (
//                 <AddTaskModal
//                     onAdd={handleAddTask}
//                     onClose={() => setTaskModalOpen(false)}
//                 />
//             )}

//             <div className="cards-container">
//                 {cards.map((card) => (
//                     <div key={card._id} className="card">
//                         <h5>{card.title}</h5>
//                         <p>{card.description}</p>
//                         <span style={{ backgroundColor: card.color }}>{card.color}</span>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ColumnDetails;
