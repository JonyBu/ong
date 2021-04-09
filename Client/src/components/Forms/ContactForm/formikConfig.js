import * as Yup from 'yup';

const validationContactSchema = Yup.object({
  name: Yup.string()
    .max(30, 'Debe tener menos de 30 caracteres.')
    .matches((/^[a-zA-Z0-9 ]{1,50}$/), 'Sólo caracteres alfanúmericos.')
    .required('Campo obligatorio.'),
  email: Yup.string()
    .email('E-Mail inválido.')
    .required('Campo obligatorio.'),
  phone: Yup.number()
    .max(9999999999, 'Debe tener hasta 10 dígitos.')
    .required('Campo obligatorio.'),
  message: Yup.string()
    .max(200, 'Debe tener menos de 200 caracteres.')
    .required('Campo obligatorio.')
})

const handleFormikSubmit = (postService, onSubmitSuccess, onSubmitError) => async (values, functions) => {
  const contactMessage = {
    name: values.name,
    email: values.email,
    phone: values.phone,
    message: values.message
  }
  try {
    await postService('/contacts', contactMessage)
    functions.setSubmitting(false)

    onSubmitSuccess()
    functions.resetForm()
  } catch (error) {
    onSubmitError(error.message)
  }
}

export const getFormikContactConfig = (postService, onSubmitSuccess, onSubmitError) => ({
  initialValues: {
    name: '',
    email: '',
    message: ''
  },
  validationSchema: validationContactSchema,
  onSubmit: handleFormikSubmit(postService, onSubmitSuccess, onSubmitError)
})