// import { useDispatch, useSelector } from 'react-redux';
import { selectCardsByColumnId, selectSelectedBoard } from '../../redux/card/selectors.js';
// import Card from '../Card/Card.jsx';
// import s from './CardList.module.css';
import { selectColumnsByBoardId } from '../../redux/columns/selectors.js';
// import { selectSelectedBoard } from '../../redux/boards/selectors.js';
// import { useEffect, useState } from 'react';
import { deleteCard, moveCard } from '../../redux/card/operations.js';

// // 
// const CardList = ({ columnId }) => {
//     const dispatch = useDispatch();
//     const cards = useSelector((state) => selectCardsByColumnId(state, columnId));
//     const selectedBoard = useSelector(selectSelectedBoard);
//     const boardId = selectedBoard._id;
//     const columns = useSelector(state => {
//         return selectColumnsByBoardId(state, boardId);
//     });
//     const [openDropdowns, setOpenDropdowns] = useState({});
//     const [today, setToday] = useState(new Date());
//     const filteredColumns = columns.filter((column) => column._id !== columnId);

//     const handleDelete = (cardId) => {
//         dispatch(deleteCard({ cardId}));
//     };

//     const handleMoveCard = (newColumnId, cardId) => {
//         if (cardId && newColumnId && newColumnId !== columnId) {

//             dispatch(moveCard({
//                 cardId: cardId,
//                 columnId: newColumnId,
//                 boardId
//             }));
//             setOpenDropdowns(prevState => ({
//                 ...prevState,
//                 [cardId]: false
//             }));

//         }
//     };

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


//     const toggleDropdown = (cardId) => {
//         setOpenDropdowns((prevState) => ({
//             ...Object.keys(prevState).reduce((acc, key) => {
//                 acc[key] = false;
//                 return acc;
//             }, {}),
//             [cardId]: !prevState[cardId],
//         }));
//     };



//     return (
//         <div className={s.cardsContainer}>
//             {cards.length === 0 ? (
//                 <p>No cards available in this column.</p>
//             ) : (
//                 cards.map((card) => (
//                     <Card
//                         key={card._id}
//                         card={card}
//                         columnId={columnId}
//                         handleMoveCard={handleMoveCard}
//                         handleDelete={handleDelete}
//                         isDeadlineToday={isDeadlineToday}
//                         openDropdowns={openDropdowns}
//                         filteredColumns={filteredColumns}
//                         toggleDropdown={toggleDropdown}
//                     />
//                 ))
//             )}
//         </div>
//     );
// };

// export default CardList;







import { useDispatch, useSelector } from 'react-redux';

import s from './CardList.module.css';
// import { selectColumnsByBoardId } from '../../redux/card/selectors.js';
// import { selectSelectedBoard } from '../../redux/cards/selectors.js';
import { useEffect } from 'react';
// import { deleteCard, moveCard } from '../../redux/cards/operations.js';
import Card from '../Card/Card.jsx';
import { toggleDropdown, updateToday } from '../../redux/card/slice.js';
// 
const CardList = ({ columnId }) => {
    const dispatch = useDispatch();
    const cards = useSelector((state) => selectCardsByColumnId(state, columnId));
    const selectedBoard = useSelector(selectSelectedBoard);
    const boardId = selectedBoard?._id;
    const columns = useSelector(state => {
        return selectColumnsByBoardId(state, boardId);
    });
    const today = useSelector(state => state.cards.today);
    const openDropdowns = useSelector(state => state.cards.openDropdowns);
    const filteredColumns = columns.filter((column) => column._id !== columnId);

    const handleDelete = (cardId) => {
        dispatch(deleteCard({ cardId }));
    };

    const handleMoveCard = (newColumnId, cardId) => {
        if (cardId && newColumnId && newColumnId !== columnId) {
            dispatch(moveCard({ cardId, columnId: newColumnId, boardId }));
            dispatch(toggleDropdown(cardId));
        }
    };


    const isDeadlineToday = (deadline) => {
        const deadlineDate = new Date(deadline);
        const currentDate = new Date(today);
        currentDate.setHours(0, 0, 0, 0);
        deadlineDate.setHours(0, 0, 0, 0);
        return currentDate.getTime() === deadlineDate.getTime();
    };

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(updateToday());
        }, 60000);

        return () => clearInterval(interval);
    }, [dispatch]);


    const toggleDropdownHandler = (cardId) => {
        dispatch(toggleDropdown(cardId));
    };




    return (
        <div className={s.cardsContainer}>
            {cards.length === 0 ? (
                <p>No cards available in this column.</p>
            ) : (
                cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                        columnId={columnId}
                        handleMoveCard={handleMoveCard}
                        handleDelete={handleDelete}
                        isDeadlineToday={isDeadlineToday}
                        openDropdowns={openDropdowns}
                        filteredColumns={filteredColumns}
                        toggleDropdown={toggleDropdownHandler}
                    />
                ))
            )}
        </div>
    );
};

export default CardList;










// import { useReducer, useEffect } from 'react';
// import { deleteCard, moveCard } from '../../redux/card/operations.js'; 
// import Card from '../Card/Card.jsx';
// import s from './CardList.module.css';
// import { selectColumnsByBoardId } from '../../redux/columns/selectors.js';
// import { selectSelectedBoard } from '../../redux/boards/selectors.js';
// import { cardReducer } from '../../reducers/cardReducer'; 
// import { useSelector } from 'react-redux';

// // Початковий стан
// const initialState = {
//     cards: [],
//     openDropdowns: {},
//     expandedCardId: null,
//     isModalOpen: false,
//     today: new Date(),
// };

// const CardList = ({ columnId }) => {
//     const [state, dispatch] = useReducer(cardReducer, initialState);

//     const selectedBoard = useSelector(selectSelectedBoard);
//     const boardId = selectedBoard._id;
//     const columns = useSelector(state => selectColumnsByBoardId(state, boardId));
//     const filteredColumns = columns.filter((column) => column._id !== columnId);

//     const handleDelete = (cardId) => {
//         dispatch(deleteCard({ cardId }));
//     };

//     const handleMoveCard = (newColumnId, cardId) => {
//         if (cardId && newColumnId && newColumnId !== columnId) {
//             dispatch(moveCard({
//                 cardId,
//                 columnId: newColumnId,
//                 boardId
//             }));
//             dispatch({ type: 'TOGGLE_DROPDOWN', payload: { cardId } });
//         }
//     };

//     const isDeadlineToday = (deadline) => {
//         const deadlineDate = new Date(deadline);
//         const currentDate = new Date(state.today);
//         currentDate.setHours(0, 0, 0, 0);
//         deadlineDate.setHours(0, 0, 0, 0);
//         return currentDate.getTime() === deadlineDate.getTime();
//     };

//     // Оновлюємо дату кожні 60 секунд
//     useEffect(() => {
//         const interval = setInterval(() => {
//             dispatch({ type: 'SET_TODAY', payload: new Date() });
//         }, 60000);

//         return () => clearInterval(interval);
//     }, []);

//     const toggleCardDropdown = (cardId) => {
//         dispatch({ type: 'TOGGLE_DROPDOWN', payload: { cardId } });
//     };

//     const toggleDescription = (cardId) => {
//         dispatch({ type: 'TOGGLE_DESCRIPTION', payload: cardId });
//     };

//     const toggleModal = (open) => {
//         dispatch({ type: 'TOGGLE_MODAL', payload: open });
//     };

//     return (
//         <div className={s.cardsContainer}>
//             {state.cards.length === 0 ? (
//                 <p>No cards available in this column.</p>
//             ) : (
//                 state.cards.map((card) => (
//                     <Card
//                         key={card._id}
//                         card={card}
//                         columnId={columnId}
//                         handleMoveCard={handleMoveCard}
//                         handleDelete={handleDelete}
//                         isDeadlineToday={isDeadlineToday}
//                         openDropdowns={state.openDropdowns}
//                         filteredColumns={filteredColumns}
//                         toggleDropdown={toggleCardDropdown}
//                         toggleDescription={toggleDescription}
//                         expandedCardId={state.expandedCardId}
//                         toggleModal={toggleModal}
//                         isModalOpen={state.isModalOpen}
//                     />
//                 ))
//             )}
//         </div>
//     );
// };

// export default CardList;
