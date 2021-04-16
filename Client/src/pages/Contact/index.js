import { useState } from 'react';
import Modal from '../../components/ModalAlert/Modal';
import { ContactForm } from '../../components/Forms/ContactForm';
import { ChildishTitle } from '../../components/ChildishTitle';

import {
  contactWrapper, contactTextContainer, contactTextBackground, H2, P, containerContact, PFinal
} from './styles.module.css'

const ContactScreen = () => {
  const [ modalProps, setModalProps ] = useState({
    show: false,
    type: '',
    title: '',
    text: '',
    confirmButtonColor: ''
  })

  const handleSuccess = () => {
    const newModalProps = {
      show: true,
      type: 'success',
      title: 'Mensaje enviado',
      text: 'Tu mensaje ha sido enviado correctamente.',
      confirmButtonColor: "#3fc3ee"
    }
    handleModalProps(newModalProps)
  }

  const handleError = (errorMessage) => {
    const newModalProps = {
      show: true,
      type: 'error',
      title: 'Error',
      text: errorMessage,
      confirmButtonColor: '#f27474'
    }
    handleModalProps(newModalProps)
  }

  const handleModalProps = (newProps) => {
    setModalProps(prevState => ({ ...prevState, ...newProps }))
  }

  return (
    <div className={containerContact}>
      <ChildishTitle>
        Contacto 
      </ChildishTitle>
      <section className={contactWrapper}>
        <Modal
          {... modalProps}
          onConfirm={() => handleModalProps({ show: false })}
        />
      
        <div className={contactTextContainer}>
          <div className={contactTextBackground}>
            <h2 className={H2}>
              Contáctanos
            </h2>
            <p className={P}>
              Si deseas consultar mayor información sobre nosotros o tienes alguna duda al respecto, no dudes en realizar una consulta. 
              Llena el formulario y te contactaremos a la brevedad. 
            </p>
            <p className={PFinal}>
              Muchas Gracias.
            </p>
          </div>
        </div>
      
        <div>
          <ContactForm
            onSubmitSuccess={handleSuccess}
            onSubmitError={handleError}
          />
        </div>
      </section>
    </div>
  )
}

export default ContactScreen
