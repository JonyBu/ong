import React from 'react'
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
import * as Yup from 'yup';
import { useFormik } from "formik";
import  { login } from '../../redux/actions/index'
import { useHttp } from '../../hooks/useHttp'
import styles from './LoginSignUp.module.css'

const Login =  ({ onSubmitSuccess, onSubmitError }) => {
    let history = useHistory();
    const dispatch = useDispatch();
    const { httpPost } = useHttp();
      
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(6, '6 caracteres mínimo')
                .required('Campo obligatorio'),
            email: Yup.string().email('Email inválido').required('Campo obligatorio'),
        }),
        onSubmit:  async (values, { resetForm } )  => {
             // alert(JSON.stringify(values, null, 2));
             try {
                const response = await httpPost('/auth/login', values);
                const data = {...response.data.user,token:response.data.token}
               
                dispatch(login(data))
                resetForm();
                onSubmitSuccess(history.push("/backoffice/home"));              
              } catch (error){
                onSubmitError(error.message);
              }
        }
    });

    const emailError = formik.touched.email && formik.errors.email;
    const passwordError = formik.touched.password && formik.errors.password;

    return (
        <div className={styles.loginScreen}>
            {/* <SectionHeader /> */}
                <h2>Ingresar</h2>

                <form onSubmit={formik.handleSubmit}>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Ingrese su email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        className={`${styles.input} ${emailError && styles.borderRed}`}
                    />
                    {emailError ? <div className={styles.errorSpan}>{formik.errors.email}</div> : <br />}

                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Ingrese su contraseña"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        className={`${styles.input} ${passwordError && styles.borderRed}`}
                    />

                    {passwordError ? <div className={styles.errorSpan}>{formik.errors.password}</div> : <br />}
                    <button variant="outline-primary"
                        id="submit"
                        name="submit"
                        type="submit"
                        className={styles.button}>Enviar</button>
                </form>
                <span className={styles.span}> 
                    No tienes cuenta?
                    <Link to='/registrarse'> Regístrate aquí</Link>
                </span>
        </div>
    );
}

export default Login
