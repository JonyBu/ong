import { useEffect } from 'react'
import { useFormik } from 'formik'
import PropTypes from 'prop-types'
import { FormikForm } from '../Components/FormikForm'
import { FormikInput } from '../Components/FormikInput'
import { FormikFileInput } from '../Components/FormikFileInput'
import { getFormikContactConfig } from './formikConfig'
import { useHttp } from '../../../hooks/useHttp'
import styles from './styles.module.css'

export const HomeForm = ({ serverValues, onSubmitSuccess, onSubmitError }) => {
  const { httpUpdate } = useHttp()
  const formikConfig = getFormikContactConfig(httpUpdate, onSubmitSuccess, onSubmitError)
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
      title='Página de inicio'
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
    >

      <FormikInput
        formikObject={formik}
        label='Texto de bienvenida'
        inputName='welcomeText'
        type='text'
        isTextArea
      />

      <FormikInput
        formikObject={formik}
        label='Texto slide 1'
        inputName='sliderText1'
        type='text'
      />

      <FormikFileInput
        formikObject={formik}
        label='Imagen slide 1'
        inputName='sliderPic1'
        prevImage={serverValues?.sliderPic1}
      />

      <FormikInput
        formikObject={formik}
        label='Texto slide 2'
        inputName='sliderText2'
        type='text'
      />

      <FormikFileInput
        formikObject={formik}
        label='Imagen slide 2'
        inputName='sliderPic2'
        prevImage={serverValues?.sliderPic2}
      />

      <FormikInput
        formikObject={formik}
        label='Texto slide 3'
        inputName='sliderText3'
        type='text'
      />

      <FormikFileInput
        formikObject={formik}
        label='Imagen slide 3'
        inputName='sliderPic3'
        prevImage={serverValues?.sliderPic3}
      />

    </FormikForm>
  )
}

HomeForm.propTypes = {
  serverValues: PropTypes.shape({
    welcomeText: PropTypes.string,
    sliderText1: PropTypes.string,
    sliderText2: PropTypes.string,
    sliderText3: PropTypes.string 
  }),
  onSubmitSuccess: PropTypes.func.isRequired,
  onSubmitError: PropTypes.func.isRequired,
}
