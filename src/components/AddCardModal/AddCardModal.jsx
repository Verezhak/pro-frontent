
import { useState } from 'react';

const AddCardModal = ({ onAdd, onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('without');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = { title, description, priority };
        onAdd(newTask);
        onClose();
    };


    return (
        <div className="modal">
            <h2>Додати нову картку</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Назва:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Опис:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div>
                    <label>Колір:</label>
                    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="without">Without</option>
                    </select>
                </div>
                <button type="submit">Додати картку</button>
                <button type="button" onClick={onClose}>Закрити</button>
            </form>
        </div>
    );
};

export default AddCardModal;




// src/components/AddCardModal.jsx
// import { useReducer } from 'react';
// import { formReducer } from '../../reducers/formReducer.js';  // Імпортуємо reducer

// const AddCardModal = ({ onAdd, onClose }) => {
//     const initialState = { title: '', description: '', priority: 'without' };
//     const [state, dispatch] = useReducer(formReducer, initialState);

//     const { title, description, priority } = state;

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const newTask = { title, description, priority };
//         onAdd(newTask);
//         dispatch({ type: 'RESET_FORM' });  // Скидаємо форму після додавання
//         onClose();
//     };

//     return (
//         <div className="modal">
//             <h2>Додати нову картку</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Назва:</label>
//                     <input
//                         type="text"
//                         value={title}
//                         onChange={(e) => dispatch({ type: 'SET_TITLE', payload: e.target.value })}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Опис:</label>
//                     <textarea
//                         value={description}
//                         onChange={(e) => dispatch({ type: 'SET_DESCRIPTION', payload: e.target.value })}
//                         required
//                     ></textarea>
//                 </div>
//                 <div>
//                     <label>Колір:</label>
//                     <select
//                         value={priority}
//                         onChange={(e) => dispatch({ type: 'SET_PRIORITY', payload: e.target.value })}
//                     >
//                         <option value="low">Low</option>
//                         <option value="medium">Medium</option>
//                         <option value="high">High</option>
//                         <option value="without">Without</option>
//                     </select>
//                 </div>
//                 <button type="submit">Додати картку</button>
//                 <button type="button" onClick={onClose}>Закрити</button>
//             </form>
//         </div>
//     );
// };

// export default AddCardModal;
