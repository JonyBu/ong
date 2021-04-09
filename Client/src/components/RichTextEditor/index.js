import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/es.js';
import styles from './styles.module.css';


const Editor = ({ data, field, form}) => {

  const config = {
    toolbar: [ 'heading', '|', 'bold', 'italic','|', 'undo', 'redo', '|', 'bulletedList', 'numberedList', 'link', 'blockQuote' ],
    language: 'es',
  }

  return (
    <div className={ styles.editorContainer}>
      <CKEditor      
        editor={ ClassicEditor }
        data={ data }
        config={ config }        
        onChange={ ( event, editor ) => {
          const data = editor.getData();
          form.setFieldValue(field.name, data);          
        }}              
      />
    </div>
  )
}

export default Editor;
