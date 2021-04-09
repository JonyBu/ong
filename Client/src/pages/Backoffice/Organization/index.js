import { useState, useEffect } from 'react'
import { OrganizationForm } from '../../../components/Forms/OrganizationForm'
import { useHttp } from '../../../hooks/useHttp'
import Modal from '../../../components/ModalAlert/Modal'
import styles from './styles.module.css'

const Organization = () => {
  const { httpGet } = useHttp()
  const [ initialValues, setInitialValues ] = useState(null)
  const [ modalProps, setModalProps ] = useState({
    show: false,
    type: 'success',
    title: '',
    text: '',
  })

  useEffect(() => {
    getValuesFromServer()
  }, [])
  
  const getValuesFromServer = async () => {
    try {
      const { data: { organization } } = await httpGet('/organizations/1/public')
      
      delete organization.id;
      delete organization.slidesData;
      delete organization.socialNetworks;
      
      setInitialValues(organization);
    } catch (error) {
      handleError(error.message)
    }
  }

  const handleSuccess = () => {
    const newModalProps = {
      show: true,
      type: 'success',
      title: 'Los cambios se han guardado!',
      text: 'Organización actualizada',
    }
    handleModalProps(newModalProps)
  }

  const handleError = (errorMessage) => {
    const newModalProps = {
      show: true,
      type: 'error',
      title: 'Error',
      text: errorMessage,
    }
    handleModalProps(newModalProps)
  }

  const handleModalProps = (newProps) => {
    setModalProps(prevState => ({ ...prevState, ...newProps }))
  }

  return (
    <div className={styles.FormWrapper}>
      <OrganizationForm
        serverValues={initialValues}
        onSubmitSuccess={handleSuccess}
        onSubmitError={handleError}
      />
      <Modal {...modalProps} />
    </div>
  )
}

export default Organization;
