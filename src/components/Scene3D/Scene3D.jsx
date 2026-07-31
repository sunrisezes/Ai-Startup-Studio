import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import './Scene3D.css';

function FloatingShapes({ mousePos, prefersReducedMotion }) {
  const groupRef = useRef();

  // Mesh references for individual rotation
  const shape1Ref = useRef();
  const shape2Ref = useRef();
  const shape3Ref = useRef();
  const shape4Ref = useRef();
  const shape5Ref = useRef();

  useFrame((state, delta) => {
    if (prefersReducedMotion) return;

    // Smooth cursor parallax on the parent group
    if (groupRef.current) {
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        mousePos.x * 0.8,
        0.05
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        mousePos.y * 0.8,
        0.05
      );
    }

    // Auto-rotate individual shapes
    if (shape1Ref.current) {
      shape1Ref.current.rotation.x += delta * 0.3;
      shape1Ref.current.rotation.y += delta * 0.4;
    }
    if (shape2Ref.current) {
      shape2Ref.current.rotation.x -= delta * 0.2;
      shape2Ref.current.rotation.z += delta * 0.3;
    }
    if (shape3Ref.current) {
      shape3Ref.current.rotation.y += delta * 0.25;
      shape3Ref.current.rotation.z -= delta * 0.15;
    }
    if (shape4Ref.current) {
      shape4Ref.current.rotation.x += delta * 0.35;
    }
    if (shape5Ref.current) {
      shape5Ref.current.rotation.y -= delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Primary Brand Shape: Icosahedron */}
      <Float speed={prefersReducedMotion ? 0 : 2} rotationIntensity={1} floatIntensity={1.5}>
        <mesh ref={shape1Ref} position={[-2.2, 1.2, -1]} scale={1.2}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#7C3AED"
            roughness={0.15}
            metalness={0.85}
            envMapIntensity={1.5}
          />
        </mesh>
      </Float>

      {/* Accent Brand Shape: TorusKnot */}
      <Float speed={prefersReducedMotion ? 0 : 1.5} rotationIntensity={1.2} floatIntensity={2}>
        <mesh ref={shape2Ref} position={[2.4, -0.8, -0.5]} scale={0.75}>
          <torusKnotGeometry args={[0.7, 0.22, 64, 16]} />
          <meshStandardMaterial
            color="#06B6D4"
            roughness={0.2}
            metalness={0.8}
            envMapIntensity={1.8}
          />
        </mesh>
      </Float>

      {/* Secondary Shape: Dodecahedron */}
      <Float speed={prefersReducedMotion ? 0 : 1.8} rotationIntensity={0.8} floatIntensity={1.2}>
        <mesh ref={shape3Ref} position={[2.8, 1.5, -2]} scale={0.9}>
          <dodecahedronGeometry args={[0.9]} />
          <meshStandardMaterial
            color="#4F46E5"
            roughness={0.25}
            metalness={0.75}
            envMapIntensity={1.2}
          />
        </mesh>
      </Float>

      {/* Small accent icosahedron */}
      <Float speed={prefersReducedMotion ? 0 : 2.5} rotationIntensity={1.5} floatIntensity={2}>
        <mesh ref={shape4Ref} position={[-3, -1.2, -1.5]} scale={0.65}>
          <icosahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial
            color="#10B981"
            roughness={0.3}
            metalness={0.7}
            envMapIntensity={1.4}
          />
        </mesh>
      </Float>

      {/* Central background torus */}
      <Float speed={prefersReducedMotion ? 0 : 1} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh ref={shape5Ref} position={[0, 0.5, -3.5]} scale={1.8}>
          <torusGeometry args={[1.5, 0.12, 16, 50]} />
          <meshStandardMaterial
            color="#F59E0B"
            roughness={0.2}
            metalness={0.85}
            envMapIntensity={1.5}
          />
        </mesh>
      </Float>
    </group>
  );
}

export const Scene3D = () => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isInView, setIsInView] = useState(true);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (prefersReducedMotion) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  if (!isInView) {
    return <div ref={containerRef} className="scene3d-container" />;
  }

  return (
    <div ref={containerRef} className="scene3d-container">
      <Canvas
        className="scene3d-canvas"
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06B6D4" />
        <Environment preset="city" />
        <FloatingShapes mousePos={mousePos} prefersReducedMotion={prefersReducedMotion} />
      </Canvas>
    </div>
  );
};

export default Scene3D;
