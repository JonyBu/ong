import * as Yup from 'yup'
import { imageField } from './imageValidation'

const nameField = Yup.string()
  .min(3, '*Mínimo 3 carácteres')
  .max(100, '*Máximo 100 carácteres')
  .required('*Campo obligatorio')

const roleField = Yup.number().oneOf([1, 2])

export const userValidationSchema = Yup.object({
  firstName: nameField,
  lastName: nameField,
  image: imageField,
  roleId: roleField
})