import { useFormik } from 'formik';
import { getFormikNewConfig } from './formikConfig';
import { FormikForm } from '../Components/FormikForm'
import { FormikInput } from '../Components/FormikInput'
import { FormikFileInput } from '../Components/FormikFileInput'
import { FormikEditor } from '../Components/FormikEditor';
import { useHttp } from '../../../hooks/useHttp';

const NewsForm = ({ editValues , onSubmitSuccess, onSubmitError , onCloseModal }) => {
  const { httpPost, httpUpdate } = useHttp(); 
  // If editValues is not null and has keys, the state of the form is for edit.
  const isEdit = editValues && Object.keys(editValues).length > 0 ? true : false;
  const formikConfig = getFormikNewConfig(isEdit, editValues, httpPost, httpUpdate, handleSubmitSuccess, onSubmitError); 
  const { isSubmitting, handleSubmit, ...formik } = useFormik(formikConfig)

  function handleSubmitSuccess(editedValues) {
    onSubmitSuccess(editedValues.data.new);
    onCloseModal();
  }  

  return (
    <FormikForm
      title='Novedades'
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
    >
      <FormikInput
        formikObject={formik}
        label='Título'
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

      <FormikInput
        formikObject={formik}
        label='Categoría'
        inputName='categoryId'
        type='number'
      />                     
    </FormikForm>
  )
}

export default NewsForm;
