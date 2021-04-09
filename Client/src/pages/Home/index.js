import { useEffect, useReducer } from 'react';
import { useHttp } from '../../hooks/useHttp'
import Slider from '../../components/Slider'
import { NewsList } from '../../components/NewsList'
import Modal from '../../components/ModalAlert/Modal'
import Loader from '../../components/Loader'
import { initialState, getActionCreators, homeReducer } from './homeReducer'
import styles from './styles.module.css'
import { Hero } from '../../components/Hero';

const Home = () => {
  const [state, dispatch] = useReducer(homeReducer, initialState)
  const { setIsLoading, setFetchedData, setErrorModal } = getActionCreators(dispatch)
  const { httpGet } = useHttp(true)
  const { isLoading, welcomeText, slidesList, newsList, showErrorModal } = state

  useEffect(() => {
    getHomeData()
  }, [])

  const getHomeData = async () => {
    setIsLoading()
    try {
      const requests = [getWelcomeText(), getLastNews()]
      const homeData = await Promise.all(requests)
      setFetchedData(homeData)
    } catch (error) {
      setErrorModal(true)
    }
  }

  const getWelcomeText = async () => {
    const { data: { organization } } = await httpGet('/organizations/1/public')
    return organization
  }

  const getLastNews = async () => {
    const { data: { news } } = await httpGet('/news')
    return news
  }

  if (isLoading) return (
    <div className={styles.homeWrapper}>
      <Loader />
    </div>
  )

  return (
    <div className={styles.homeWrapper}>
      <Modal
        onConfirm={getHomeData}
        confirmButtonText='Reintentar'
        setShow={setErrorModal}
        show={showErrorModal}
        type='error'
        title='Error en la red'
        text='No se han podido cargar los datos.'
      />
      <Hero welcomeText={welcomeText} />
      <Slider arraySliderItem={slidesList} />
      <NewsList
        title='Últimas novedades'
        newsList={newsList}
      />
    </div>
  )
}

export default Home;
