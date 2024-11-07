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
    const { _id, priority, title, description, deadline } = card;
    const toggleDescription = (cardId) => {
        setExpandedCardId(expandedCardId === cardId ? null : cardId);
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
                onClick={() => toggleDescription(_id)}
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
                                <use href={`${sprite}#icon-bell`} />
                            </svg>
                        </div>
                    )}
                    <button onClick={() => toggleDropdown(_id)}>
                        <svg className={s.icon} width="16" height="16">
                            <use href={`${sprite}#icon-circle-right`} />
                        </svg>
                    </button>
                    <button>
                        <svg className={s.icon} width="16" height="16">
                            <use href={`${sprite}#icon-pencil-01`} />
                        </svg>
                    </button>
                    <button onClick={() => handleDelete(_id)}>
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
