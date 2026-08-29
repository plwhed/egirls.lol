"use client";

import { useState, useRef, useEffect } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  enabled: boolean;
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
}

export default function TiltCard({
  children,
  enabled,
  maxTilt = 15,
  perspective = 1000,
  scale = 1.02,
  speed = 500,
}: TiltCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const card = cardRef.current;
    if (!card) return;

    const el = card as HTMLDivElement;

    function handleMouseMove(e: MouseEvent) {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      setTilt({
        x: Math.max(-maxTilt, Math.min(maxTilt, deltaY * maxTilt)),
        y: Math.max(-maxTilt, Math.min(maxTilt, -deltaX * maxTilt)),
      });
    }

    function handleMouseLeave() {
      setTilt({ x: 0, y: 0 });
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [enabled, maxTilt]);

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <div
      ref={cardRef}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="transform transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${scale}, ${scale}, ${scale})`,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </div>
  );
}