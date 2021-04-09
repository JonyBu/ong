import { useMemo } from 'react'
import { useLoader } from 'react-three-fiber'
import * as THREE from 'three'
import PropTypes from 'prop-types'

export const Sphere = ({ position, size, rotation, textureImg }) => {
  const [texture] = useLoader(THREE.TextureLoader, [textureImg])

  const textureProps = useMemo(() => ({
    attach: 'map',
    wrapS: THREE.RepeatWrapping,
    wrapT: THREE.RepeatWrapping,
    repeat: new THREE.Vector2(2.5, 0.9),
    anisotropy: 16
  }), [])

  return (
    <mesh
      position={position}
      rotation={rotation}
    >
      <sphereGeometry
        attach='geometry'
        args={size}
      />
      <meshBasicMaterial
        attach='material'
        map={texture}
      >
        <primitive
          object={texture}
          { ...textureProps }
        />
      </meshBasicMaterial>
    </mesh>
  )
}

Sphere.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number),
  size: PropTypes.arrayOf(PropTypes.number).isRequired,
  rotation: PropTypes.arrayOf(PropTypes.number),
  textureImg: PropTypes.string.isRequired
}
