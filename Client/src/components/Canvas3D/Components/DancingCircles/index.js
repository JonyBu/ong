import React, { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame} from 'react-three-fiber' 

const colors = [
  0xf26dc4, 0x44bcc2, 0xd9d052, 0x36a629, 0xef7a7a,
  0xea4e4e, 0xfbd3ed, 0x99f3f7, 0x9bd394, 0xe1d975
]

export const DancingCircles = () => {
  let group = useRef()
  let theta = 0

  useFrame(() => {
    const r = 5 * Math.sin(THREE.Math.degToRad((theta += 0.05)))
    const s = Math.cos(THREE.Math.degToRad(theta * 2))
    group.current.rotation.set(r, r, r)
    group.current.scale.set(s, s, s)
  })

  const [geo, coords] = useMemo(() => {
    const geo = new THREE.SphereBufferGeometry(2, 10, 10)
    const coords = new Array(1000).fill().map(i => [Math.random() * 800 - 400, Math.random() * 800 - 400, Math.random() * 800 - 400])
    return [geo, coords]
  }, [])

  const getRandomColor = () => {
    const randomIndex = Math.ceil(Math.random() * colors.length)
    return colors[randomIndex]
  }

  return (
    <group ref={group}>
      {coords.map(([p1, p2, p3], i) => (
        <mesh
          key={i+p1+p3}
          position={[p1, p2, p3]}
          geometry={geo}
        >
          <meshBasicMaterial
            attach='material'
            color={getRandomColor()}
            transparent
          />
        </mesh>
      ))}
    </group>
  )
}