import * as Yup from 'yup';

import { updateCategory, postCategory } from './requests';

const validationSchema = Yup.object({
  name: Yup.string()
    .max(30, 'Debe tener menos de 30 caracteres.')
    .matches((/^[a-zA-Z0-9 ]{1,50}$/), 'Sólo caracteres alfanúmericos.')
    .required('Campo obligatorio.'),
  description: Yup.string()
    .min(20, 'Debe tener más de 20 caracteres.')
    .matches((/^[a-zA-Z0-9 ]{1,50}$/), 'Sólo caracteres alfanúmericos.')
    .required('Campo obligatorio.'),
})


const handleFormikSubmit = ({ 
  httpPost,
  httpUpdate,
  onSubmitSuccess, 
  onSubmitError,
  onCloseModal,
  categoryId,
}) => ({ name, description }, functions) => {
  const categoryData = { name, description };


  if (categoryId || categoryId === 0) {
    updateCategory({
      httpUpdate, 
      categoryId, 
      categoryData,
      onSubmitSuccess,
      onSubmitError,
      onCloseModal,
      functions,
    });
  } else {
    postCategory({ 
      httpPost, 
      categoryData,
      onSubmitSuccess,
      onSubmitError,
      onCloseModal,
      functions,
    });
  }
};

export const getFormikConfig = ({ 
  httpUpdate,
  httpPost,
  onSubmitSuccess, 
  onSubmitError,
  onCloseModal,
  categoryId,
}) => ({
  validationSchema,
  onSubmit: handleFormikSubmit({ 
    httpUpdate,
    httpPost,
    onSubmitSuccess, 
    onSubmitError,
    onCloseModal,
    categoryId,
  }),
});
