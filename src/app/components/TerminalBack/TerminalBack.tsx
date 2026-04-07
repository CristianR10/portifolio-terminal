'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import styles from '@/app/components/Terminal/Terminal.module.scss'


function OceanParticles() {
  const pointsRef = useRef<THREE.Points>(null!)
  const { mouse, viewport } = useThree()   // pega o mouse normalizado

  const mouseTarget = useRef(new THREE.Vector2(0, 0)) // suavização do mouse

  const { positions, colors } = useMemo(() => {
    const count = 20000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count * 3; i += 3) {
      positions[i]     = (Math.random() - 0.5) * 42   // x
      positions[i + 1] = (Math.random() - 0.5) * 9    // y (base das ondas)
      positions[i + 2] = (Math.random() - 0.5) * 28   // z

      // Tons de azul marinho
      const intensity = 0.7 + Math.random() * 0.3
      colors[i]     = 0.05
      colors[i + 1] = 0.55 * intensity
      colors[i + 2] = 0.95 * intensity
    }

    return { positions, colors }
  }, [])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return

    const pos = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    const time = clock.getElapsedTime() * 0.75

    // Suaviza o movimento do mouse (fica mais natural)
    mouseTarget.current.x = THREE.MathUtils.lerp(mouseTarget.current.x, mouse.x * viewport.width * 0.8, 0.07)
    mouseTarget.current.y = THREE.MathUtils.lerp(mouseTarget.current.y, mouse.y * viewport.height * 0.6, 0.07)

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const z = pos.getZ(i)
      let y = pos.getY(i) // altura atual

      // === Ondas base (mar natural) ===
      const wave1 = Math.sin(x * 0.55 + time * 1.15) * 0.85
      const wave2 = Math.sin(z * 0.48 + time * 0.85) * 0.65
      const wave3 = Math.cos((x * 0.3 + z * 0.25) + time * 0.95) * 0.45

      y = wave1 + wave2 + wave3

      // === Influência do mouse (balanço + leve repulsão) ===
      const dx = x - mouseTarget.current.x
      const dz = z - mouseTarget.current.y * 0.6   // menos influência na profundidade
      const dist = Math.sqrt(dx * dx + dz * dz)

      if (dist < 18) {  // raio de influência
        const force = (18 - dist) / 18                     // força maior quando mais perto
        const push = force * force * 1.8                    // repulsão suave

        y += push * 1.6                                     // levanta as ondas perto do mouse
      }

      pos.setY(i, y)
    }

    pos.needsUpdate = true
  })

  return (
    <Points ref={pointsRef} positions={positions} colors={colors} stride={3}>
      <PointMaterial
        size={0.048}
        sizeAttenuation={true}
        transparent
        depthWrite={false}
        vertexColors
      />
    </Points>
  )
}

export default function TerminalBackground() {
  return (
    <div className={styles.backgroundContainer}>
      <Canvas
        camera={{ position: [0, 6, 20], fov: 42 }}
        style={{ background: '#140e02' }}
        gl={{ alpha: true, antialias: true }}
      >
        <OceanParticles />
      </Canvas>
    </div>
  )
}