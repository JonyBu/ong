import React from "react";
import { TableScreen } from '../../../components/BackofficeTableScreen';
import { FormModal } from '../../../components/FormModal';
import NewsForm from "../../../components/Forms/NewsForm";

function Novedades() {
  return (
    <>
      <TableScreen
        endpoint='news'
        frontRouteName='Novedades'
        keysToRender={['name', 'content', 'image']}
        fieldsNames={['nombre', 'contenido', 'imagen']}
        itemFormRender={(itemToEdit, onSubmitSuccess, onSubmitError, onCloseModal) => {
          return (
            <NewsForm
              editValues={itemToEdit}
              onSubmitSuccess={onSubmitSuccess}
              onSubmitError={onSubmitError}
              onCloseModal={onCloseModal}
            />
          )
        }}
        isEditable
      />
    </>
  );
};

export default Novedades;