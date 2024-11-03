
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import s from './ContactForm.module.css';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';
import toast, { Toaster } from 'react-hot-toast';


const ContactForm = () => {
    const dispatch = useDispatch();
    const initialValues = { name: '', number: '' };

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(3, 'Must be at least 3 characters')
            .max(50, 'Must be 50 characters or less')
            .required('Required'),
        number: Yup.string()
            .min(3, 'Must be at least 3 characters')
            .max(50, 'Must be 50 characters or less')
            .required('Required')
    });


    const notify = () => toast('Contact successfully added!');

    const handleSubmit = async (values, { resetForm }) => {
        const newContact = { name: values.name, number: values.number };
        try {
            await dispatch(addContact(newContact)).unwrap();
            notify();
            resetForm();
        } catch (error) {
            toast.error('Failed to add contact.');
        }
    };

    // const handleSubmit = (values, { resetForm }) => {
    //     const newContact = { name: values.name, number: values.number }
    //     dispatch(addContact(newContact))
    //         .then(() => {
    //             notify();
    //         })
    //         .catch((error) => {
    //             toast.error('Failed to add contact.');
    //         });
    //     resetForm();
    // };


    return (
        <div className={s.formContainer}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <label htmlFor="name">Name
                        <Field name="name" type='text' id="name" autoComplete="name" />
                    </label>
                    <ErrorMessage name="name" component="div" className={s.error} />

                    <label htmlFor="number">Number
                        <Field name="number" type='text' id="number" autoComplete="tel" />
                    </label>
                    <ErrorMessage name="number" component="div" className={s.error} />

                    <button type="submit">Add contact</button>
                </Form>
            </Formik>
            <Toaster />
        </div>
    );
};

export default ContactForm;