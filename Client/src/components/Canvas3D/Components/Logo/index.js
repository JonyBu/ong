import { Sphere } from '../Spheres'
import Large from '../../../../assets/images/largeSphere.png'
import Medium from '../../../../assets/images/mediumSphere.png'
import Small from '../../../../assets/images/smallSphere.png'

export const Logo = () => {
  return (
    <group scale={[1.1, 1.1, 1.1]}>
      <Sphere
        position={[-0.9, 1, -2]}
        size={[0.2, 10, 10]}
        textureImg={Small}
      />
      <Sphere
        position={[0.25, 0.2, -2]}
        size={[1, 25, 25]}
        textureImg={Large}
        rotation={[0.1, 0.2, 0]}
      />
      <Sphere
        position={[-1.05, -0.8, -2]}
        size={[0.4, 15, 15]}
        textureImg={Medium}
        rotation={[0, 0.4, 0]}
      />
    </group>
  )
}