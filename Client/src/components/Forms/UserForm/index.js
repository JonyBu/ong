import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import PropTypes from 'prop-types'
import { FormikForm } from '../Components/FormikForm'
import { FormikInput } from '../Components/FormikInput'
import { FormikFileInput } from '../Components/FormikFileInput'
import { useHttp } from '../../../hooks/useHttp'
import { FormikSelectInput } from '../Components/formikSelectInput'
import { userValidationSchema } from '../../../utils/schemas/userValidations'

export const UserForm = ({ editValues , onSubmitSuccess, onSubmitError , onCloseModal }) => {
  const { isAdmin } = useSelector(state => state.user)
  const { httpUpdate } = useHttp()
  const { isSubmitting, handleSubmit, ...formik } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      roleId: 0,
    },
    onSubmit: handleFormikSubmit,
    validationSchema: userValidationSchema
  })

  useEffect(() => {
    populateInputsWithServerValues()
  }, [editValues])
  
  const populateInputsWithServerValues = () => {
    const editableFields = ['firstName', 'lastName', 'image', 'roleId']
    for (const field in editValues) {
      editableFields.includes(field) &&
        formik.setFieldValue(field, editValues[field])
    }
  }

  async function handleFormikSubmit (values, functions) {
    const userUpdate = new FormData()
    for (const field in values) {
      userUpdate.append(field, values[field])
    }

    try {
      const { data: { user } } = await httpUpdate(`/users/${editValues.id}`, userUpdate)
      functions.setSubmitting(false)
      onSubmitSuccess(user)
      onCloseModal()
    } catch (error) {
      onSubmitError(error.message)
    }
  }

  return (
    <FormikForm
      title='Usuarios'
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
    >
  
      <FormikInput
        formikObject={formik}
        label='Nombre'
        inputName='firstName'
        type='text'
      />

      <FormikInput
        formikObject={formik}
        label='Apellido'
        inputName='lastName'
        type='text'
      />

      <FormikFileInput
        formikObject={formik}
        label='Foto'
        inputName='image'
        prevImage={editValues.image}
      />

      {
        isAdmin &&
          <FormikSelectInput
            formikObject={formik}
            label='Rol'
            inputName='roleId'
          >
            <option value={1} label='Administrador' />
            <option value={2} label='Usuario' />
          </FormikSelectInput>
      }
    </FormikForm>
  )
}

UserForm.propTypes = {
  editValues: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    roleId: PropTypes.number.isRequired,
    image: PropTypes.string
  }),
  onSubmitSuccess: PropTypes.func.isRequired,
  onSubmitError: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired
}