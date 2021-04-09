import { editOrganizationValidationSchema } from '../../../utils/schemas/editOrganizationValidations';

const handleFormikSubmit = (updateService, onSubmitSuccess, onSubmitError) => async (values, functions) => {
  const organizationContent = new FormData()
  for (const field in values) {
    organizationContent.append(field, values[field])
  }

  try {
    await updateService('/organizations/1/public/1', organizationContent)
    functions.setSubmitting(false)
    onSubmitSuccess()

  } catch (error) {
    onSubmitError(error.message)
  }
}

export const getFormikOrganizationConfig = ( updateService, onSubmitSuccess, onSubmitError ) => ({
  initialValues: { name: '', description: '', phone: '', address: '' },
  validationSchema: editOrganizationValidationSchema,
  onSubmit: handleFormikSubmit(updateService, onSubmitSuccess, onSubmitError)
})