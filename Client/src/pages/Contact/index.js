import { useState } from 'react';
import Modal from '../../components/ModalAlert/Modal';
import { ContactForm } from '../../components/Forms/ContactForm';
import { ChildishTitle } from '../../components/ChildishTitle';

import {
  contactWrapper, contactTextContainer, contactTextBackground, H2, P, containerContact
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
              Lorem title
            </h2>
            <p className={P}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt sequi minus unde illum fugit commodi cumque laboriosam, similique incidunt in porro! Ipsam, nobis asperiores. Ducimus harum maxime aut architecto assumenda.
            </p>
            <p className={P}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates vitae architecto est ut inventore pariatur alias, possimus rem vel praesentium aperiam, distinctio magnam sunt nostrum voluptatum, odio porro cumque dolores!
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
