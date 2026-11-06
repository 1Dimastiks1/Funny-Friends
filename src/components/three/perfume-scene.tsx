import * as React from "react"
import * as THREE from "three"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"
import gsap from "gsap"
import { onScent, pose, SCENTS } from "@/lib/bottle-state"
import { addLights, createBottle, glowTexture, MODEL_H } from "./bottle"

/*
 * Справжній 3D-флакон у стилі прямокутного темно-синього скла:
 * товсте скло з заломленням (transmission), рідина всередині, чорна глянцева
 * кришка і срібний комір. Рідина обрізана площиною, яка завжди лишається
 * горизонтальною у світі, тому коли флакон нахиляється на скролі, рідина
 * "переливається" і трохи хлюпає з запізненням.
 *
 * Полотно зафіксоване на весь екран під контентом (pointer-events: none).
 */

export function PerfumeScene() {
  const ref = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.setClearColor(0x000000, 0)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.localClippingEnabled = true

    const scene = new THREE.Scene()
    const pmrem = new THREE.PMREMGenerator(renderer)
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100)
    camera.position.set(0, 0, 8)
    const viewH = 2 * 8 * Math.tan(THREE.MathUtils.degToRad(15))

    addLights(scene)

    // Сяйво позаду — його видно крізь скло, з заломленням
    const glowMat = new THREE.MeshBasicMaterial({ map: glowTexture("rgba(90,130,255,0.45)"), transparent: true, depthWrite: false })
    const glow = new THREE.Mesh(new THREE.PlaneGeometry(7, 7), glowMat)
    glow.position.z = -2.5
    scene.add(glow)

    // ── Флакон ──
    const root = new THREE.Group() // положення/масштаб
    const tilt = new THREE.Group() // нахил і оберт
    const { model, glassMat, liquidMat, level } = createBottle(SCENTS[0])
    root.add(tilt)
    tilt.add(model)
    scene.add(root)

    // М'яка тінь під флаконом
    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(1.8, 0.5),
      new THREE.MeshBasicMaterial({ map: glowTexture("rgba(0,0,0,0.85)"), transparent: true, depthWrite: false }),
    )
    shadow.rotation.x = -Math.PI / 2.4
    scene.add(shadow)

    // ── Перефарбування на зміну аромату ──
    const tweenColor = (target: THREE.Color, hex: string) => {
      const c = new THREE.Color(hex)
      gsap.to(target, { r: c.r, g: c.g, b: c.b, duration: reduced ? 0 : 0.9, ease: "power2.inOut" })
    }
    const offScent = onScent((i) => {
      const s = SCENTS[i]
      tweenColor(glassMat.attenuationColor, s.glass)
      tweenColor(liquidMat.color, s.liquid)
      tweenColor(liquidMat.emissive, s.liquid)
      const g = new THREE.Color(s.glass).lerp(new THREE.Color(0xffffff), 0.25)
      tweenColor(glowMat.color, "#" + g.getHexString())
    })

    // ── Взаємодія ──
    const pointer = { x: 0, y: 0 }
    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener("pointermove", onPointer, { passive: true })

    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    window.addEventListener("resize", resize)

    // поточні (згладжені) значення
    const cur = { ...pose }
    const look = { x: 0, y: 0 }
    let lastScroll = window.scrollY
    let sway = 0 // нахил від швидкості скролу
    let slosh = 0 // кут поверхні рідини
    let sloshV = 0
    let prevAngle = 0
    let last = performance.now()
    let t = 0
    let frame = 0

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      t += dt

      const k = 1 - Math.exp(-dt * 4.5)
      ;(Object.keys(cur) as (keyof typeof cur)[]).forEach((key) => {
        cur[key] += (pose[key] - cur[key]) * k
      })

      // швидкість скролу → нахил вліво/вправо
      const sy = window.scrollY
      const vel = (sy - lastScroll) / Math.max(dt, 0.001)
      lastScroll = sy
      const swayTarget = reduced ? 0 : THREE.MathUtils.clamp(-vel * 0.00012, -0.22, 0.22)
      sway += (swayTarget - sway) * (1 - Math.exp(-dt * 3))

      look.x += (pointer.x - look.x) * (1 - Math.exp(-dt * 3))
      look.y += (pointer.y - look.y) * (1 - Math.exp(-dt * 3))

      const aspect = camera.aspect
      const scale = (cur.s * viewH) / MODEL_H * Math.max(cur.o, 0.001)
      const idle = reduced ? 0 : 1
      root.position.set(cur.x * ((viewH * aspect) / 2), cur.y * (viewH / 2) + Math.sin(t * 1.1) * 0.04 * idle, 0)
      root.scale.setScalar(scale)
      root.visible = cur.o > 0.01

      tilt.rotation.set(
        look.y * 0.12 * idle,
        cur.ry + Math.sin(t * 0.5) * 0.18 * idle + look.x * 0.35 * idle,
        cur.rz + sway,
      )

      // Рідина: поверхня тримається горизонтально і хлюпає з запізненням
      const angle = tilt.rotation.z
      const angVel = (angle - prevAngle) / Math.max(dt, 0.001)
      prevAngle = angle
      const force = -angVel * 0.35 - slosh * 60 - sloshV * 3.2
      sloshV += force * dt
      slosh += sloshV * dt
      slosh = THREE.MathUtils.clamp(slosh, -0.35, 0.35)
      level(scale, slosh)

      glow.position.x = root.position.x
      glow.position.y = root.position.y
      glow.scale.setScalar(scale * 1.1)
      shadow.position.set(root.position.x, root.position.y - 0.95 * scale, 0.2)
      shadow.scale.setScalar(scale)
      shadow.visible = root.visible

      renderer.render(scene, camera)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      offScent()
      window.removeEventListener("pointermove", onPointer)
      window.removeEventListener("resize", resize)
      scene.traverse((o) => {
        const m = o as THREE.Mesh
        m.geometry?.dispose()
        const mat = m.material as THREE.Material | undefined
        mat?.dispose()
      })
      pmrem.dispose()
      renderer.dispose()
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] h-svh w-full" />
}
