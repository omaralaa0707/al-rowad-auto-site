"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useWebglHealth } from "@/lib/use-webgl-health";

/**
 * Al Rowad Auto's signature piece: the slogan as road markings.
 *
 * "NO WAITING — JUST DRIVING" is painted on the wall of their own showroom
 * and hashtagged under every post they publish. Here it is laid on the road
 * instead: the two halves alternate down a ground plane that runs away to a
 * vanishing point, painted the way lane text is painted, and the whole run
 * moves toward the viewer without ever stopping — which is the claim.
 *
 * The plane is a real perspective floor, not a 2D fake: the camera sits low
 * and the text lies flat on it, so each repeat foreshortens correctly and the
 * far ones compress into the horizon on their own. The pointer steers the
 * camera's yaw a few degrees, so the road swings like a wheel does.
 *
 * Text is drei's SDF `Text`, which needs no font file conversion and stays
 * crisp at any distance. The lane lines are instanced boxes — one draw call
 * for all of them.
 */

const REPEATS = 14;
const SPACING = 8.6;

function Lane({ pos }: { pos: React.RefObject<number> }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const COUNT = 40;

  useEffect(() => {
    const m = mesh.current;
    if (!m) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < COUNT; i++) {
      const lane = i % 2 === 0 ? -3.1 : 3.1;
      dummy.position.set(lane, 0.001, -(Math.floor(i / 2) * 3.4));
      dummy.rotation.x = -Math.PI / 2;
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame(() => {
    const m = mesh.current;
    if (!m) return;
    // The whole dash pattern slides forward; the modulo keeps it seamless.
    m.position.z = pos.current % 3.4;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]} frustumCulled={false}>
      <planeGeometry args={[0.18, 1.7]} />
      <meshBasicMaterial color="#8f9298" transparent opacity={0.5} toneMapped={false} />
    </instancedMesh>
  );
}

function Run({
  pos,
  a,
  b,
  color,
  accent,
}: {
  pos: React.RefObject<number>;
  a: string;
  b: string;
  color: string;
  accent: string;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!group.current) return;
    group.current.position.z = pos.current % SPACING;
  });

  const items = useMemo(
    () => Array.from({ length: REPEATS }, (_, i) => ({ i, z: -i * SPACING })),
    [],
  );

  return (
    <group ref={group}>
      {items.map(({ i, z }) => (
        <group key={i} position={[0, 0.004, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <Text
            font="/fonts/anton.ttf"
            fontSize={1.85}
            letterSpacing={0.04}
            anchorX="center"
            anchorY="middle"
            position={[0, 2.1, 0]}
            color={i % 2 === 0 ? color : accent}
            // Type painted on tarmac is never crisp-edged; a little
            // transparency keeps it sitting *on* the road rather than
            // floating above it.
            fillOpacity={0.97}
          >
            {i % 2 === 0 ? a : b}
          </Text>
        </group>
      ))}
    </group>
  );
}

function Scene({
  a,
  b,
  color,
  accent,
  onReady,
}: {
  a: string;
  b: string;
  color: string;
  accent: string;
  onReady: () => void;
}) {
  const pos = useRef(0);
  const yaw = useRef(0);
  const targetYaw = useRef(0);

  useEffect(() => {
    onReady();
  }, [onReady]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      targetYaw.current = (e.clientX / window.innerWidth - 0.5) * 0.34;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // The camera comes off the frame state rather than out of useThree(): the
  // compiler rules forbid mutating a value a hook returned, and steering the
  // camera is exactly that.
  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    // Never stops. That is the entire point of the slogan.
    pos.current += dt * 6.2;
    yaw.current += (targetYaw.current - yaw.current) * (1 - Math.pow(0.008, dt));
    state.camera.position.x = yaw.current * 3.2;
    state.camera.lookAt(yaw.current * 1.2, 0.95, -22);
  });

  return (
    <>
      {/* The road itself, fading out toward the horizon so the far repeats
          dissolve rather than ending at a hard edge. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -30]}>
        <planeGeometry args={[34, 170]} />
        <meshBasicMaterial color="#1a1d23" toneMapped={false} />
      </mesh>
      <Lane pos={pos} />
      <Suspense fallback={null}>
        <Run pos={pos} a={a} b={b} color={color} accent={accent} />
      </Suspense>
      <fog attach="fog" args={["#f2efe9", 26, 78]} />
    </>
  );
}

/**
 * A context the browser refuses outright makes r3f throw on mount, which
 * use-webgl-health cannot see — it only reports a context created and then
 * lost. Probe before rendering the Canvas at all.
 */
function canRenderWebgl() {
  try {
    const c = document.createElement("canvas");
    return Boolean(
      c.getContext("webgl2") ?? c.getContext("webgl") ?? c.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

export function RoadType({
  a,
  b,
  alt,
  className,
  color = "#12141a",
  accent = "#ff4e47",
}: {
  a: string;
  b: string;
  alt: string;
  className?: string;
  color?: string;
  accent?: string;
}) {
  const { lost, bind } = useWebglHealth();
  const [reduced, setReduced] = useState(false);
  const [supported, setSupported] = useState<boolean | null>(null);
  const [, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    // A browser-only capability answer cannot be known before an effect runs,
    // and a lazy initialiser reading `window` would desync hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSupported(canRenderWebgl());
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  // Without WebGL, or under reduced motion, the slogan is simply set as
  // type — which is what it is anyway.
  if (lost || reduced || supported !== true) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-1 ${className ?? ""}`}
      >
        <span className="font-display text-[clamp(1.6rem,5vw,3.4rem)] leading-none text-ink">
          {a}
        </span>
        <span className="font-display text-[clamp(1.6rem,5vw,3.4rem)] leading-none text-signal">
          {b}
        </span>
      </div>
    );
  }

  return (
    <div className={className} role="img" aria-label={alt}>
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 1.15, 4.6], fov: 62 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true }}
        onCreated={({ gl }) => bind(gl.domElement)}
      >
        <Scene a={a} b={b} color={color} accent={accent} onReady={onReady} />
      </Canvas>
    </div>
  );
}
