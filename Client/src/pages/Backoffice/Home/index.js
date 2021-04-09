import { useState, useEffect } from 'react'
import { HomeForm } from '../../../components/Forms/HomeForm'
import { useHttp } from '../../../hooks/useHttp'
import Modal from '../../../components/ModalAlert/Modal'
import styles from './styles.module.css'

const BackOfficeHome = () => {
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
      const serverValues = { welcomeText: organization.welcomeText }
      organization.slidesData.forEach(slide => {
        serverValues[`sliderText${slide.order}`] = slide.text
        serverValues[`sliderPic${slide.order}`] = slide.imageUrl
      })
      setInitialValues(serverValues)
    } catch (error) {
      handleError(error.message)
    }
  }

  const handleSuccess = () => {
    const newModalProps = {
      show: true,
      type: 'success',
      title: 'Los cambios se han guardado!',
      text: 'Página de inicio actualizada',
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
      <HomeForm
        serverValues={initialValues}
        onSubmitSuccess={handleSuccess}
        onSubmitError={handleError}
      />
      <Modal {...modalProps} />
    </div>
  )
}

export default BackOfficeHome
