import React from "react";
import { TableScreen } from "../../../components/BackofficeTableScreen";
import CategoryForm from "../../../components/Forms/CategoryForm";

const BackofficeCategories = () => {
  return (
    <>
      <TableScreen
        endpoint="categories"
        frontRouteName="Categorias"
        keysToRender={["name", "description"]}
        fieldsNames={["nombre", "descripción"]}
        itemFormRender={(itemToEdit, onSubmit, onError, onCloseModal) => {
          return (
            <CategoryForm
              onSubmitSuccess={onSubmit}
              onSubmitError={onError}
              category={itemToEdit}
              onCloseModal={onCloseModal}
            />
          );
        }}
        isEditable
      />
    </>
  );
};

export default BackofficeCategories;
