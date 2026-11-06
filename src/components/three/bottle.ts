import * as THREE from "three"
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js"
import type { Scent } from "@/lib/bottle-state"

/** Висота моделі від дна до верху кришки. */
export const MODEL_H = 1.72
/** Рівень рідини над центром рідини, в одиницях моделі. */
export const FILL = 0.12

export function labelTexture() {
  const c = document.createElement("canvas")
  c.width = 1024
  c.height = 340
  const ctx = c.getContext("2d")!
  const draw = () => {
    ctx.clearRect(0, 0, c.width, c.height)
    const g = ctx.createLinearGradient(0, 0, 0, c.height)
    g.addColorStop(0, "#ffffff")
    g.addColorStop(0.5, "#c9ced8")
    g.addColorStop(1, "#ffffff")
    ctx.fillStyle = g
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.font = "800 118px Unbounded, 'Arial Black', sans-serif"
    ctx.fillText("FUNNY", c.width / 2, 92)
    ctx.fillText("FRIENDS", c.width / 2, 210)
    ctx.font = "500 34px Inter, Arial, sans-serif"
    ctx.letterSpacing = "18px"
    ctx.fillText("EAU DE PARFUM", c.width / 2, 300)
  }
  draw()
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  document.fonts?.ready.then(() => {
    draw()
    tex.needsUpdate = true
  })
  return tex
}

export function glowTexture(inner: string) {
  const c = document.createElement("canvas")
  c.width = c.height = 256
  const ctx = c.getContext("2d")!
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
  g.addColorStop(0, inner)
  g.addColorStop(1, "rgba(0,0,0,0)")
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 256, 256)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

/**
 * Прямокутний флакон: товсте скло з заломленням, рідина (обрізана площиною
 * `surface` — її треба тримати горизонтальною у світових координатах),
 * срібний комір і чорна глянцева кришка. Модель відцентрована по висоті.
 */
export function createBottle(scent: Scent) {
  const model = new THREE.Group()
  model.position.y = -0.24

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xf2f5ff,
    metalness: 0,
    roughness: 0.035,
    transmission: 1,
    thickness: 1.2,
    ior: 1.52,
    attenuationColor: new THREE.Color(scent.glass),
    attenuationDistance: 2.4,
    clearcoat: 1,
    clearcoatRoughness: 0.04,
    specularIntensity: 1,
    envMapIntensity: 1.4,
  })
  model.add(new THREE.Mesh(new RoundedBoxGeometry(1, 1.25, 0.42, 6, 0.07), glassMat))

  const surface = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0)
  const liquidMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(scent.liquid),
    emissive: new THREE.Color(scent.liquid),
    emissiveIntensity: 0.4,
    roughness: 0.15,
    metalness: 0.1,
    clearcoat: 1,
    side: THREE.DoubleSide,
    clippingPlanes: [surface],
  })
  const liquid = new THREE.Mesh(new RoundedBoxGeometry(0.86, 1.08, 0.28, 4, 0.05), liquidMat)
  liquid.position.y = -0.03
  model.add(liquid)

  const label = new THREE.Mesh(
    new THREE.PlaneGeometry(0.66, 0.22),
    new THREE.MeshStandardMaterial({ map: labelTexture(), transparent: true, metalness: 0.7, roughness: 0.25, depthWrite: false }),
  )
  label.position.set(0, 0.05, 0.212)
  model.add(label)

  const silver = new THREE.MeshPhysicalMaterial({ color: 0xdfe3ea, metalness: 1, roughness: 0.18, clearcoat: 0.5 })
  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.07, 48), silver)
  collar.position.y = 0.66
  model.add(collar)

  const capMat = new THREE.MeshPhysicalMaterial({ color: 0x08080a, metalness: 0.35, roughness: 0.14, clearcoat: 1, clearcoatRoughness: 0.05 })
  const cap = new THREE.Mesh(new RoundedBoxGeometry(0.52, 0.42, 0.36, 5, 0.05), capMat)
  cap.position.y = 0.905
  model.add(cap)
  const capLine = new THREE.Mesh(new THREE.BoxGeometry(0.53, 0.012, 0.37), silver)
  capLine.position.y = 0.72
  model.add(capLine)

  const tmp = new THREE.Vector3()
  /** Ставить поверхню рідини горизонтально (з кутом хлюпання `slosh`). */
  const level = (scale: number, slosh = 0) => {
    model.updateMatrixWorld(true)
    const centre = liquid.getWorldPosition(tmp)
    const n = new THREE.Vector3(Math.sin(slosh), -Math.cos(slosh), 0)
    surface.setFromNormalAndCoplanarPoint(n, centre.add(new THREE.Vector3(0, FILL * scale, 0)))
  }

  const paint = (s: Scent) => {
    glassMat.attenuationColor.set(s.glass)
    liquidMat.color.set(s.liquid)
    liquidMat.emissive.set(s.liquid)
  }

  return { model, glassMat, liquidMat, level, paint }
}

/** Стандартне освітлення студії для флакона. */
export function addLights(scene: THREE.Scene) {
  const key = new THREE.DirectionalLight(0xffffff, 2.2)
  key.position.set(3, 5, 4)
  const rim = new THREE.DirectionalLight(0x7ea0ff, 3)
  rim.position.set(-4, 2, -4)
  const fill = new THREE.DirectionalLight(0xffe6c8, 0.6)
  fill.position.set(-3, -2, 3)
  scene.add(key, rim, fill)
}
