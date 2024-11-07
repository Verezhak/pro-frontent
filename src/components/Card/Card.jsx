import { useState } from 'react';
import s from './Card.module.css';
import sprite from '../../icons/icons.svg';
import Dropdown from '../Dropdown/Dropdown.jsx';

const Card = ({ card,
    handleMoveCard,
    handleDelete,
    isDeadlineToday,
    toggleDropdown,
    openDropdowns,
    filteredColumns }) => {
    const [expandedCardId, setExpandedCardId] = useState(null);

    const toggleDescription = (cardId) => {
        setExpandedCardId(expandedCardId === cardId ? null : cardId);
    };


    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'low':
                return '#9b59b6';
            case 'medium':
                return '#ff69b4';
            case 'high':
                return '#2ecc71';
            case 'without':
            default:
                return '#95a5a6';
        }
    };

    return (
        <div className={s.card} style={{ '--card-color': getPriorityColor(card.priority) }}>
            <h5 className={s.title}>{card.title}</h5>

            <p
                className={`${s.description} ${expandedCardId === card._id ? s.expanded : ''}`}
                onClick={() => toggleDescription(card._id)}
            >{card.description}</p>

            <span className={s.line}></span>
            <div className={s.bottom}>
                <div className={s.action}>
                    <p className={s.priority}>Priority
                        <span className={s.ops} style={{ backgroundColor: getPriorityColor(card.priority) }}></span>
                    </p>
                    <p className={s.deadline}>Deadline<span>{card.deadline}</span></p>
                </div>

                <div className={s.buttons}>
                    {isDeadlineToday(card.deadline) && (
                        <div className={s.deadlineIcon}>
                            <svg width="16" height="16">
                                <use href={`${sprite}#icon-bell`} />
                            </svg>
                        </div>
                    )}
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

            <Dropdown
                cardId={card._id}
                filteredColumns={filteredColumns}
                handleMoveCard={handleMoveCard}
                openDropdown={openDropdowns[card._id]}
            />
        </div>
    );
};

export default Card;
