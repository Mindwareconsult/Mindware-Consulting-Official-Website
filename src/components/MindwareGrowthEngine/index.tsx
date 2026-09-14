import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';
import { Suspense, useEffect, useState } from 'react';
import { MotionValue } from 'motion/react';
import { Scene } from './Scene';

export interface MindwareGrowthEngineProps {
  scrollProgress: MotionValue<number>;
}

export function MindwareGrowthEngine({ scrollProgress }: MindwareGrowthEngineProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check initial state
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    const checkMotion = () => setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    
    checkMobile();
    checkMotion();
    
    // Add event listeners for responsive updates
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 7], fov: 45 }} 
        dpr={[1, 2]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <Environment preset="city" />
          <Scene 
            scrollProgress={scrollProgress} 
            isMobile={isMobile} 
            reducedMotion={reducedMotion} 
          />
          <EffectComposer disableNormalPass>
            <Bloom luminanceThreshold={1} mipmapBlur intensity={1.2} />
            <DepthOfField target={[2.5, 0, 0]} focalLength={0.02} bokehScale={3} height={480} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
