import * as Yup from 'yup';

const MAX_FILE_SIZE = 1024 * 1024
const SUPPORTED_FORMATS = [
  'image/jpg',
  'image/jpeg',
  'image/png'
]

const validationNewsSchema = Yup.object({
  name: Yup.string()
    .min(3, "El nombre debe contener 3 o más caracteres")
    .max(50, 'Debe tener máximo 50 carácteres')
    .required('Campo obligatorio'),
  image: Yup.mixed()
    .test('fileFormat', 'Formato no soportado.', (value) => {
      if (value) return SUPPORTED_FORMATS.includes(value.type)
      return true
    })
    .test('fileSize', 'El tamaño de la imagen no puede superar 1Mb.', (value) => {
      if (value) return value.size <= MAX_FILE_SIZE
      return true
    })
});

const handleFormikSubmit = (isEdit, editValues, postService, putService, handleSubmitSuccess, onSubmitError) => async (values, actions) => {

  const entryContent = new FormData();
  for (const field in values) {
    entryContent.append(field, values[field])
  }

  let fetchedNew;

  try {
    if (isEdit) {
      const { id } = editValues;
      fetchedNew = await putService(`/members/${id}`, entryContent, true);
    } else {
      fetchedNew = await postService('/members', entryContent);
    }
    handleSubmitSuccess(fetchedNew);
    actions.setSubmitting(false);
    actions.resetForm();

  } catch (error) {
    onSubmitError(error.message);
  }
};


export const getFormikConfig = (isEdit, editValues, postService, updateService, handleSubmitSuccess, onSubmitError) => ({
  initialValues: {
    name: editValues.name || '',
    image: '',
    content: editValues.content || '',
    categoryId: editValues.categoryId || ''
  },
  validationSchema: validationNewsSchema,
  onSubmit: handleFormikSubmit(isEdit, editValues, postService, updateService, handleSubmitSuccess, onSubmitError)
});
