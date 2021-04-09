import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styles from '../inputStyles.module.css'

export const FormikFileInput = ({ formikObject, inputName, label, prevImage }) => {
  const [ imageSrc, setImageSrc ] = useState(prevImage)
  const { errors, setFieldValue } = formikObject
  const thereAreErrors = errors[inputName]
  const inputClassName = `${styles.input} ${thereAreErrors && styles.borderRed}`

  useEffect(() => {
    setImageSrc(prevImage)
  }, [prevImage])
  
  const handleChange = (e) => {
    setFieldValue(inputName, e.target.files[0])
    updatePreview(e.target.files[0])
  }
  
  const updatePreview = (image) => {
    const reader = new FileReader()
    reader.onload = (e) => setImageSrc(e.target.result)
    reader.readAsDataURL(image)
  }

  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label}>
        {label}
      </label>
      <div className={styles.imageWrapper}>
        <img
          src={imageSrc}
          alt='preview'
          className={styles.image}
        />
      </div>
      <input
        className={inputClassName}
        type='file'
        onChange={handleChange}
        accept="image/x-png,image/jpg,image/jpeg"
        name={inputName}
      />
      {
        thereAreErrors
          && <span className={styles.errorSpan}>{errors[inputName]}</span>
      }
    </div>
  )
}

FormikFileInput.propTypes = {
  formikObject: PropTypes.shape({
    errors: PropTypes.any.isRequired,
    setFieldValue: PropTypes.func.isRequired,
  }),
  inputName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

FormikFileInput.defaultProps = {
  prevImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png'
}