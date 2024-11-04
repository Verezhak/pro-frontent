import { useState } from 'react';
import AddTaskModal from '../AddTaskModal/AddTaskModal.jsx';


const ColumnDetails = ({ columnId }) => {
    const [isTaskModalOpen, setTaskModalOpen] = useState(false);

    const handleAddTask = (task) => {
        // Додайте логіку для відправки задачі до Redux або API
        console.log('New task added:', task);
        // Тут ви можете викликати Redux action для додавання задачі
    };

    return (
        <div>
            <h4>Tasks for Column {columnId}</h4>
            <button onClick={() => setTaskModalOpen(true)}>Add Task</button>

            {isTaskModalOpen && (
                <AddTaskModal
                    onAdd={handleAddTask}
                    onClose={() => setTaskModalOpen(false)}
                />
            )}

            {/* Відображення списку задач тут */}
        </div>
    );
};

export default ColumnDetails;
