import * as Yup from 'yup';

const MAX_FILE_SIZE = 1024 * 1024
const SUPPORTED_FORMATS = [
  'image/jpg',
  'image/jpeg',
  'image/png'
]

const validationTestimonySchema = Yup.object({
  name: Yup.string()
    .max(50, 'Debe tener máximo 50 carácteres')
    .required('Campo obligatorio'),
  image: Yup.mixed()
    .test('fileFormat', 'Formato no soportado.', (value) => {
      if (value) return SUPPORTED_FORMATS.includes(value.type)
      return true
    })
    .test('fileSize', 'El tamaño de la imagen no puede superar 1Mb.', (value) => {
      if(value) return value.size <= MAX_FILE_SIZE
      return true
    }),
  content: Yup.string().required('Campo obligatorio')              
});

const handleFormikSubmit = (isEdit, editValues, postService, putService, handleSubmitSuccess, onSubmitError) => async (values, actions) => {

  const testimonyContent = new FormData();
  for (const field in values) {
    testimonyContent.append(field, values[field])
  }
  
  let fetchedTestimony;
  
  try {
    if ( isEdit ) {      
      const { id } = editValues;    
      fetchedTestimony = await putService(`/testimonials/${id}`, testimonyContent, true ); 
    } else {
      fetchedTestimony = await postService('/testimonials', testimonyContent );
    }
    handleSubmitSuccess(fetchedTestimony);
    actions.setSubmitting(false);
    actions.resetForm();
    
  } catch (error) {
    onSubmitError(error.message);
  }  
};

export const getFormikTestimonialConfig = (isEdit, editValues, postService, updateService, handleSubmitSuccess, onSubmitError) => ({
  initialValues: {
    name: editValues.name || '',
    image: '',
    content: editValues.content || ''
  },
  validationSchema: validationTestimonySchema,
  onSubmit: handleFormikSubmit(isEdit, editValues, postService, updateService, handleSubmitSuccess, onSubmitError)
});

