export const updateCategory = async ({ 
  categoryData, 
  categoryId,
  httpUpdate, 
  functions,
  onSubmitSuccess,
  onSubmitError,
  onCloseModal
}) => {
  try {
    const fetchedData = await httpUpdate(`/categories/${categoryId}`, categoryData);

    functions.setSubmitting(false);
    functions.resetForm();
    onSubmitSuccess(fetchedData.data.category);
    onCloseModal();
  } catch ({ message }) {
    onSubmitError(message);
  }; 
}

export const postCategory = async ({ 
  categoryData, 
  httpPost, 
  onSubmitError,
  onSubmitSuccess,
  onCloseModal,
  functions,
}) => {
  try {
    const fetchedData = await httpPost('/categories', categoryData);
    
    functions.setSubmitting(false);
    functions.resetForm();
    onSubmitSuccess(fetchedData.data.category);
    onCloseModal();
  } catch ({ message }) {
    onSubmitError(message);
  }; 
}
