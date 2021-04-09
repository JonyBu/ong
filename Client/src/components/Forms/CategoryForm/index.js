import { useFormik } from 'formik'
import PropTypes from 'prop-types'

import { useHttp } from '../../../hooks/useHttp'

import { FormikForm } from '../Components/FormikForm'
import { FormikInput } from '../Components/FormikInput'
 
import { getFormikConfig } from './formikConfig'

export default function CategoryForm ({ onSubmitSuccess, onSubmitError, category, onCloseModal }) {
  const { httpPost, httpUpdate } = useHttp();
  const formikConfig = getFormikConfig({
    httpPost, 
    httpUpdate, 
    onSubmitSuccess, 
    onSubmitError,
    onCloseModal,
    categoryId: category.id,
  });

  const { isSubmitting, handleSubmit, ...formik } = useFormik({ 
    ...formikConfig,
    initialValues: { 
      name: category?.name,
      description: category?.description 
    },
  });

  return (
    <FormikForm
      title='Categoría'
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
    >
      <FormikInput
        formikObject={formik}
        type="text"
        inputName="name"
        label="Nombre"
      />
      <FormikInput
        formikObject={formik}
        type="text"
        inputName="description"
        label="Descripción"
        isTextArea
      />
    </FormikForm>
  )
}

CategoryForm.propTypes = {
  onSubmitSuccess: PropTypes.func.isRequired,
  onSubmitError: PropTypes.func.isRequired, 
  category: PropTypes.shape({
    id: PropTypes.oneOf([
      PropTypes.string,
      PropTypes.number,
    ]),
    name: PropTypes.string,
    description: PropTypes.string,
  }), 
};

CategoryForm.defaultProps = {
  category: {
    id: null,
    name: '',
    description: '',
  },
};
