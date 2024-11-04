import { useState } from 'react';

const AddColumnModal = ({ onAdd, onClose }) => {
    const [columnName, setColumnName] = useState('');

    const handleAddColumn = () => {
        if (columnName.trim()) {
            onAdd(columnName);
            setColumnName('');
            onClose();
        }
    };

    return (
        <div className="modal">
            <h2>Add New Column</h2>
            <input
                type="text"
                value={columnName}
                onChange={e => setColumnName(e.target.value)}
                placeholder="Enter column name"
            />
            <button onClick={handleAddColumn}>Add</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default AddColumnModal;
