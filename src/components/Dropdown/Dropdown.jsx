import { useSelector } from 'react-redux';
import s from './Dropdown.module.css';
import sprite from '../../icons/icons.svg'
import { selectToken } from '../../redux/auth/selectors.js';

const Dropdown = ({ filteredColumns, openDropdown, handleMoveCard, cardId }) => {
    const token = useSelector(selectToken);

    if (!openDropdown) {
        return null;
    }

    return (
        <div className={s.dropdown}>
            {filteredColumns.map((column) => (
                <button className={s.btn} key={column._id} onClick={() => handleMoveCard(column._id, cardId, token)}>
                    <span>{column.title}</span>
                    <svg className={s.icon} width="16" height="16">
                        <use href={`${sprite}#icon-circle-right`} />
                    </svg>
                </button>
            ))}
        </div>
    );
};

export default Dropdown;
