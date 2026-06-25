import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Box, Torus, Float } from "@react-three/drei";
import * as THREE from "three";

const FloatingShape = ({ position, children }: { position: [number, number, number], children: React.ReactNode }) => {
  return (
    <Float
      speed={1}
      rotationIntensity={1}
      floatIntensity={2}
      floatingRange={[-0.1, 0.1]}
    >
      <group position={position}>
        {children}
      </group>
    </Float>
  );
};

const AnimatedSphere = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <FloatingShape position={position}>
      <Sphere ref={meshRef} args={[0.5, 32, 32]}>
        <meshStandardMaterial
          color="#4F9EFF"
          transparent
          opacity={0.8}
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>
    </FloatingShape>
  );
};

const AnimatedBox = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <FloatingShape position={position}>
      <Box ref={meshRef} args={[0.8, 0.8, 0.8]}>
        <meshStandardMaterial
          color="#7C3AED"
          transparent
          opacity={0.7}
          roughness={0.2}
          metalness={0.9}
        />
      </Box>
    </FloatingShape>
  );
};

const AnimatedTorus = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <FloatingShape position={position}>
      <Torus ref={meshRef} args={[0.6, 0.2, 16, 32]}>
        <meshStandardMaterial
          color="#06B6D4"
          transparent
          opacity={0.6}
          roughness={0.1}
          metalness={0.8}
        />
      </Torus>
    </FloatingShape>
  );
};

const ParticleSystem = () => {
  const count = 2000;
  const meshRef = useRef<THREE.Points>(null);
  
  const [positions, scales] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      scales[i] = Math.random();
    }
    return [positions, scales];
  }, [count]);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle rotation
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.02;
      
      // Mouse interaction - particles drift slightly away from center based on mouse
      const mouseX = (state.pointer.x * state.viewport.width) / 2;
      const mouseY = (state.pointer.y * state.viewport.height) / 2;
      
      meshRef.current.position.x += (mouseX * 0.05 - meshRef.current.position.x) * 0.05;
      meshRef.current.position.y += (mouseY * 0.05 - meshRef.current.position.y) * 0.05;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          count={scales.length}
          array={scales}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#4F9EFF"
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
};

const Scene3D = () => {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4F9EFF" />
        
        <AnimatedSphere position={[-3, 2, -2]} />
        <AnimatedBox position={[3, -1, -1]} />
        <AnimatedTorus position={[-2, -2, -3]} />
        <AnimatedSphere position={[4, 3, -4]} />
        <AnimatedBox position={[-4, 1, -2]} />
        <ParticleSystem />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default Scene3D;