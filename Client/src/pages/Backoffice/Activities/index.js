import React from "react";
import { TableScreen } from "../../../components/BackofficeTableScreen";
import ActivitiesForm from "../../../components/Forms/ActivitiesForm";

const BackofficeActivities = () => {
  return (
    <>
      <TableScreen
        endpoint="activities"
        frontRouteName="Actividades"
        keysToRender={["name", "content", "image"]}
        fieldsNames={["nombre", "contenido", "imagen"]}
        itemFormRender={(itemToEdit, onSubmitSucess, onSubmitError, onCloseModal) => {
          return (
            <ActivitiesForm
              editValues={itemToEdit}
              onSubmitSuccess={onSubmitSucess}
              onSubmitError={onSubmitError}
              onCloseModal={onCloseModal}
            />
          );
        }}
        isEditable
        isPut
      />
    </>
  );
};

export default BackofficeActivities;
