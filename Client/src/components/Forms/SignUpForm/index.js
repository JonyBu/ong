import React from 'react';
import { useHistory , Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHttp } from '../../../hooks/useHttp';
import { login } from '../../../redux/actions/index';

import styles from '../../../pages/Login/LoginSignUp.module.css';

const SignUpForm = ({ onSubmitSuccess, onSubmitError }) => {
	let history = useHistory();
	const dispatch = useDispatch();
	const { httpPost } = useHttp();
	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			firstName: Yup.string().max(30, 'debe tener menos de 30 caracteres').required('campo obligatorio'),
			lastName: Yup.string().max(30, 'debe tener menos de 30 caracteres').required('campo obligatorio'),
			email: Yup.string().email('email inválido').required('campo obligatorio '),
			password: Yup.string().min(6, 'deber tener al menos 6 caracteres').required('campo obligatorio'),
		}),
		onSubmit: async (values, { resetForm }) => {
			const user = values;

			try {
				const response = await httpPost('/auth/register', user);

				const data = { ...response.data.user, token: response.data.token };
				dispatch(login(data));
				resetForm();
				onSubmitSuccess(history.push('/backoffice/home'));
			} catch (error) {
				console.log(error.message);
				// onSubmitError(error.message);
			}
		},
	});

	const nameError = formik.touched.firstName && formik.errors.firstName;
	const lastNameError = formik.touched.lastName && formik.errors.lastName;
	const emailError = formik.touched.email && formik.errors.email;
	const passwordError = formik.touched.password && formik.errors.password;

	return (
		<div className={styles.signUpForm}>
			<form onSubmit={formik.handleSubmit}>
				<h2> Registrarse</h2>
				<input className={`${styles.input} ${nameError && styles.borderRed}`} id='firstName' type='text' placeholder='Nombre' {...formik.getFieldProps('firstName')} />
				{formik.touched.firstName && formik.errors.firstName ? <div className={styles.errorSpan}>{formik.errors.firstName}</div> : null}

				<input className={`${styles.input} ${lastNameError && styles.borderRed}`} id='lastName' type='text' placeholder='Apellido' {...formik.getFieldProps('lastName')} />
				{formik.touched.lastName && formik.errors.lastName ? <div className={styles.errorSpan}>{formik.errors.lastName}</div> : null}

				<input className={`${styles.input} ${emailError && styles.borderRed}`} id='email' type='email' placeholder='Dirección de e-mail' {...formik.getFieldProps('email')} />
				{formik.touched.email && formik.errors.email ? <div className={styles.errorSpan}>{formik.errors.email}</div> : null}

				<input className={`${styles.input} ${passwordError && styles.borderRed}`} id='password' type='password' placeholder='Contraseña' {...formik.getFieldProps('password')} />
				{formik.touched.password && formik.errors.password ? <div className={styles.errorSpan}>{formik.errors.password}</div> : null}
				<button className={styles.button} type='submit'>Registrar</button>
			</form>
			<span className={styles.span}> 
                Ya tienes cuenta?
                <Link to='/login'> Inicia sesión aquí</Link>
            </span>
		</div>
	);
};

export default SignUpForm;
