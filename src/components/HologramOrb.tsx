import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

interface HologramOrbProps {
  isListening?: boolean;
}

export function HologramOrb({ isListening = false }: HologramOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [colorTransition, setColorTransition] = useState(0);
  const transitionRef = useRef(0);

  // 색상 보간 함수
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  // 색상 보간 (rgba 문자열 생성)
  const lerpColor = (
    r1: number, g1: number, b1: number, a1: number,
    r2: number, g2: number, b2: number, a2: number,
    t: number
  ) => {
    return `rgba(${Math.round(lerp(r1, r2, t))}, ${Math.round(lerp(g1, g2, t))}, ${Math.round(lerp(b1, b2, t))}, ${lerp(a1, a2, t)})`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 400;
    canvas.width = size;
    canvas.height = size;

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += 0.008;
      
      // 부드러운 색상 전환
      const targetTransition = isListening ? 1 : 0;
      transitionRef.current += (targetTransition - transitionRef.current) * 0.05;
      const t = transitionRef.current;
      
      // Clear canvas
      ctx.clearRect(0, 0, size, size);

      const centerX = size / 2;
      const centerY = size / 2;
      const radius = size / 2;

      // Create base gradient for the orb
      const gradient = ctx.createRadialGradient(
        centerX - radius * 0.3,
        centerY - radius * 0.3,
        radius * 0.1,
        centerX,
        centerY,
        radius
      );

      // 청록색과 밝은 파란색 사이의 부드러운 전환
      gradient.addColorStop(0, lerpColor(150, 255, 240, 0.95, 180, 230, 255, 0.95, t));
      gradient.addColorStop(0.3, lerpColor(80, 230, 220, 0.85, 120, 200, 255, 0.85, t));
      gradient.addColorStop(0.5, lerpColor(20, 200, 200, 0.8, 80, 170, 250, 0.8, t));
      gradient.addColorStop(0.7, lerpColor(6, 160, 170, 0.7, 60, 140, 230, 0.7, t));
      gradient.addColorStop(1, lerpColor(3, 120, 140, 0.5, 40, 110, 200, 0.5, t));

      // Draw main orb
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Add animated flowing lines/waves
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      
      for (let i = 0; i < 3; i++) {
        const offset = i * (Math.PI * 2 / 3);
        const waveY = Math.sin(time * 2 + offset) * 20;
        const waveAlpha = 0.3 + Math.sin(time * 3 + offset) * 0.2;

        const waveGradient = ctx.createLinearGradient(
          centerX - radius,
          centerY + waveY,
          centerX + radius,
          centerY + waveY
        );
        
        waveGradient.addColorStop(0, lerpColor(0, 255, 230, 0, 100, 180, 255, 0, t));
        waveGradient.addColorStop(0.5, lerpColor(80, 255, 230, waveAlpha, 100, 180, 255, waveAlpha, t));
        waveGradient.addColorStop(1, lerpColor(0, 255, 230, 0, 100, 180, 255, 0, t));

        ctx.beginPath();
        ctx.ellipse(
          centerX,
          centerY + waveY,
          radius * 0.9,
          radius * 0.3,
          Math.PI / 6 + time + offset,
          0,
          Math.PI * 2
        );
        ctx.strokeStyle = waveGradient;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.restore();

      // Add subtle glow particles
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      
      for (let i = 0; i < 15; i++) {
        const angle = (time * 0.5 + i * 0.5) % (Math.PI * 2);
        const dist = radius * 0.7 + Math.sin(time * 2 + i) * radius * 0.2;
        const x = centerX + Math.cos(angle) * dist;
        const y = centerY + Math.sin(angle) * dist;
        const particleSize = 2 + Math.sin(time * 3 + i) * 1;
        const alpha = 0.4 + Math.sin(time * 4 + i * 0.7) * 0.3;

        const particleGradient = ctx.createRadialGradient(x, y, 0, x, y, particleSize * 3);
        particleGradient.addColorStop(0, lerpColor(130, 255, 230, alpha, 150, 210, 255, alpha, t));
        particleGradient.addColorStop(1, lerpColor(80, 255, 230, 0, 100, 180, 255, 0, t));

        ctx.beginPath();
        ctx.arc(x, y, particleSize * 3, 0, Math.PI * 2);
        ctx.fillStyle = particleGradient;
        ctx.fill();
      }

      ctx.restore();

      // Add outer glow
      const glowGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.8,
        centerX,
        centerY,
        radius * 1.2
      );
      glowGradient.addColorStop(0, lerpColor(80, 255, 230, 0.1, 100, 180, 255, 0.1, t));
      glowGradient.addColorStop(1, lerpColor(0, 255, 230, 0, 80, 170, 250, 0, t));

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.2, 0, Math.PI * 2);
      ctx.fillStyle = glowGradient;
      ctx.fill();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isListening]);

  // 리스닝 모드일 때 펄스 애니메이션
  const listeningAnimation = {
    scale: [1, 1.08, 1],
  };
  
  const listeningTransition = {
    duration: 1.2,
    repeat: Infinity,
    ease: "easeInOut",
  };

  return (
    <div className="relative w-[180px] h-[180px] flex items-center justify-center">
      {/* Canvas 홀로그램 */}
      <motion.div
        className="absolute w-[180px] h-[180px] rounded-full overflow-hidden bg-transparent"
        animate={{
          ...(isListening ? listeningAnimation : {}),
          boxShadow: isListening 
            ? '0 0 8px rgba(100, 180, 255, 0.5), 0 0 15px rgba(100, 180, 255, 0.3)'
            : '0 0 8px rgba(80, 255, 230, 0.5), 0 0 15px rgba(80, 255, 230, 0.3)',
        }}
        transition={{
          ...(isListening ? listeningTransition : {}),
          boxShadow: { duration: 0.8, ease: "easeInOut" }
        }}
      >
        <canvas
          ref={canvasRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        />
      </motion.div>
    </div>
  );
}
