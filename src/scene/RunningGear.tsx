import { useMemo } from 'react'
import { CylinderGeometry, DoubleSide, ExtrudeGeometry, Shape } from 'three'
import { paintTexture } from './look'

const fabric = '#f1f0e9'
const bandStart = -Math.PI * 0.65
const bandArc = Math.PI * 1.30

export function RunningGear() {
  const { band, brim, meshFabric } = useMemo(() => {
    const band = new CylinderGeometry(0.084, 0.089, 1, 64, 8, true, bandStart, bandArc)
    const bandPositions = band.attributes.position
    for (let i = 0; i < bandPositions.count; i++) {
      const heightFraction = bandPositions.getY(i) + 0.5
      const angle = Math.atan2(bandPositions.getX(i), bandPositions.getZ(i))
      const forehead = Math.pow(Math.max(0, Math.cos(angle / 1.45)), 2)
      const height = 0.020 + 0.039 * forehead
      bandPositions.setY(i, 0.014 + height * heightFraction)
      bandPositions.setZ(i, bandPositions.getZ(i) * 1.10)
    }
    band.computeVertexNormals()

    const outline = new Shape()
    outline.moveTo(-0.083, 0.032)
    outline.bezierCurveTo(-0.051, 0.083, 0.051, 0.083, 0.083, 0.032)
    outline.bezierCurveTo(0.102, 0.094, 0.091, 0.162, 0, 0.167)
    outline.bezierCurveTo(-0.091, 0.162, -0.102, 0.094, -0.083, 0.032)
    const brim = new ExtrudeGeometry(outline, { depth: 0.0035, bevelEnabled: true, bevelSegments: 2, bevelSize: 0.0014, bevelThickness: 0.0012, curveSegments: 28 })
    const brimPositions = brim.attributes.position
    for (let i = 0; i < brimPositions.count; i++) {
      const x = brimPositions.getX(i) / 0.095
      const forward = brimPositions.getY(i) / 0.167
      brimPositions.setZ(i, brimPositions.getZ(i) + 0.010 * x * x + 0.003 * forward)
    }
    brim.computeVertexNormals()

    const meshFabric = paintTexture(512, 128, (g) => {
      g.fillStyle = fabric
      g.fillRect(0, 0, 512, 128)
      g.fillStyle = '#d5d5cf'
      g.fillRect(0, 2, 512, 3)
      g.fillRect(0, 121, 512, 3)
      for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 34; col++) {
          g.fillStyle = '#828582'
          g.beginPath()
          g.arc(10 + col * 14.4 + (row % 2) * 7, 20 + row * 17, 2.05, 0, Math.PI * 2)
          g.fill()
        }
      }
    })

    return { band, brim, meshFabric }
  }, [])

  return (
    <group rotation-y={0.39}>
      <mesh geometry={band} castShadow receiveShadow>
        <meshStandardMaterial map={meshFabric} roughness={0.92} side={DoubleSide} />
      </mesh>
      <mesh position-y={0.026} scale-z={1.10} castShadow>
        <cylinderGeometry args={[0.087, 0.089, 0.018, 32, 1, true, bandStart + bandArc, Math.PI * 2 - bandArc]} />
        <meshStandardMaterial color="#d9d9d2" roughness={0.96} side={DoubleSide} />
      </mesh>
      <mesh geometry={brim} position-y={0.018} rotation-x={Math.PI / 2} castShadow receiveShadow>
        <meshStandardMaterial color={fabric} roughness={0.86} />
      </mesh>
    </group>
  )
}
