import { useEffect } from 'react'
import { useFormik } from 'formik'
import PropTypes from 'prop-types'
import { FormikForm } from '../Components/FormikForm'
import { FormikInput } from '../Components/FormikInput'
import { FormikFileInput } from '../Components/FormikFileInput'
import { getFormikOrganizationConfig } from './formikConfig'
import { useHttp } from '../../../hooks/useHttp'

export const OrganizationForm = ({ serverValues, onSubmitSuccess, onSubmitError }) => {
  const { httpUpdate } = useHttp()
  const formikConfig = getFormikOrganizationConfig(httpUpdate, onSubmitSuccess, onSubmitError)
  const { isSubmitting, handleSubmit, ...formik } = useFormik(formikConfig)

  useEffect(() => {
    populateInputsWithServerValues()
  }, [serverValues])
  
  const populateInputsWithServerValues = () => {
    for (const field in serverValues) {
      formik.setFieldValue(field, serverValues[field])
    }
  }

  return (
    <FormikForm
      title='Organización'
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
        label='Logo de organización'
        inputName='image'
        prevImage={serverValues?.image}
      />

      <FormikInput
        formikObject={formik}
        label='Descripción'
        inputName='description'
        type='text'
        isTextArea
      />   

      <FormikInput
        formikObject={formik}
        label='Teléfono'
        inputName='phone'
        type='text'        
      />      

      <FormikInput
        formikObject={formik}
        label='Dirección'
        inputName='address'
        type='text'        
      />  
    </FormikForm>
  )
}

OrganizationForm.propTypes = {
  serverValues: PropTypes.shape({
    name: PropTypes.string,
    description : PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string
  }),
  onSubmitSuccess: PropTypes.func.isRequired,
  onSubmitError: PropTypes.func.isRequired,
}
