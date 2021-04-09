import { editHomeValidationSchema } from '../../../utils/schemas/editHomeValidations'

const handleFormikSubmit = (updateService, onSubmitSuccess, onSubmitError) => async (values, functions) => {
  const homeContent = new FormData()
  for (const field in values) {
    homeContent.append(field, values[field])
  }

  try {
    await updateService('/organizations/1/public/1', homeContent)
    functions.setSubmitting(false)
    onSubmitSuccess()

  } catch (error) {
    onSubmitError(error.message)
  }
}

export const getFormikContactConfig = ( updateService, onSubmitSuccess, onSubmitError ) => ({
  initialValues: { welcomeText: '', sliderText1: '', sliderText2: '', sliderText3: '' },
  validationSchema: editHomeValidationSchema,
  onSubmit: handleFormikSubmit(updateService, onSubmitSuccess, onSubmitError)
})