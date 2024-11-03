import { useDispatch } from 'react-redux';
import s from './Contact.module.css';
import { deleteContact } from '../../redux/contacts/operations';
import { RiDeleteBin5Fill } from "react-icons/ri";

import toast, { Toaster } from 'react-hot-toast';
import Modal from '../Modal/Modal';
import { useState } from 'react';

const Contact = ({ id, name, number }) => {
    const dispatch = useDispatch();
    const [isModalOpen, setModalOpen] = useState(false);

    const notify = () => toast('The contact has been deleted!');

    const handleDelete = async () => {
        try {
            await dispatch(deleteContact(id)).unwrap();
            notify();
            setModalOpen(false);
        } catch (error) {
            toast.error('Failed to delete contact.');
        }
    };

    // const handleDelete = () => {
    //     dispatch(deleteContact(id))
    //         .then(() => {
    //             notify();
    //         })
    //         .catch((error) => {
    //             toast.error('Failed to delete contact.');
    //         });
    //     setModalOpen(false);
    // };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <li className={s.item}>
                <p>{name}</p>
                <p>{number}</p>
                <button onClick={openModal}><RiDeleteBin5Fill className={s.icon} size="24" /></button>
            </li>
            <Toaster />
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleDelete}
            />
        </>
    );
};

export default Contact;