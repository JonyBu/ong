import { TableScreen } from "../../../components/BackofficeTableScreen";
import { UserForm } from "../../../components/Forms/UserForm";

const BackofficeUsers = () => {
  return (
    <>
      <TableScreen
        endpoint="users"
        frontRouteName="usuarios"
        keysToRender={["firstName", "lastName", "email", "image"]}
        fieldsNames={["nombre", "apellido", "email", "foto"]}
        itemFormRender={(itemToEdit, onSubmitSucess, onSubmitError, onCloseModal) => {
          return (
            <UserForm
              editValues={itemToEdit}
              onSubmitSuccess={onSubmitSucess}
              onSubmitError={onSubmitError}
              onCloseModal={onCloseModal}
            />
          );
        }}
        isEditable
      />
    </>
  );
};

export default BackofficeUsers;
