import React from 'react';
import { useFormik } from 'formik';
import { FormikForm } from '../Components/FormikForm'
import { FormikInput } from '../Components/FormikInput'
import { FormikFileInput } from '../Components/FormikFileInput'
import { getFormikTestimonialConfig } from './formikConfig';
import { FormikEditor } from '../Components/FormikEditor';
import { useHttp } from '../../../hooks/useHttp';


const TestimonyForm = ({ editValues, onSubmitSuccess, onSubmitError, onCloseModal }) => {
  const { httpPost, httpUpdate } = useHttp(); 
  // If editValues is not null and has keys, the state of the form is for edit.
  const isEdit = editValues && Object.keys(editValues).length > 0 ? true : false;
  const formikConfig = getFormikTestimonialConfig(isEdit, editValues, httpPost, httpUpdate, handleSubmitSuccess, onSubmitError); 
  const { isSubmitting, handleSubmit, ...formik } = useFormik(formikConfig)
    
  function handleSubmitSuccess(editedValues) {
    onSubmitSuccess(editedValues.data.testimony);
    onCloseModal();
  }  

  return (
    <FormikForm
      title='Testimonios'
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
    >
      <FormikInput
        formikObject={formik}
        label='Nombre'
        inputName='name'
        type='text'
      />

      <FormikFileInput
        formikObject={formik}
        label='Imagen'
        inputName='image'
        prevImage={editValues.image}
      />

      <FormikEditor
        formikObject={formik}
        label='Contenido'
        inputName='content'
      />
    </FormikForm>
  )
}

export default TestimonyForm;
