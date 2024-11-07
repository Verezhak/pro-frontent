
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
                        <option value="low">Фіолетовий</option>
                        <option value="medium">Рожевий</option>
                        <option value="high">Зелений</option>
                        <option value="without">Сірий</option>
                    </select>
                </div>
                <button type="submit">Додати картку</button>
                <button type="button" onClick={onClose}>Закрити</button>
            </form>
        </div>
    );
};

export default AddCardModal;
