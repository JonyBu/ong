import React , { useState } from "react";
import styles from "../../../components/FormModal/styles.module.css";

const FormTestimonialEdit = (props) => {
  const { closeModal, itemEditar, onSubmit } = props;

  const [newData, setNewData] = useState([]);

  const handleEdit = async (event) => {
    event.preventDefault();
    onSubmit(newData);
    closeModal();
  };

  const handleInputChange = (event) => {
    setNewData({
      ...newData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <label className={styles.label}>Nombre:</label>
      <input
        className={styles.input}
        defaultValue={itemEditar.name}
        placeholder={itemEditar.name}
        onChange={handleInputChange}
        name="name"
        type="text"
      />
      <footer className={styles.footer}>
        <button className={styles.buttonEdit} onClick={handleEdit}>
          Enviar
        </button>
        <button className={styles.buttonCancel} onClick={() => closeModal()}>
          Cerrar
        </button>
      </footer>
    </div>
  );
};

export default FormTestimonialEdit;
