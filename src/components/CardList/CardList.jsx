
import { useDispatch, useSelector } from "react-redux";
import { selectCardsByColumnId } from "../../redux/card/selectors.js";
import s from './CardList.module.css'
import sprite from '../../icons/icons.svg'
import { useEffect, useState } from "react";
// import MoveCardMenu from "../MoveCardMenu/MoveCardMenu.jsx";
import { selectSelectedBoard } from "../../redux/boards/selectors.js";
import { selectToken } from "../../redux/auth/selectors.js";
import { deleteCard, moveCard } from "../../redux/card/operations.js";
import { selectColumnsByBoardId } from "../../redux/columns/selectors.js";


const CardList = ({ card, columnId }) => {
    const dispatch = useDispatch();
    const cards = useSelector((state) => selectCardsByColumnId(state, columnId));
    const selectedBoard = useSelector(selectSelectedBoard);
    const boardId = selectedBoard._id;
    const token = useSelector(selectToken);
    const columns = useSelector(state => selectColumnsByBoardId(state, card.boardId));
const [expandedCardId, setExpandedCardId] = useState(null);
    const [today, setToday] = useState(new Date()); 
    const [openDropdowns, setOpenDropdowns] = useState({});
 
    
    const handleMoveCard = (newColumnId) => {
        if (card._id && newColumnId && newColumnId !== columnId) {
            dispatch(moveCard({
                cardId: card._id,
                columnId: newColumnId,
                boardId, // Додаємо boardId
                token
            }));
            setOpenDropdowns(false); // Закриваємо дропдаун після переміщення
        }
    };
    const filteredColumns = columns.filter((column) => column._id !== columnId);

    const isDeadlineToday = (deadline) => {
        const deadlineDate = new Date(deadline);
        const currentDate = new Date(today);
        currentDate.setHours(0, 0, 0, 0);
        deadlineDate.setHours(0, 0, 0, 0);  // Очищаємо час
        return currentDate.getTime() === deadlineDate.getTime();
    };

    useEffect(() => {
            const interval = setInterval(() => {
                setToday(new Date()); 
            }, 60000); 

            return () => clearInterval(interval);
        }, []);

    const toggleDescription = (cardId) => {
            setExpandedCardId(expandedCardId === cardId ? null : cardId);
        };
      
  
    
    const handleDelete = (cardId) => {
        dispatch(deleteCard({ cardId, token }));
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'low':
                return '#9b59b6'; // фіолетовий
            case 'medium':
                return '#ff69b4'; // рожевий
            case 'high':
                return '#2ecc71'; // зелений
            case 'without':
            default:
                return '#95a5a6'; // сірий
        }
    };
    const toggleDropdown = (cardId) => {
        setOpenDropdowns(prevState => ({
            ...prevState,
            [cardId]: !prevState[cardId]
        }));
    };

    return (

        <div className={s.cardsContainer}>
            {cards.length === 0 ? (
                <p>No cards available in this column.</p>
            ) : (
                cards.map((card) => (
                    <div key={card._id} className={s.card}
                        style={{ '--card-color': getPriorityColor(card.priority) }}
                    >
                        <h5 className={s.title}>{card.title}</h5>
                
                       <p
                            className={`${s.description} ${expandedCardId === card._id ? s.expanded : ''}`}
                            onClick={() => toggleDescription(card._id)}
                        >{card.description}</p>
                      
                        <span className={s.line}></span>
                        <div className={s.bottom}>
                            <div className={s.action}>
                                <p className={s.priority}>Priority<span className={s.ops} style={{ backgroundColor: getPriorityColor(card.priority) }}></span></p>
                                <p className={s.deadline}>Deadline<span> {card.deadline}</span></p>
                            </div>

                            {/*  */}
                            <div className={s.buttons}>
                            {
                                    isDeadlineToday(card.deadline) && (
                                        <div className={s.deadlineIcon}>
                                            <svg width="16" height="16">
                                                <use href={`${sprite}#icon-bell`} />
                                            </svg>
                                        </div>
                                    )
                                }
                                <button onClick={() => toggleDropdown(card._id)}>
                                    <svg className={s.icon} width="16" height="16">
                                        <use href={`${sprite}#icon-circle-right`} />
                                    </svg>
                                </button>
                                <button>
                                    <svg className={s.icon} width="16" height="16">
                                        <use href={`${sprite}#icon-pencil-01`} />
                                    </svg>
                                </button>
                               <button onClick={() => handleDelete(card._id)}>
                                    <svg className={s.icon} width="16" height="16">
                                        <use href={`${sprite}#icon-trash-04`} />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        {openDropdowns[card._id] && (
                            <div className={s.dropdown}>
                                {filteredColumns.map((column) => (
                                    <button
                                        key={column._id}
                                        onClick={() => handleMoveCard(column._id, card)}
                                    >
                                        {column.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export default CardList;



// const handleUpdateCard = (cardId, updatedFields) => {
//     const existingCard = cards.find((card) => card._id === cardId); // знайти картку за ID
//     if (!existingCard) return;

//     dispatch(updateCard({
//         cardId: existingCard._id,
//         boardId: existingCard.boardId,
//         columnId: existingCard.columnId,
//         title: updatedFields.title || existingCard.title,
//         description: updatedFields.description || existingCard.description,
//         color: updatedFields.color || existingCard.color,
//         date: updatedFields.date || existingCard.date,
//         token
//     }));
// };


// import { useSelector } from "react-redux";
// import { selectCardsByColumnId } from "../../redux/card/selectors.js";
// import s from './CardList.module.css'
// import sprite from '../../icons/icons.svg'
// import { useEffect, useState } from "react";

// const CardList = ({ columnId }) => {
//     const cards = useSelector((state) => selectCardsByColumnId(state, columnId));
//     const [expandedCardId, setExpandedCardId] = useState(null);
//     const [today, setToday] = useState(new Date());

//     const isDeadlineToday = (deadline) => {
//         const deadlineDate = new Date(deadline);
//         const currentDate = new Date(today);
//         currentDate.setHours(0, 0, 0, 0); 
//         deadlineDate.setHours(0, 0, 0, 0); 

//         return currentDate.getTime() === deadlineDate.getTime();
//     };


//     useEffect(() => {
//         const interval = setInterval(() => {
//             setToday(new Date()); 
//         }, 60000); 

//         return () => clearInterval(interval);
//     }, []);

//     const toggleDescription = (cardId) => {
//         setExpandedCardId(expandedCardId === cardId ? null : cardId);
//     };

//     const testCards = [
//         {
//             _id: "1",
//             title: "Test Card 1",
//             description: "loLorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus itaque unde at eos quod facilis hic odio vel delectus fugit, iure rem est cupiditate excepturi autem necessitatibus ipsam vitae dolore?",
//             color: "#FF0000",
//             deadline: "2024-11-06", 
//         },
//         {
//             _id: "2",
//             title: "Test Card 2",
//             description: "Another test card description",
//             color: "#00FF00",
//             deadline: "2024-11-07", 
//         }
//     ];

 
//     const cardsToDisplay = cards.length === 0 ? testCards : cards;

//     return (
//         <div className={s.cardsContainer}>
//             {cardsToDisplay.length === 0 ? (
//                 <p>No cards available in this column.</p>
//             ) : (
//                 cardsToDisplay.map((card) => (
//                     <div key={card._id} className={s.card}
//                         style={{ '--card-color': card.color }}
//                     >
//                         <h5 className={s.title}>{card.title}</h5>
//                         <p
//                             className={`${s.description} ${expandedCardId === card._id ? s.expanded : ''}`}
//                             onClick={() => toggleDescription(card._id)}
//                         >{card.description}</p>
//                         <span className={s.line}></span>
//                         <div className={s.bottom}>
//                             <div className={s.action}>
//                                 <p className={s.priority}>Priority<span className={s.ops} style={{ backgroundColor: card.color }}></span></p>
//                                 <p className={s.deadline}>Deadline<span>{card.deadline}</span></p>
//                             </div>
                    

//                             <div className={s.buttons}>

//                                 {
//                                     isDeadlineToday(card.deadline) && (
//                                         <div className={s.deadlineIcon}>
//                                             <svg width="16" height="16">
//                                                 <use href={`${sprite}#icon-bell`} />
//                                             </svg>
//                                         </div>
//                                     )
//                                 }

//                                 <button>
//                                     <svg className={s.icon} width="16" height="16">
//                                         <use href={`${sprite}#icon-circle-right`} />
//                                  </svg>
//                                </button>
//                                <button>
//                                   <svg className={s.icon} width="16" height="16">
//                                        <use href={`${sprite}#icon-pencil-01`} />
//                                    </svg>
//                                </button>
//                                 <button>
//                                     <svg className={s.icon} width="16" height="16">
//                                         <use href={`${sprite}#icon-trash-04`} />
//                                    </svg>
//                                 </button>
//                             </div>
//         </div>
// </div>
//                 ))
//             )}
//         </div>
//     );
// }

// export default CardList;



