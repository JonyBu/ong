import PropTypes from "prop-types";
import Modal from "react-modal";
import styles from "./styles.module.css"

Modal.setAppElement("body");

export const FormModal = ({ itemFormRender, itemToEdit, isOpen, onCloseModal, onSubmitSuccess, onSubmitError }) => {

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      overlayClassName={styles.Overlay}
      className={styles.Content}
      contentLabel="Form Modal"
    >
      {
        itemFormRender(itemToEdit, onSubmitSuccess, onSubmitError, onCloseModal)
      }
    </Modal>
  );
};

FormModal.propTypes = {
  itemFormRender: PropTypes.func.isRequired,
  itemToEdit: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
  onSubmitError: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
