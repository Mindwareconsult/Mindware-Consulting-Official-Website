import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { MotionValue } from 'motion/react';

interface SceneProps {
  scrollProgress: MotionValue<number>;
  isMobile: boolean;
  reducedMotion: boolean;
}

const NODES = [
  "STRATEGY", "WEBSITE", "SEO", "SOCIAL", "CONTENT",
  "AI", "ANALYTICS", "LEADS", "CUSTOMERS", "GROWTH"
];

export function Scene({ scrollProgress, isMobile, reducedMotion }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);

  // Generate node positions in a sophisticated orbital distribution
  const nodeData = useMemo(() => {
    return NODES.map((label, i) => {
      // Golden ratio spiral distribution for elegant, non-random placement
      const phi = Math.acos(-1 + (2 * i) / NODES.length);
      const theta = Math.sqrt(NODES.length * Math.PI) * phi;
      const radius = 2.8 + (i % 3) * 0.3; // Slight variation in orbit distance
      return {
        label,
        position: new THREE.Vector3(
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(phi)
        )
      };
    });
  }, []);

  // Generate subtle background particles for depth
  const particles = useMemo(() => {
    const p = new Float32Array(400 * 3);
    for (let i = 0; i < 400 * 3; i++) {
      p[i] = (Math.random() - 0.5) * 15;
    }
    return p;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const scroll = scrollProgress.get();

    if (!reducedMotion) {
      // Core scroll-driven rotation (smoothly mapped over the scroll height)
      groupRef.current.rotation.y = scroll * Math.PI * 1.5;
      groupRef.current.rotation.x = scroll * Math.PI * 0.5;

      // Subtle idle animations for components
      if (coreRef.current) {
        coreRef.current.rotation.y += delta * 0.1;
        coreRef.current.rotation.x += delta * 0.15;
      }
      if (ringsRef.current) {
        ringsRef.current.rotation.z -= delta * 0.05;
        ringsRef.current.rotation.y -= delta * 0.02;
      }
    }
  });

  // Shift to the right on desktop so it balances with the left-aligned HTML text
  const positionX = isMobile ? 0 : 2.5;
  const scale = isMobile ? 0.6 : 0.8;

  return (
    <group position={[positionX, 0, 0]} scale={scale}>
      <group ref={groupRef}>
        
        {/* The Core: Abstract Glass & Energy Shell */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <mesh ref={coreRef}>
            <icosahedronGeometry args={[1.2, 1]} />
            <meshPhysicalMaterial
              color="#ffffff"
              transmission={0.9}
              opacity={1}
              metalness={0.2}
              roughness={0.1}
              ior={1.5}
              thickness={1.5}
              clearcoat={1}
              wireframe={false}
            />
          </mesh>
          
          {/* Inner Glowing Idea/Energy Core */}
          <mesh scale={0.6}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color="#f97316"
              emissive="#f97316"
              emissiveIntensity={2}
              wireframe
              transparent
              opacity={0.8}
            />
          </mesh>
        </Float>

        {/* Orbital Rings & Data Nodes */}
        <group ref={ringsRef}>
          {/* Subtle architectural wireframe rings */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[2.5, 0.005, 16, 100]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
          </mesh>
          <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
            <torusGeometry args={[3.2, 0.005, 16, 100]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
          </mesh>

          {/* Node Items */}
          {nodeData.map((node, i) => (
            <group key={i} position={node.position}>
              <mesh>
                <sphereGeometry args={[0.04, 16, 16]} />
                <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
              </mesh>
              <Text
                position={[0, 0.15, 0]}
                fontSize={0.12}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                fillOpacity={0.7}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
              >
                {node.label}
              </Text>
            </group>
          ))}
        </group>

        {/* Ambient Data Particles */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particles.length / 3}
              array={particles}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.02}
            color="#ffffff"
            transparent
            opacity={0.3}
            sizeAttenuation
            depthWrite={false}
          />
        </points>
      </group>

      {/* Cinematic Lighting Setup */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
      <directionalLight position={[-5, -5, -5]} intensity={1} color="#f97316" />
      <pointLight position={[0, 0, 0]} intensity={2} color="#f97316" distance={5} />
    </group>
  );
}
