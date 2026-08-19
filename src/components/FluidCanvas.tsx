import { useEffect, useRef } from 'react'
import p5 from 'p5'

type Orb = {
  angle: number
  radius: number
  speed: number
  tilt: number
  size: number
}

type Shard = {
  angle: number
  radius: number
  y: number
  speed: number
  size: number
  rot: number
}

export function FluidCanvas() {
  const host = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!host.current) return

    const sketch = (p: p5) => {
      let t = 0

      let mobile = false

      let mx = 0.5
      let my = 0.5

      let tx = 0.5
      let ty = 0.5

      let centerX = 0
      let centerY = 0

      let sceneScale = 1

      let orbs: Orb[] = []
      let shards: Shard[] = []

      const seedScene = () => {
        const count = mobile ? 8 : 16

        orbs = Array.from(
          { length: count },
          (_, i) => ({
            angle:
              (i / count) * p.TWO_PI +
              p.random(-0.2, 0.2),

            radius: p.random(
              120,
              mobile ? 190 : 300,
            ),

            speed:
              p.random(
                0.0007,
                0.0016,
              ) * (i % 2 ? 1 : -1),

            tilt: p.random(-0.55, 0.55),

            size: p.random(2, 6),
          }),
        )

        const shardCount = mobile ? 4 : 10

        shards = Array.from(
          { length: shardCount },
          (_, i) => ({
            angle:
              (i / shardCount) * p.TWO_PI +
              p.random(-0.25, 0.25),

            radius: p.random(
              170,
              mobile ? 245 : 370,
            ),

            y: p.random(-140, 140),

            speed:
              p.random(
                0.0007,
                0.0018,
              ) * (i % 2 ? 1 : -1),

            size: p.random(5, 15),

            rot: p.random(p.TWO_PI),
          }),
        )
      }

      p.setup = () => {
        mobile = window.innerWidth < 700

        const canvas = p.createCanvas(
          host.current?.clientWidth ?? 1,
          host.current?.clientHeight ?? 1,
          p.WEBGL,
        )

        canvas.style('width', '100%')
        canvas.style('height', '100%')

        p.pixelDensity(
          Math.min(
            2,
            window.devicePixelRatio || 1,
          ),
        )

        p.setAttributes('alpha', true)

        p.noFill()

        seedScene()
      }

      p.windowResized = () => {
        if (!host.current) return

        mobile = window.innerWidth < 700

        p.resizeCanvas(
          host.current.clientWidth,
          host.current.clientHeight,
        )

        seedScene()
      }

      p.mouseMoved = () => {
        if (!host.current) return

        const rect =
          host.current.getBoundingClientRect()

        tx = Math.max(
          0,
          Math.min(
            1,
            (p.mouseX - rect.left) /
              rect.width,
          ),
        )

        ty = Math.max(
          0,
          Math.min(
            1,
            (p.mouseY - rect.top) /
              rect.height,
          ),
        )
      }

      /*
       * Metallic ring.
       *
       * We draw the same geometry twice:
       * - wide dark silver base
       * - thin bright silver highlight
       */
      const metallicTorus = (
        radius: number,
        tilt: number,
        bright: number,
      ) => {
        p.push()

        p.rotateZ(tilt)
        p.rotateX(tilt * 0.35)

        p.rotateY(
          t *
            0.00045 *
            (tilt >= 0 ? 1 : -1),
        )

        /* dark silver body */
        p.stroke(
          108,
          114,
          121,
          bright * 0.48,
        )

        p.strokeWeight(1.8)

        p.torus(
          radius,
          0.45,
          38,
          14,
        )

        /* bright metallic edge */
        p.stroke(
          226,
          229,
          232,
          bright,
        )

        p.strokeWeight(0.65)

        p.torus(
          radius,
          0.45,
          38,
          14,
        )

        p.pop()
      }

      /*
       * Main geometric object.
       */
      const drawCore = () => {
        p.push()

        p.translate(
          centerX,
          centerY,
          0,
        )

        p.rotateX(
          -0.2 +
            (my - 0.5) *
              0.45,
        )

        p.rotateY(
          t * 0.00055 +
            (mx - 0.5) *
              0.65,
        )

        p.rotateZ(
          0.35 +
            Math.sin(
              t * 0.0002,
            ) *
              0.18,
        )

        /*
         * Large outer sphere.
         */
        p.stroke(
          118,
          124,
          131,
          mobile ? 34 : 58,
        )

        p.strokeWeight(1.35)

        p.sphere(
          mobile ? 74 : 118,
          mobile ? 20 : 32,
          16,
        )

        /*
         * Thin silver highlight layer.
         */
        p.stroke(
          224,
          227,
          230,
          mobile ? 20 : 38,
        )

        p.strokeWeight(0.55)

        p.sphere(
          mobile ? 74 : 118,
          mobile ? 20 : 32,
          16,
        )

        /*
         * Main vertical metallic ring.
         */
        p.push()

        p.rotateY(Math.PI / 2)

        p.stroke(
          103,
          110,
          117,
          mobile ? 38 : 60,
        )

        p.strokeWeight(2)

        p.torus(
          mobile ? 86 : 138,
          0.72,
          mobile ? 32 : 46,
          12,
        )

        p.stroke(
          232,
          235,
          237,
          mobile ? 28 : 48,
        )

        p.strokeWeight(0.7)

        p.torus(
          mobile ? 86 : 138,
          0.72,
          mobile ? 32 : 46,
          12,
        )

        p.pop()

        /*
         * Horizontal metallic ring.
         */
        p.push()

        p.rotateX(Math.PI / 2)

        p.rotateZ(
          Math.sin(
            t * 0.0003,
          ) * 0.28,
        )

        p.stroke(
          98,
          105,
          112,
          mobile ? 34 : 54,
        )

        p.strokeWeight(1.9)

        p.torus(
          mobile ? 98 : 156,
          0.55,
          mobile ? 32 : 48,
          12,
        )

        p.stroke(
          225,
          228,
          231,
          mobile ? 24 : 42,
        )

        p.strokeWeight(0.65)

        p.torus(
          mobile ? 98 : 156,
          0.55,
          mobile ? 32 : 48,
          12,
        )

        p.pop()

        /*
         * BIG ROTATING CUBE.
         *
         * The stronger double-pass makes it
         * visibly metallic instead of black.
         */
        p.push()

        p.rotateX(0.8)
        p.rotateY(-0.35)

        p.rotateZ(
          t * 0.00013,
        )

        /* gunmetal body */
        p.stroke(
          92,
          98,
          105,
          mobile ? 42 : 64,
        )

        p.strokeWeight(2.1)

        p.box(
          mobile ? 130 : 190,
          mobile ? 130 : 190,
          mobile ? 130 : 190,
        )

        /* silver edge */
        p.stroke(
          232,
          235,
          237,
          mobile ? 24 : 46,
        )

        p.strokeWeight(0.7)

        p.box(
          mobile ? 130 : 190,
          mobile ? 130 : 190,
          mobile ? 130 : 190,
        )

        p.pop()

        /*
         * Central metal core.
         */
        p.noStroke()

        p.fill(
          238,
          240,
          242,
          mobile ? 70 : 105,
        )

        p.sphere(
          mobile ? 3 : 4.5,
          12,
          8,
        )

        p.fill(
          255,
          255,
          255,
          mobile ? 38 : 62,
        )

        p.sphere(
          mobile ? 1.2 : 1.8,
          8,
          6,
        )

        p.noFill()

        p.pop()
      }

      /*
       * Floating metallic blocks.
       */
      const drawOrbitals = () => {
        p.push()

        p.translate(
          centerX,
          centerY,
          0,
        )

        orbs.forEach(
          (orb, i) => {
            orb.angle +=
              orb.speed * 16

            const x =
              Math.cos(
                orb.angle,
              ) *
              orb.radius

            const z =
              Math.sin(
                orb.angle,
              ) *
              orb.radius *
              0.58

            const y =
              Math.sin(
                orb.angle * 1.7 +
                  orb.tilt,
              ) *
              (orb.radius *
                0.12)

            p.push()

            p.translate(
              x,
              y,
              z,
            )

            p.rotateZ(
              orb.angle +
                orb.tilt,
            )

            p.rotateY(
              orb.angle * 0.7,
            )

            /*
             * Dark metallic body.
             */
            p.stroke(
              100,
              106,
              113,
              mobile ? 20 : 34,
            )

            p.strokeWeight(1)

            p.box(
              orb.size,
              orb.size,
              orb.size,
            )

            /*
             * Bright silver edge.
             */
            p.stroke(
              218,
              222,
              225,
              mobile ? 13 : 26,
            )

            p.strokeWeight(0.55)

            p.box(
              orb.size,
              orb.size,
              orb.size,
            )

            p.pop()

            /*
             * Longer connection lines.
             */
            if (i % 4 === 0) {
              p.push()

              p.stroke(
                196,
                201,
                205,
                mobile ? 8 : 15,
              )

              p.strokeWeight(0.55)

              p.line(
                0,
                0,
                x,
                y,
              )

              p.pop()
            }
          },
        )

        /*
         * Large orbital rings around the
         * composition.
         */
        metallicTorus(
          mobile ? 150 : 240,
          0.35 +
            (mx - 0.5) *
              0.2,
          mobile ? 18 : 34,
        )

        metallicTorus(
          mobile ? 188 : 310,
          -0.62 +
            (my - 0.5) *
              0.2,
          mobile ? 14 : 27,
        )

        metallicTorus(
          mobile ? 222 : 365,
          0.95,
          mobile ? 10 : 20,
        )

        p.pop()
      }

      /*
       * Background fragments.
       */
      const drawShards = () => {
        shards.forEach(
          (shard) => {
            shard.angle +=
              shard.speed * 12

            const x =
              centerX +
              Math.cos(
                shard.angle,
              ) *
                shard.radius

            const z =
              Math.sin(
                shard.angle,
              ) *
                shard.radius *
                0.72

            const y =
              centerY +
              shard.y +
              Math.sin(
                t * 0.0009 +
                  shard.angle,
              ) *
                12

            p.push()

            p.translate(
              x,
              y,
              z,
            )

            p.rotateX(
              shard.rot +
                t * 0.00025,
            )

            p.rotateY(
              shard.angle,
            )

            p.stroke(
              190,
              195,
              199,
              mobile ? 10 : 20,
            )

            p.strokeWeight(0.65)

            p.box(
              shard.size,
              shard.size * 0.45,
              shard.size * 0.45,
            )

            p.pop()
          },
        )
      }

      p.draw = () => {
        const w = p.width
        const h = p.height

        t += 16

        mx +=
          (tx - mx) * 0.025

        my +=
          (ty - my) * 0.025

        p.clear()

        p.push()

        p.rotateX(
          (0.5 - my) * 0.08,
        )

        p.rotateY(
          (mx - 0.5) * 0.08,
        )

        sceneScale = Math.min(
          1.05,
          Math.max(
            0.78,
            w / 1500,
          ),
        )

        /*
         * Slightly larger and more dominant
         * on desktop.
         */
        centerX = Math.min(
          w * 0.28,
          390,
        )

        centerY =
          h * -0.02

        if (mobile) {
          centerX =
            w * 0.12

          centerY =
            h * -0.06

          sceneScale = 0.72
        }

        p.scale(sceneScale)

        drawOrbitals()
        drawShards()
        drawCore()

        p.pop()
      }
    }

    const instance = new p5(
      sketch,
      host.current,
    )

    return () => {
      instance.remove()
    }
  }, [])

  return (
    <div
      className="fluid-canvas"
      ref={host}
      aria-hidden="true"
    />
  )
}