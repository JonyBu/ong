import { TableScreen } from "../../../components/BackofficeTableScreen";
import TestimonyForm from "../../../components/Forms/TestimonyForm";
// import FormTestimonialEdit from "./FormTestimonialEdit";

const BackofficeTestimonials = () => {
  return (
    <>
      <TableScreen
        endpoint="testimonials"
        frontRouteName="testimonios"
        keysToRender={["name", "image", "content"]}
        fieldsNames={["nombre", "imagen", "contenido"]}
        itemFormRender={(itemToEdit, onSubmitSuccess, onSubmitError, onCloseModal) => {
          return (
            <TestimonyForm
              editValues={itemToEdit}
              onSubmitSuccess={onSubmitSuccess}
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

export default BackofficeTestimonials;
