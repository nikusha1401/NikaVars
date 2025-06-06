import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";

function Earth({ globeRef }) {
  const texture = useTexture("/assets/earth.webp");

  return (
    <mesh ref={globeRef}>
      <sphereGeometry args={[5, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

export default function Globe() {
  const [isGrabbing, setIsGrabbing] = useState(false);

  return (
    <div
      className={`relative 
        w-[250px] h-[250px] 
        sm:w-[300px] sm:h-[300px]
        md:w-[400px] md:h-[400px]  
        xl:w-[500px] xl:h-[500px]
        ${isGrabbing ? "cursor-grabbing" : "cursor-grab"}
      `}
      onMouseDown={() => setIsGrabbing(true)}
      onMouseUp={() => setIsGrabbing(false)}
      onMouseLeave={() => setIsGrabbing(false)}
    >
      <Canvas
        camera={{ position: [0, 0, 9] }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={15} />
        <directionalLight position={[10, 10, 10]} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.8}
        />
        <Earth />
      </Canvas>
    </div>
  );
}
