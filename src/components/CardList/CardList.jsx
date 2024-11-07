import { useDispatch, useSelector } from 'react-redux';
import { selectCardsByColumnId } from '../../redux/card/selectors.js';
import Card from '../Card/Card.jsx';
import s from './CardList.module.css';
import { selectColumnsByBoardId } from '../../redux/columns/selectors.js';
import { selectSelectedBoard } from '../../redux/boards/selectors.js';
import { useEffect, useState } from 'react';
import { deleteCard, moveCard } from '../../redux/card/operations.js';
import { selectToken } from '../../redux/auth/selectors.js';
// 
const CardList = ({ columnId }) => {
    const dispatch = useDispatch();
    const cards = useSelector((state) => selectCardsByColumnId(state, columnId));
    const selectedBoard = useSelector(selectSelectedBoard);
    const boardId = selectedBoard._id;
    const token = useSelector(selectToken);

    const columns = useSelector(state => {
        return selectColumnsByBoardId(state, boardId);
    });

    const [openDropdowns, setOpenDropdowns] = useState({});
    const [today, setToday] = useState(new Date());

    const filteredColumns = columns.filter((column) => column._id !== columnId);

    const handleMoveCard = (newColumnId, cardId) => {
        if (cardId && newColumnId && newColumnId !== columnId) {

            dispatch(moveCard({
                cardId: cardId,
                columnId: newColumnId,
                boardId,
                token
            }));
            setOpenDropdowns(prevState => ({
                ...prevState,
                [cardId]: false
            }));

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
            setToday(new Date());
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const handleDelete = (cardId) => {
        dispatch(deleteCard({ cardId, token }));
    };
    const toggleDropdown = (cardId) => {
        setOpenDropdowns((prevState) => ({
            ...Object.keys(prevState).reduce((acc, key) => {
                acc[key] = false;
                return acc;
            }, {}),
            [cardId]: !prevState[cardId],
        }));
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
                        toggleDropdown={toggleDropdown}
                    />
                ))
            )}
        </div>
    );
};

export default CardList;

