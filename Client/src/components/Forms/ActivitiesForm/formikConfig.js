import * as Yup from 'yup';

const MAX_FILE_SIZE = 1024 * 1024
const SUPPORTED_FORMATS = [
  'image/jpg',
  'image/jpeg',
  'image/png'
]

const validationActivitiesSchema = Yup.object({
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

const handleFormikSubmit = (isEdit, editValues, postService, putService, onSubmitSuccess, onSubmitError) => async (values, actions) => {

  const activityContent = new FormData();
  for (const field in values) {
    activityContent.append(field, values[field])
  }

  let fetchedActivity

  try {
    if ( isEdit ) {      
      const { id } = editValues;    
      fetchedActivity = await putService(`/activities/${id}`, activityContent, true ); 
    } else {
      fetchedActivity = await postService('/activities', activityContent );
    }
    onSubmitSuccess(fetchedActivity);
    actions.setSubmitting(false);
    actions.resetForm();
    
  } catch (error) {
    onSubmitError(error.message);
  }  
};

export const getFormikActivityConfig = (isEdit, editValues, postService, updateService, onSubmitSuccess, onSubmitError) => ({
  initialValues: {
    name: editValues.name || '',
    image: '',
    content: editValues.content || ''  
  },
  validationSchema: validationActivitiesSchema,
  onSubmit: handleFormikSubmit(isEdit, editValues, postService, updateService, onSubmitSuccess, onSubmitError)
});

