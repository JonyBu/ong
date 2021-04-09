import { useEffect } from 'react'
import { useFrame, useThree } from 'react-three-fiber'

export const CameraAnimation = () => {
  const { camera } = useThree()

  useFrame(({ clock }) => {
    camera.position.z = 4 - Math.cos(Math.sin(clock.elapsedTime) / 2)
    camera.position.x = 0 + -Math.sin(Math.cos(clock.elapsedTime) / 5) * 1.5
    camera.position.y = 0 - Math.cos(Math.sin(clock.elapsedTime)) / 5
  })

  useEffect(() => {
    camera.far = 10000
  }, [])

  return null
}