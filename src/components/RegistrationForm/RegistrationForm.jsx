import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import s from './RegistrationForm.module.css';
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/auth/operations";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { Link, Navigate } from "react-router-dom";


const RegistrationForm = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const RegistrationSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        email: Yup.string().required('Required'),
        password: Yup.string().required('Required'),
    });

    const initialValues = {
        name: '',
        email: '',
        password: '',
    };

    const handleSubmit = (values, { resetForm }) => {
        dispatch(register(values));
        resetForm();
    };

    if (isLoggedIn) {
        return <Navigate to='/' />;
    }

    return (
        <div className={s.formContainer}>
            <Formik
                initialValues={initialValues}
                validationSchema={RegistrationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <label htmlFor="name">Name
                        <Field name="name" type='text' id="name" autoComplete="name" />
                    </label>
                    <ErrorMessage name="name" component="div" className={s.error} />
                    <label htmlFor="email">Email
                        <Field name="email" type="email" id="email" autoComplete="email" />
                    </label>
                    <ErrorMessage name="email" component="div" className={s.error} />
                    <label htmlFor="password">Password
                        <Field name="password" type="password" id="password" autoComplete="password" />
                    </label>
                    <ErrorMessage name="password" component="div" className={s.error} />
                    <button type="submit">Sign up</button>
                    <p>
                        You already have account?<Link to='/login'>Sign in!</Link>
                    </p>
                </Form>
            </Formik>
        </div>
    )
};

export default RegistrationForm;