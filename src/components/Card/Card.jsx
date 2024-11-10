
// import { useState } from 'react';
// import s from './Card.module.css';
// import sprite from '../../icons/icons.svg';
// import Dropdown from '../Dropdown/Dropdown.jsx';
// import ModalDeleteCard from '../ModalDeleteCard/ModalDeleteCard.jsx';

// const Card = ({ card, handleMoveCard, handleDelete, isDeadlineToday, filteredColumns}) => {
//     const [expandedCardId, setExpandedCardId] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false); 
//     const { _id, priority, title, description, deadline } = card;
//     const [openDropdowns, setOpenDropdowns] = useState({});

//     const toggleDescription = (cardId) => {
//         setExpandedCardId(expandedCardId === cardId ? null : cardId);
//     };
//     const handleDeleteClick = () => {
//         setIsModalOpen(true); 
//     };
//     const handleConfirmDelete = () => {
//         handleDelete(_id);  
//         setIsModalOpen(false);
//     };

//     const handleCancelDelete = () => {
//         setIsModalOpen(false); 
//     };

//     const handleMoveCardClick = (columnId) => {
//         handleMoveCard(columnId, _id);
//         setOpenDropdowns(prevState => ({ ...prevState, [_id]: false })); // Закрити дропдаун після переміщення картки
//     };

//     const closeDropdown = () => {
//         setOpenDropdowns(prevState => ({ ...prevState, [_id]: false })); // Закрити дропдаун
//     };

//     const toggleDropdown = (cardId) => {
//         setOpenDropdowns(prevState => ({
//             ...prevState,
//             [cardId]: !prevState[cardId] // Інвертуємо стан дропдауну для цієї картки
//         }));
//     };

//     const getPriorityColor = (priority) => {
//         switch (priority) {
//             case 'low':
//                 return '#8FA1D0';
//             case 'medium':
//                 return '#E09CB5';
//             case 'high':
//                 return '#BEDBB0';
//             case 'without':
//             default:
//                 return 'rgba(22, 22, 22, 0.30)';
//         }
//     };

//     return (
//         <div className={s.card} style={{ '--card-color': getPriorityColor(priority) }}>
//             <h5 className={s.title}>{title}</h5>

//             <p
//                 className={`${s.description} ${expandedCardId === _id ? s.expanded : ''}`}
//                 onClick={() => toggleDescription(_id)}
//             >{description}</p>

//             <span className={s.line}></span>
//             <div className={s.bottom}>
//                 <div className={s.action}>
//                     <p className={s.priority}>Priority
//                         <span className={s.label} style={{ '--card-color': getPriorityColor(priority) }}>{priority}</span>
//                     </p>
//                     <p className={s.deadline}>Deadline<span>{deadline}</span></p>
//                 </div>

//                 <div className={s.buttons}>
//                     {isDeadlineToday(deadline) && (
//                         <div className={s.deadlineIcon}>
//                             <svg width="16" height="16">
//                                 <use href={`${sprite}#bell-icon`} />
//                             </svg>
//                         </div>
//                     )}
//                     <button className={s.move} onClick={() => toggleDropdown(_id)} disabled={filteredColumns.length === 0}>
//                         <svg className={s.icon} width="16" height="16">
//                             <use href={`${sprite}#arrow-circle-icon`} />
//                         </svg>
//                     </button>
//                     <button >
//                         <svg className={s.icon} width="16" height="16">
//                             <use href={`${sprite}#pencil-icon`} />
//                         </svg>
//                     </button>
//                     <button onClick={handleDeleteClick}>
//                         <svg className={s.icon} width="16" height="16">
//                             <use href={`${sprite}#trash-icon`} />
//                         </svg>
//                     </button>
//                 </div>
//             </div>

//             <Dropdown
//                  cardId={card._id}
//                  filteredColumns={filteredColumns}
//                  handleMoveCard={handleMoveCardClick}
//                  openDropdown={openDropdowns[card._id]} 
//                  closeDropdown={closeDropdown} 
//             />
//              <ModalDeleteCard 
//                 isOpen={isModalOpen} 
//                 onClose={handleCancelDelete} 
//                 onConfirm={handleConfirmDelete}
//             />
//         </div>
//     );
// };

// export default Card;









import s from './Card.module.css';
import sprite from '../../icons/icons.svg';
import Dropdown from '../Dropdown/Dropdown.jsx';
import ModalDeleteCard from '../ModalDeleteCard/ModalDeleteCard.jsx';
import {
    toggleDescription,
    openModal,
    closeModal,
    toggleDropdown,
    closeDropdown,
} from '../../redux/card/slice.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectExpandedCardId, selectIsModalOpen, selectOpenDropdowns } from '../../redux/card/selectors.js';

const Card = ({ card, handleMoveCard, handleDelete, isDeadlineToday, filteredColumns }) => {
    const dispatch = useDispatch();
    const expandedCardId = useSelector(selectExpandedCardId);
    const isModalOpen = useSelector(selectIsModalOpen);
    const openDropdowns = useSelector(selectOpenDropdowns);
    const { _id, priority, title, description, deadline } = card;



    const toggleDescriptionHandler = () => {
        dispatch(toggleDescription(_id));
    };
    const handleDeleteClick = () => {
        dispatch(openModal());
    };

    const handleConfirmDelete = () => {
        handleDelete(_id);
        dispatch(closeModal());
    };

    const handleCancelDelete = () => {
        dispatch(closeModal());
    };


    const handleMoveCardClick = (columnId) => {
        handleMoveCard(columnId, _id);
        dispatch(closeDropdown(_id));
    };

    const toggleDropdownHandler = () => {
        dispatch(toggleDropdown(_id));
    };


    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'low':
                return '#8FA1D0';
            case 'medium':
                return '#E09CB5';
            case 'high':
                return '#BEDBB0';
            case 'without':
            default:
                return 'rgba(22, 22, 22, 0.30)';
        }
    };

    return (
        <div className={s.card} style={{ '--card-color': getPriorityColor(priority) }}>
            <h5 className={s.title}>{title}</h5>

            <p
                className={`${s.description} ${expandedCardId === _id ? s.expanded : ''}`}
                onClick={toggleDescriptionHandler}
            >{description}</p>

            <span className={s.line}></span>
            <div className={s.bottom}>
                <div className={s.action}>
                    <p className={s.priority}>Priority
                        <span className={s.label} style={{ '--card-color': getPriorityColor(priority) }}>{priority}</span>
                    </p>
                    <p className={s.deadline}>Deadline<span>{deadline}</span></p>
                </div>

                <div className={s.buttons}>
                    {isDeadlineToday(deadline) && (
                        <div className={s.deadlineIcon}>
                            <svg width="16" height="16">
                                <use href={`${sprite}#bell-icon`} />
                            </svg>
                        </div>
                    )}
                    <button className={s.move} onClick={toggleDropdownHandler} disabled={filteredColumns.length === 0}>
                        <svg className={s.icon} width="16" height="16">
                            <use href={`${sprite}#arrow-circle-icon`} />
                        </svg>
                    </button>
                    <button >
                        <svg className={s.icon} width="16" height="16">
                            <use href={`${sprite}#pencil-icon`} />
                        </svg>
                    </button>
                    <button onClick={handleDeleteClick}>
                        <svg className={s.icon} width="16" height="16">
                            <use href={`${sprite}#trash-icon`} />
                        </svg>
                    </button>
                </div>
            </div>

            <Dropdown
                cardId={card._id}
                filteredColumns={filteredColumns}
                handleMoveCard={handleMoveCardClick}
                openDropdown={openDropdowns[_id]}
                closeDropdown={() => dispatch(closeDropdown(_id))}
            />
            <ModalDeleteCard
                isOpen={isModalOpen}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
};

export default Card;


















// src/components/Card.jsx
// import { useReducer } from 'react';
// import s from './Card.module.css';
// import sprite from '../../icons/icons.svg';
// import Dropdown from '../Dropdown/Dropdown.jsx';
// import ModalDeleteCard from '../ModalDeleteCard/ModalDeleteCard.jsx';
// import { cardReducer } from '../../reducers/cardReducer.js';  // Імпортуємо reducer

// const Card = ({ card, handleMoveCard, handleDelete, isDeadlineToday, toggleDropdown, openDropdowns, filteredColumns }) => {
//     const initialState = { expandedCardId: null, isModalOpen: false };
//     const [state, dispatch] = useReducer(cardReducer, initialState);

//     const { expandedCardId, isModalOpen } = state;
//     const { _id, priority, title, description, deadline } = card;

//     const toggleDescription = (cardId) => {
//         dispatch({ type: 'TOGGLE_DESCRIPTION', payload: cardId });
//     };

//     const handleDeleteClick = () => {
//         dispatch({ type: 'TOGGLE_MODAL', payload: true });
//     };

//     const handleConfirmDelete = () => {
//         handleDelete(_id);
//         dispatch({ type: 'RESET_MODAL' });
//     };

//     const handleCancelDelete = () => {
//         dispatch({ type: 'RESET_MODAL' });
//     };

//     const getPriorityColor = (priority) => {
//         switch (priority) {
//             case 'low':
//                 return '#8FA1D0';
//             case 'medium':
//                 return '#E09CB5';
//             case 'high':
//                 return '#BEDBB0';
//             case 'without':
//             default:
//                 return 'rgba(22, 22, 22, 0.30)';
//         }
//     };

//     return (
//         <div className={s.card} style={{ '--card-color': getPriorityColor(priority) }}>
//             <h5 className={s.title}>{title}</h5>

//             <p
//                 className={`${s.description} ${expandedCardId === _id ? s.expanded : ''}`}
//                 onClick={() => toggleDescription(_id)}
//             >{description}</p>

//             <span className={s.line}></span>
//             <div className={s.bottom}>
//                 <div className={s.action}>
//                     <p className={s.priority}>Priority
//                         <span className={s.label} style={{ '--card-color': getPriorityColor(priority) }}>{priority}</span>
//                     </p>
//                     <p className={s.deadline}>Deadline<span>{deadline}</span></p>
//                 </div>

//                 <div className={s.buttons}>
//                     {isDeadlineToday(deadline) && (
//                         <div className={s.deadlineIcon}>
//                             <svg width="16" height="16">
//                                 <use href={`${sprite}#bell-icon`} />
//                             </svg>
//                         </div>
//                     )}
//                     <button onClick={() => toggleDropdown(_id)}>
//                         <svg className={s.icon} width="16" height="16">
//                             <use href={`${sprite}#arrow-circle-icon`} />
//                         </svg>
//                     </button>
//                     <button>
//                         <svg className={s.icon} width="16" height="16">
//                             <use href={`${sprite}#pencil-icon`} />
//                         </svg>
//                     </button>
//                     <button onClick={handleDeleteClick}>
//                         <svg className={s.icon} width="16" height="16">
//                             <use href={`${sprite}#trash-icon`} />
//                         </svg>
//                     </button>
//                 </div>
//             </div>

//             <Dropdown
//                 cardId={card._id}
//                 filteredColumns={filteredColumns}
//                 handleMoveCard={handleMoveCard}
//                 openDropdown={openDropdowns[card._id]}
//             />
//             <ModalDeleteCard 
//                 isOpen={isModalOpen} 
//                 onClose={handleCancelDelete} 
//                 onConfirm={handleConfirmDelete}
//             />
//         </div>
//     );
// };

// export default Card;
