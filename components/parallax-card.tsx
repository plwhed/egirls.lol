"use client";

import React, { useState, useRef, useEffect, isValidElement, cloneElement, Children, CSSProperties, ReactElement } from "react";

interface ParallaxCardProps {
  children: React.ReactNode;
  enabled: boolean;
  maxTilt?: number;
  perspective?: number;
}

export default function ParallaxCard({
  children,
  enabled,
  maxTilt = 10,
  perspective = 1000,
}: ParallaxCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const card = cardRef.current;
    if (!card) return;

    const el = card as HTMLDivElement;

    function handleMouseMove(e: MouseEvent) {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      setTilt({ x, y });
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
  }, [enabled]);

  if (!enabled) {
    return <>{children}</>;
  }

  // Clone children and add parallax layer props
  const childrenArray = Children.toArray(children);
  const layeredChildren = childrenArray.map((child, index) => {
    if (!isValidElement<{ "data-depth"?: number; "data-z"?: number; style?: CSSProperties }>(child)) return child;
    const depth = (child.props["data-depth"] as number) ?? (index + 1) * 20;
    const zIndex = (child.props["data-z"] as number) ?? (index + 1) * 30;
    return cloneElement(child as ReactElement<any, any>, {
      style: {
        ...(child.props.style as CSSProperties | undefined),
        transform: `
          translateX(${tilt.x * depth}px)
          translateY(${tilt.y * depth}px)
          translateZ(${zIndex}px)
        `,
        transformStyle: "preserve-3d",
        transition: "transform 0.1s ease-out",
        willChange: "transform",
      } as CSSProperties,
    });
  });

  return (
    <div
      ref={cardRef}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
      }}
      className="relative"
    >
      <div
        className="transform transition-transform duration-70 ease-out will-change-transform"
        style={{
          transform: `
            perspective(${perspective}px)
            rotateY(${tilt.x * maxTilt}deg)
            rotateX(${-tilt.y * maxTilt}deg)
          `,
          transformStyle: "preserve-3d",
        }}
      >
        {layeredChildren}
      </div>
    </div>
  );
}

// Helper component for parallax layers
export function ParallaxLayer({
  children,
  depth = 20,
  z = 30,
}: {
  children: React.ReactNode;
  depth?: number;
  z?: number;
}) {
  return <div data-depth={depth} data-z={z}>{children}</div>;
}