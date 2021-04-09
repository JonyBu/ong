import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/es.js';
import styles from '../inputStyles.module.css'

const config = {
  toolbar: [ 'heading', '|', 'bold', 'italic','|', 'undo', 'redo', '|', 'bulletedList', 'numberedList', 'link', 'blockQuote' ],
  language: 'es',
}
export const FormikEditor = ({ formikObject, label, inputName }) => {
  const { values, setFieldValue, errors } = formikObject
  const thereAreErrors = errors[inputName]
  const inputStyle = `1px solid ${thereAreErrors ? 'crimson' : 'var(--ong-gray-1)'}`

  const handleChange = (event, editor) => {
    const data = editor.getData();
    setFieldValue(inputName, data); 
  }

  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label}>
        {label}
      </label>
      <div style={{ border: inputStyle }}>
        <CKEditor      
          editor={ClassicEditor}
          data={values[inputName]}
          config={config}        
          onChange={handleChange}   
        />
      </div>
      {
        thereAreErrors
          && <span className={styles.errorSpan}>{errors[inputName]}</span>
      }
    </div>
  )
}
