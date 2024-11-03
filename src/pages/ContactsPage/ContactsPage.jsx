import React, { useEffect } from 'react';

import './ContactsPage.module.css';

import { useDispatch } from 'react-redux';
import ContactForm from '../../components/ContactForm/ContactForm';
import SearchBox from '../../components/SearchBox/SearchBox';
import ContactList from '../../components/ContactList/ContactList';
import { fetchContacts } from '../../redux/contacts/operations';

const ContactsPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch])
    return (
        <div className='box'>
            <ContactForm />
            <SearchBox />
            <ContactList />
        </div>
    );
};

export default ContactsPage;