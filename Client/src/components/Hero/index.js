import { useHistory } from 'react-router-dom'
import { Canvas3D } from '../Canvas3D'
import styles from './styles.module.css'

export const Hero = ({ welcomeText }) => {
  const { push } = useHistory()

  return (
    <div className={styles.hero}>
        <div className={styles.textWrapper}>
          <h1 className={styles.title}>
            Fundación Zonas Grises
          </h1>
          <h2 className={styles.welcomeText}>
            {welcomeText}
          </h2>
          <button
            className={styles.callToAction}
            onClick={() => push('/novedades')}
          >
            Ver Novedades
          </button>
        </div> 
        <Canvas3D />
      </div>
  )
}
