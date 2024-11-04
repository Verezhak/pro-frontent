import { useState } from 'react';

const AddTaskModal = ({ onAdd, onClose }) => {
    const [taskName, setTaskName] = useState('');
    const [taskDetails, setTaskDetails] = useState('');

    const handleAddTask = () => {
        if (taskName.trim()) {
            onAdd({ taskName, taskDetails });
            setTaskName('');
            setTaskDetails('');
            onClose();
        }
    };

    return (
        <div className="modal">
            <h2>New Task</h2>
            <input
                type="text"
                value={taskName}
                onChange={e => setTaskName(e.target.value)}
                placeholder="Task name"
            />
            <textarea
                value={taskDetails}
                onChange={e => setTaskDetails(e.target.value)}
                placeholder="Task details"
            />
            <button onClick={handleAddTask}>Add</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default AddTaskModal;
