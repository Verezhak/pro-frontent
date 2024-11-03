import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import s from './LoginForm.module.css';
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { Link, Navigate } from "react-router-dom";


const LoginForm = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    });
    const initialValues = {
        email: '',
        password: '',
    };
    const handleSubmit = (values, { resetForm }) => {
        dispatch(logIn(values));
        resetForm();
    };

    if (isLoggedIn) {
        return <Navigate to='/' />;
    }

    return (
        <div className={s.formContainer}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form autoComplete="off">
                    <label htmlFor="email">Email
                        <Field name="email" type="email" id="email" autoComplete="email" />
                    </label>
                    <ErrorMessage name="name" component="div" className={s.error} />
                    <label htmlFor="password">Password
                        <Field name="password" type="password" id="password" autoComplete="password" />
                    </label>
                    <ErrorMessage name="password" component="div" className={s.error} />

                    <button type="submit">
                        Sign in
                    </button>
                    <p>
                        You do not have account?<Link to='/register'>Sign up!</Link>
                    </p>
                </Form>
            </Formik>

        </div>
    )
};

export default LoginForm;