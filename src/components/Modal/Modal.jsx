
import s from './Modal.module.css';

const Modal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className={s.overlay}>
            <div className={s.modal}>
                <p>Are you sure you want to delete this contact?</p>
                <div className={s.buttons}>
                    <button onClick={onConfirm}>Yes</button>
                    <button onClick={onClose}>No</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
