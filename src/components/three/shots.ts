import * as React from "react"
import * as THREE from "three"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"
import { SCENTS, type Scent } from "@/lib/bottle-state"
import { addLights, createBottle, MODEL_H } from "./bottle"

/*
 * "Фото" для каруселі й блоку "Про нас" — рендери того самого 3D-флакона
 * на темному студійному фоні. Робляться один раз у прихованому полотні й
 * віддаються як data URL, тож жодних чужих фото з логотипами інших брендів.
 */

export type Shots = { scents: string[]; about: string[] }

type Shot = { scent: Scent; ry: number; rz: number; zoom: number; y: number; bg: string }

function backdrop(color: string) {
  const c = document.createElement("canvas")
  c.width = c.height = 512
  const ctx = c.getContext("2d")!
  ctx.fillStyle = "#050506"
  ctx.fillRect(0, 0, 512, 512)
  const g = ctx.createRadialGradient(256, 230, 10, 256, 256, 330)
  g.addColorStop(0, color)
  g.addColorStop(1, "rgba(5,5,6,0)")
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 512, 512)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

let cache: Promise<Shots> | null = null

export function renderShots(): Promise<Shots> {
  if (cache) return cache
  cache = (document.fonts?.ready ?? Promise.resolve()).then(() => {
    const W = 600
    const H = 720
    const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true })
    renderer.setSize(W, H, false)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.localClippingEnabled = true

    const scene = new THREE.Scene()
    const pmrem = new THREE.PMREMGenerator(renderer)
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    addLights(scene)

    const camera = new THREE.PerspectiveCamera(30, W / H, 0.1, 100)
    camera.position.set(0, 0, 8)
    const viewH = 2 * 8 * Math.tan(THREE.MathUtils.degToRad(15))

    // непрозорий фон позаду — його видно крізь скло із заломленням
    const bgMat = new THREE.MeshBasicMaterial()
    const bg = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), bgMat)
    bg.position.z = -3
    scene.add(bg)

    const bottle = createBottle(SCENTS[0])
    const tilt = new THREE.Group()
    tilt.add(bottle.model)
    scene.add(tilt)

    const shoot = ({ scent, ry, rz, zoom, y, bg: tint }: Shot) => {
      bgMat.map?.dispose()
      bgMat.map = backdrop(tint)
      bgMat.needsUpdate = true
      bottle.paint(scent)
      const scale = (zoom * viewH) / MODEL_H
      tilt.scale.setScalar(scale)
      tilt.position.set(0, y, 0)
      tilt.rotation.set(0.05, ry, rz)
      bottle.level(scale)
      renderer.render(scene, camera)
      return renderer.domElement.toDataURL("image/jpeg", 0.86)
    }

    const tintOf = (s: Scent) => {
      const c = new THREE.Color(s.glass).lerp(new THREE.Color(0xffffff), 0.15)
      return `rgba(${(c.r * 255) | 0},${(c.g * 255) | 0},${(c.b * 255) | 0},0.55)`
    }

    const scents = SCENTS.map((s, i) => shoot({ scent: s, ry: -0.5 + i * 0.25, rz: 0.06, zoom: 0.7, y: -0.1, bg: tintOf(s) }))
    const about = [
      shoot({ scent: SCENTS[1], ry: 0.7, rz: -0.12, zoom: 1.35, y: -0.9, bg: "rgba(140,150,170,0.45)" }),
      shoot({ scent: SCENTS[0], ry: -0.35, rz: 0.05, zoom: 0.78, y: -0.1, bg: "rgba(90,130,255,0.5)" }),
      shoot({ scent: SCENTS[2], ry: 1.2, rz: 0.2, zoom: 1.6, y: 0.6, bg: "rgba(200,150,80,0.45)" }),
    ]

    pmrem.dispose()
    renderer.dispose()
    renderer.forceContextLoss()
    return { scents, about }
  })
  return cache
}

export function useShots() {
  const [shots, setShots] = React.useState<Shots | null>(null)
  React.useEffect(() => {
    let alive = true
    renderShots().then((s) => alive && setShots(s))
    return () => {
      alive = false
    }
  }, [])
  return shots
}
