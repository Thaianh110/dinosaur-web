import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

const Stars = (props) => {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(6000), { position: 1.5 }));

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f372c8"
          size={0.0015}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarCanvas = () => {
  return (
    <div className="w-full h-[4000px] absolute z-0 inset-0">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarCanvas;
