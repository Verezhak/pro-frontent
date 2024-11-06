
import { useSelector } from "react-redux";
import { selectCardsByColumnId } from "../../redux/card/selectors.js";
import s from './CardList.module.css'
import sprite from '../../icons/icons.svg'
import { useEffect, useState } from "react";
import MoveCardMenu from "../MoveCardMenu/MoveCardMenu.jsx";
import { selectSelectedBoard } from "../../redux/boards/selectors.js";


const CardList = ({ columnId }) => {
    const cards = useSelector((state) => selectCardsByColumnId(state, columnId));
    const selectedBoard = useSelector(selectSelectedBoard);
    const boardId = selectedBoard._id;

    const [expandedCardId, setExpandedCardId] = useState(null);
    const [today, setToday] = useState(new Date()); 
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isDeadlineToday = (deadline) => {
            const deadlineDate = new Date(deadline);
            const currentDate = new Date(today);
            currentDate.setHours(0, 0, 0, 0);  
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
      
       const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev); 
    };

    return (

        <div className={s.cardsContainer}>
            {cards.length === 0 ? (
                <p>No cards available in this column.</p>
            ) : (
                cards.map((card) => (
                    <div key={card._id} className={s.card}
                        style={{ '--card-color': card.color }}
                    >
                        <h5 className={s.title}>{card.title}</h5>
                
                       <p
                            className={`${s.description} ${expandedCardId === card._id ? s.expanded : ''}`}
                            onClick={() => toggleDescription(card._id)}
                        >{card.description}</p>
                      
                        <span className={s.line}></span>
                        <div className={s.bottom}>
                            <div className={s.action}>
                                <p className={s.priority}>Priority<span className={s.ops} style={{ backgroundColor: card.color }}></span></p>
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
                                <button onClick={toggleMenu}>
                                    <svg className={s.icon} width="16" height="16">
                                        <use href={`${sprite}#icon-circle-right`} />
                                    </svg>
                                </button>
                                <button>
                                    <svg className={s.icon} width="16" height="16">
                                        <use href={`${sprite}#icon-pencil-01`} />
                                    </svg>
                                </button>
                                <button>
                                    <svg className={s.icon} width="16" height="16">
                                        <use href={`${sprite}#icon-trash-04`} />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        {isMenuOpen && (
                            <MoveCardMenu
                                cardId={card._id}
                                columnId={columnId}
                                boardId={boardId}
                                onClose={toggleMenu} 
                            />
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export default CardList;






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



