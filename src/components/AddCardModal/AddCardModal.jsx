// // import { useState } from "react";



// // const AddCardModal = ({ onAdd, onClose }) => {
// //     const [taskName, setTaskName] = useState('');
// //     const [taskDetails, setTaskDetails] = useState('');

// //     const handleAddTask = () => {
// //         if (taskName.trim()) {
// //             onAdd({ taskName, taskDetails });
// //             setTaskName('');
// //             setTaskDetails('');
// //             onClose();
// //         }
// //     };

// //     return (
// //         <div className="modal">
// //             <h2>New Task</h2>
// //             <input
// //                 type="text"
// //                 value={taskName}
// //                 onChange={e => setTaskName(e.target.value)}
// //                 placeholder="Task name"
// //             />
// //             <textarea
// //                 value={taskDetails}
// //                 onChange={e => setTaskDetails(e.target.value)}
// //                 placeholder="Task details"
// //             />
// //             <button onClick={handleAddTask}>Add</button>
// //             <button onClick={onClose}>Cancel</button>
// //         </div>
// //     );
// // };

// // export default AddCardModal
// import { useState } from 'react';

// const AddCardModal = ({ onAdd, onClose }) => {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [color, setColor] = useState('blue'); // Встановіть значення за замовчуванням

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const newTask = { title, description, color };
//         onAdd(newTask);
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
//                         onChange={(e) => setTitle(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Опис:</label>
//                     <textarea
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                         required
//                     ></textarea>
//                 </div>
//                 <div>
//                     <label>Колір:</label>
//                     <select value={color} onChange={(e) => setColor(e.target.value)}>
//                         <option value="blue">Синій</option>
//                         <option value="pink">Рожевий</option>
//                         <option value="green">Зелений</option>
//                         <option value="gray">Сірий</option>
//                     </select>
//                 </div>
//                 <button type="submit">Додати картку</button>
//                 <button type="button" onClick={onClose}>Закрити</button>
//             </form>
//         </div>
//     );
// };

// export default AddCardModal;
