import { useFormik } from 'formik'
import PropTypes from 'prop-types'
import { getFormikContactConfig } from './formikConfig'
import { FormikInput } from '../Components/FormikInput'
import { useHttp } from '../../../hooks/useHttp'
import styles from './styles.module.css'

export const ContactForm = ({ onSubmitSuccess, onSubmitError }) => {
  const { httpPost } = useHttp(); 
  const formikConfig = getFormikContactConfig(httpPost, onSubmitSuccess, onSubmitError)
  const { isSubmitting, handleSubmit, ...formik } = useFormik(formikConfig)

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form}
    >
      <FormikInput
        formikObject={formik}
        type='text'
        inputName='name'
        label='Nombre'
      />
      <FormikInput
        formikObject={formik}
        type='email'
        inputName='email'
        label='E-Mail'
      />
      <FormikInput
        formikObject={formik}
        type='number'
        inputName='phone'
        label='Teléfono'
      />
      <FormikInput
        formikObject={formik}
        type='text'
        inputName='message'
        label='Mensaje'
        isTextArea
      />
      <button
        type='submit'
        disabled={isSubmitting}
        className={styles.button}
      >
        { isSubmitting ? 'Enviando...' : 'Enviar' }
      </button>
    </form>
  )
}

ContactForm.propTypes = {
  onSubmitSuccess: PropTypes.func.isRequired,
  onSubmitError: PropTypes.func.isRequired
}