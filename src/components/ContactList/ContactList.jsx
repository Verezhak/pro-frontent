
import { useSelector } from 'react-redux';
import Contact from '../Contact/Contact';
import s from './ContactList.module.css';

import { selectIsError, selectIsLoading } from '../../redux/contacts/selectors';
import { selectFilteredContacts } from '../../redux/filters/selectors';
import Loader from '../Loader/Loader';

const ContactList = () => {

    const contacts = useSelector(selectFilteredContacts);
    const isLoading = useSelector(selectIsLoading);
    const isError = useSelector(selectIsError);

    return (
        <div>
            {isLoading && !isError && <Loader />}
            {!isLoading && isError && <h2>Oops... The action cannot be performed...</h2>}
            <ul className={s.list}>
                {contacts.length ? (contacts.map(({ id, name, number }) => (
                    <Contact
                        key={id}
                        id={id}
                        name={name}
                        number={number}

                    />
                ))) : (
                    <h1>No data received!</h1>
                )}
            </ul>
        </div>
    );
};

export default ContactList;