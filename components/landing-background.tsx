"use client";

import { NoiseGradientBackground } from "noise-gradient-bg";

export default function LandingBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NoiseGradientBackground
      primaryColor="emerald-500/25"
      secondaryColor="green-400/20"
      tertiaryColor="lime-300/15"
      primaryBlur={100}
      secondaryBlur={100}
      tertiaryBlur={100}
      noiseOpacity={95}
      microNoiseOpacity={10}
      vignetteIntensity="strong"
      className="min-h-screen"
      theme="green"
    >
      {children}
    </NoiseGradientBackground>
  );
}