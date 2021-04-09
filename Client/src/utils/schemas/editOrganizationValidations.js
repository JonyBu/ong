import * as Yup from 'yup'
import { imageField } from './imageValidation'

const textField = Yup.string().required('Campo obligatorio.')

export const editOrganizationValidationSchema = Yup.object({
  name: textField,
  image: imageField,
  description : textField,
  phone: textField,
  address: textField
})
