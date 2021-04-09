import { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'
import { CameraAnimation } from './Components/Camera'
import { DancingCircles } from './Components/DancingCircles'
import { Logo } from './Components/Logo'
import styles from './styles.module.css'

export const Canvas3D = () => {
  return (
    <div className={styles.CanvasWrapper}>
      <Canvas>
        <Suspense fallback={null}>
          <CameraAnimation />
          <Logo />
          <DancingCircles />
        </Suspense>
      </Canvas>
    </div>
  )
}

