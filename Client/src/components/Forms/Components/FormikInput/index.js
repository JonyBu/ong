import PropTypes from 'prop-types'
import styles from '../inputStyles.module.css'

export const FormikInput = ({ formikObject, label, inputName, type, isTextArea = false }) => {
  const { values, touched, errors, handleChange, handleBlur } = formikObject
  const HtmlInput = isTextArea ? 'textarea' : 'input'
  const thereAreErrors = errors[inputName] && touched[inputName]
  const inputClassName = `${styles.input} ${isTextArea && styles.textArea} ${thereAreErrors && styles.borderRed}`

  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label}>
        {label}
      </label>
      <HtmlInput
        type={type}
        id={inputName}
        name={inputName}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[inputName]}
        className={inputClassName}
      />
      {
        thereAreErrors
          && <span className={styles.errorSpan}>{errors[inputName]}</span>
      }
    </div>
  )
}

FormikInput.propTypes = {
  formikObject: PropTypes.shape({
    values: PropTypes.any.isRequired,
    touched: PropTypes.any.isRequired,
    errors: PropTypes.any.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired
  }),
  label: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'email', 'number', 'password', 'url', 'tel']).isRequired,
  isTextArea: PropTypes.bool
}