import { useEffect, useRef } from 'react';

export default function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const updateGlowPosition = () => {
      // Smooth follow effect for a more organic feel
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${currentX}px, ${currentY}px)`;
      }
      animationFrameId = requestAnimationFrame(updateGlowPosition);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(updateGlowPosition);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        ref={glowRef}
        className="absolute w-[800px] h-[800px] -mt-[400px] -ml-[400px] rounded-full opacity-60 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(165, 214, 167, 0.06) 0%, rgba(165, 214, 167, 0) 70%)',
          willChange: 'transform',
        }}
      />
    </div>
  );
}

