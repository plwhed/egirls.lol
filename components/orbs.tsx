export default function Orbs() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="orb left-[-10%] top-[-5%] h-[400px] w-[400px] bg-emerald-400"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="orb left-[40%] top-[35%] h-[320px] w-[320px] bg-teal-400"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="orb bottom-[-10%] right-[-5%] h-[420px] w-[420px] bg-lime-400"
        style={{ animationDelay: "-12s" }}
      />
    </div>
  );
}