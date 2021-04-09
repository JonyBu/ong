import PropTypes from 'prop-types'
import { inputWrapper, label as Label, input } from '../inputStyles.module.css'

export const FormikSelectInput = ({ formikObject, label, inputName, children }) => {
  const { values, handleChange } = formikObject

  return (
    <div className={inputWrapper}>
      <label className={Label}>
        {label}
      </label>
      <select
        name={inputName}
        value={values[inputName]}
        onChange={handleChange}
        className={input}
      >
        {children}
      </select>
    </div>
  );
};

FormikSelectInput.propTypes = {
  formikObject: PropTypes.shape({
    values: PropTypes.any.isRequired,
    handleChange: PropTypes.func.isRequired
  }),
  label: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
}