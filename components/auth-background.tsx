export default function AuthBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* animated mesh gradient */}
      <div
        className="absolute inset-[-25%] opacity-70"
        style={{
          background:
            "conic-gradient(from 120deg at 50% 50%, #0f172a, #064e3b, #10b981, #052e16, #0f172a)",
          filter: "blur(90px) saturate(140%)",
          animation: "auth-mesh 22s ease-in-out infinite alternate",
        }}
      />

      {/* large drifting orbs */}
      <div
        className="orb left-[-10%] top-[-5%] h-[420px] w-[420px] bg-emerald-500"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="orb left-[45%] top-[40%] h-[340px] w-[340px] bg-teal-500"
        style={{ animationDelay: "-7s" }}
      />
      <div
        className="orb bottom-[-10%] right-[-5%] h-[440px] w-[440px] bg-lime-500"
        style={{ animationDelay: "-14s" }}
      />

      {/* faint grid */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(circle at 50% 50%, black, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 50%, black, transparent 75%)",
        }}
      />

      {/* twinkling dots */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.9) 1.2px, transparent 1.2px)",
          backgroundSize: "28px 28px",
          animation: "auth-dots 6s ease-in-out infinite alternate",
        }}
      />
    </div>
  );
}