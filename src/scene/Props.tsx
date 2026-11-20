import { useMemo } from 'react'
import { BackSide, CatmullRomCurve3, Color, CylinderGeometry, Float32BufferAttribute, LatheGeometry, Object3D, Quaternion, Vector2, Vector3 } from 'three'
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js'
import { RoundedBox } from '@react-three/drei'
import { paintTexture, rng } from './look'
import { SET } from './shots'

// Set dressing that is not a page: a desk lamp, a plush toy and an iced matcha.

export function Props() {
  return (
    <>
      <DeskLamp />
      <EggplantPlush />
      <IcedMatcha />
    </>
  )
}

function EggplantPlush() {
  const { body, calyx, smile, pile } = useMemo(() => {
    const top = 0.189
    const bend = (height: number) => 0.015 * (height / top) ** 2
    const outline = new CatmullRomCurve3([
      [0, 0.003], [0.038, 0.004], [0.056, 0.018], [0.063, 0.043],
      [0.060, 0.075], [0.050, 0.115], [0.040, 0.153],
      [0.031, 0.175], [0.016, 0.187], [0, top],
    ].map(([r, y]) => new Vector3(r, y, 0)))
    const profile = outline.getPoints(62).map(({ x, y }) => new Vector2(Math.max(0, x), Math.max(0.003, y)))
    const body = new LatheGeometry(profile, 64)
    const vertices = body.attributes.position
    for (let i = 0; i < vertices.count; i++) {
      vertices.setX(i, vertices.getX(i) + bend(vertices.getY(i)))
    }
    body.computeVertexNormals()
    // The five lobes follow the same meridian as the plush, so the green
    // fabric stays above the purple fabric from crown to tip.
    const shoulder = profile.filter(({ y }) => y > 0.14)
    const calyx = new ParametricGeometry((around, down, point) => {
      const angle = 2 * Math.PI * around
      const lobe = ((1 + Math.cos(5 * (angle - Math.PI / 2))) / 2) ** 2
      const y = top - 0.0005 - down * (0.012 + 0.026 * lobe)
      const upperIndex = shoulder.findIndex(({ y: height }) => height >= y)
      const lower = shoulder[upperIndex - 1]
      const upper = shoulder[upperIndex]
      const radius = lower.x + (upper.x - lower.x) * (y - lower.y) / (upper.y - lower.y)
      const padding = 0.002 * (1 - down * down)
      const lift = 0.0017 + 0.003 * (1 - down)
      point.set(bend(y) + (radius + padding) * Math.cos(angle), y + lift,
        (radius + padding) * Math.sin(angle))
    }, 96, 20)
    const smile = new CatmullRomCurve3([
      new Vector3(-0.005, 0.095, 0.056), new Vector3(0.004, 0.091, 0.0585),
      new Vector3(0.013, 0.095, 0.056),
    ])
    const random = rng(27)
    const pile = paintTexture(256, 256, (g) => {
      g.fillStyle = '#808080'
      g.fillRect(0, 0, 256, 256)
      for (let i = 0; i < 4200; i++) {
        g.fillStyle = random() > 0.5 ? '#a0a0a0' : '#646464'
        g.fillRect(random() * 256, random() * 256, 1, 1.5 + random() * 2)
      }
    })
    return { body, calyx, smile, pile }
  }, [])

  return (
    <group position={SET.plush} rotation-y={0.15}>
      <mesh geometry={body} castShadow receiveShadow>
        <meshPhysicalMaterial color="#8b76a0" roughness={0.96} bumpMap={pile} bumpScale={0.0004}
          sheen={0.55} sheenColor="#c0abc9" sheenRoughness={0.92} />
      </mesh>
      <mesh geometry={calyx} castShadow receiveShadow>
        <meshStandardMaterial color="#7a8b57" roughness={0.94} bumpMap={pile} bumpScale={0.0003} />
      </mesh>
      <mesh position={[0.016, 0.201, -0.002]} rotation-z={-0.34} castShadow>
        <capsuleGeometry args={[0.009, 0.017, 6, 18]} />
        <meshStandardMaterial color="#526944" roughness={0.94} />
      </mesh>
      {[-0.019, 0.019].map((x) => (
        <mesh key={x} position={[x + 0.005, 0.109, 0.050]} scale={[1, 1.12, 0.7]}>
          <sphereGeometry args={[0.0047, 16, 12]} />
          <meshStandardMaterial color="#201822" roughness={0.46} />
        </mesh>
      ))}
      <mesh>
        <tubeGeometry args={[smile, 16, 0.00165, 7, false]} />
        <meshStandardMaterial color="#201822" roughness={0.9} />
      </mesh>
    </group>
  )
}

// A Danish desk lamp of about 1960 at the back right corner: a low domed
// base, a slim brass stem, and a deep enamel shade on a brass knuckle, tilted
// down onto the notebook. The shade has a real wall (an enamel outside, a
// warm white inside lit by the bulb) and a rolled lip; the enamel has a clear
// coat, so it catches a highlight the way the typewriter's paint does. Its
// pivot sits about level with the top of the typewriter's paper.
const SHADE = { len: 0.14, rim: 0.072, neck: 0.017, wall: 0.0022 }

function DeskLamp() {
  const { base, outer, inner, q, yaw, shade } = useMemo(() => {
    const v = (pts: number[][]) => pts.map(([x, y]) => new Vector2(x, y))
    // a flat disc that rises in a shallow dome to the stem
    const base = new LatheGeometry(v([[0, 0], [0.068, 0], [0.071, 0.003], [0.072, 0.007], [0.069, 0.011], [0.055, 0.015], [0.03, 0.02], [0.012, 0.024], [0, 0.024]]), 64)
    // the shade, rim to neck: a bell that flares at the mouth
    const bell = [[1, 0], [0.93, 0.12], [0.8, 0.3], [0.62, 0.55], [0.42, 0.8], [0.26, 0.95], [0.22, 1]]
    const outer = new LatheGeometry(v(bell.map(([r, t]) => [r * SHADE.rim, -SHADE.len + t * SHADE.len])), 64)
    const inner = new LatheGeometry(v(bell.map(([r, t]) => [r * SHADE.rim - SHADE.wall, -SHADE.len + t * SHADE.len])), 64)
    const pivot = new Vector3(...SET.lampHead)
    const dir = new Vector3(...SET.notebook).sub(pivot).normalize()
    const q = new Quaternion().setFromUnitVectors(new Vector3(0, -1, 0), dir)
    // the knuckle's axle lies across the shade's swing
    const yaw = Math.atan2(dir.x, dir.z) + Math.PI / 2
    // the neck hangs a little off the axle, along the shade's axis
    const shade = pivot.clone().addScaledVector(dir, 0.012)
    return { base, outer, inner, q, yaw, shade }
  }, [])
  const target = useMemo(() => {
    const o = new Object3D()
    o.position.set(...SET.notebook)
    return o
  }, [])
  const [bx, by, bz] = SET.deskLamp
  const stemH = SET.lampHead[1] - by
  const enamel = <meshPhysicalMaterial color="#ece6da" roughness={0.42} clearcoat={0.7} clearcoatRoughness={0.22} />
  const brass = <meshStandardMaterial color="#c49d5f" metalness={1} roughness={0.28} />
  return (
    <>
      <group position={SET.deskLamp}>
        <mesh geometry={base} castShadow receiveShadow>
          {enamel}
        </mesh>
        {/* the rocker switch at the front of the base */}
        <mesh position={[-0.03, 0.019, 0.04]} rotation={[0.25, 0.6, 0]} castShadow>
          <boxGeometry args={[0.012, 0.005, 0.018]} />
          <meshStandardMaterial color="#2a2622" roughness={0.5} />
        </mesh>
        {/* collar, stem, collar */}
        <mesh position={[0, 0.03, 0]} castShadow>
          <cylinderGeometry args={[0.009, 0.011, 0.014, 24]} />
          {brass}
        </mesh>
        <mesh position={[0, stemH / 2, 0]} castShadow>
          <cylinderGeometry args={[0.0042, 0.005, stemH, 16]} />
          {brass}
        </mesh>
        <group position={[0, stemH, 0]} rotation={[0, yaw, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.0075, 0.0075, 0.03, 20]} />
            {brass}
          </mesh>
          {/* the tension knob on the axle */}
          <mesh position={[0.019, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.009, 0.009, 0.007, 24]} />
            {brass}
          </mesh>
        </group>
      </group>
      <group position={shade} quaternion={q}>
        <mesh geometry={outer} castShadow>
          {enamel}
        </mesh>
        <mesh geometry={inner}>
          <meshStandardMaterial color="#fff4e2" emissive="#ffd9a6" emissiveIntensity={0.5} roughness={0.6} side={BackSide} />
        </mesh>
        {/* the rolled lip at the mouth */}
        <mesh position={[0, -SHADE.len, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <torusGeometry args={[SHADE.rim - SHADE.wall / 2, 0.0024, 10, 64]} />
          {enamel}
        </mesh>
        {/* the brass neck cap where the shade meets the knuckle */}
        <mesh position={[0, -0.004, 0]}>
          <cylinderGeometry args={[0.01, SHADE.neck, 0.012, 24]} />
          {brass}
        </mesh>
        {/* the bulb, up inside the shade */}
        <mesh position={[0, -0.05, 0]}>
          <sphereGeometry args={[0.02, 20, 12]} />
          <meshStandardMaterial color="#fff6e6" emissive="#ffe6c0" emissiveIntensity={3} />
        </mesh>
        <spotLight position={[0, -0.06, 0]} target={target} angle={0.6} penumbra={1} intensity={2.5} distance={1.4} decay={1.4} color="#ffd6a0" />
      </group>
      <primitive object={target} />
    </>
  )
}

const ice = [
  { position: [-0.016, 0.112, 0.007], rotation: [0.35, 0.45, 0.3] },
  { position: [0.017, 0.117, 0.012], rotation: [0.25, -0.35, -0.22] },
  { position: [0.005, 0.116, -0.019], rotation: [-0.4, 0.32, 0.36] },
] as const

function IcedMatcha() {
  const { cup, drink } = useMemo(() => {
    const cup = new LatheGeometry([
      [0, 0.002], [0.029, 0.002], [0.033, 0.006], [0.041, 0.137],
      [0.0385, 0.137], [0.0305, 0.009], [0, 0.009],
    ].map(([r, y]) => new Vector2(r, y)), 48)
    const height = 0.107
    const drink = new CylinderGeometry(0.037, 0.029, height, 48, 24)
    const milk = new Color('#eee1c7')
    const tea = new Color('#82a641')
    const layers: number[] = []
    const pos = drink.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i) / height + 0.5
      const swirl = 0.055 * Math.sin(Math.atan2(pos.getZ(i), pos.getX(i)) * 3)
      const mix = Math.max(0, Math.min(1, (y + swirl - 0.29) / 0.43))
      const color = milk.clone().lerp(tea, mix)
      layers.push(color.r, color.g, color.b)
    }
    drink.setAttribute('color', new Float32BufferAttribute(layers, 3))
    return { cup, drink }
  }, [])

  return (
    <group position={SET.matcha}>
      <mesh geometry={drink} position-y={0.0625} castShadow>
        <meshStandardMaterial vertexColors roughness={0.35} />
      </mesh>
      <mesh geometry={cup} renderOrder={2}>
        <meshPhysicalMaterial color="#eef8f1" transparent opacity={0.19} roughness={0.12} metalness={0.1} clearcoat={0.85} depthWrite={false} />
      </mesh>
      <mesh position-y={0.137} rotation-x={-Math.PI / 2}>
        <torusGeometry args={[0.04, 0.0013, 8, 48]} />
        <meshPhysicalMaterial color="#eff8e9" transparent opacity={0.64} roughness={0.19} />
      </mesh>
      {ice.map(({ position, rotation }, i) => (
        <RoundedBox key={i} args={[0.024, 0.021, 0.023]} radius={0.0035} smoothness={2} position={[...position]} rotation={[...rotation]}>
          <meshPhysicalMaterial color="#d9e6c6" roughness={0.19} clearcoat={1} transparent opacity={0.79} depthWrite={false} />
        </RoundedBox>
      ))}
      <mesh position={[-0.025, 0.139, -0.012]} rotation-z={0.21}>
        <cylinderGeometry args={[0.0031, 0.0031, 0.093, 16]} />
        <meshStandardMaterial color="#5f7544" roughness={0.45} />
      </mesh>
    </group>
  )
}
