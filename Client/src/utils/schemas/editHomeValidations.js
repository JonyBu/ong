import * as Yup from 'yup'
import { imageField } from './imageValidation'

const textField = Yup.string().required('Campo obligatorio.')

export const editHomeValidationSchema = Yup.object({
  welcomeText: textField.min(20, 'Debe tener al menos 20 caracteres.'),
  sliderText1: textField,
  sliderText2: textField,
  sliderText3: textField,
  sliderPic1: imageField,
  sliderPic2: imageField,
  sliderPic3: imageField
})
