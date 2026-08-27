import Navbar from "@/components/navbar";
import HeroUsernameInput from "@/components/hero-username";
import LandingBackground from "@/components/landing-background";

export default function Home() {
  return (
    <LandingBackground>
      <div className="relative z-10 flex min-h-screen flex-col font-sans text-white">
        <Navbar />
        <main className="flex w-full flex-1 flex-col items-center px-4">
          <section className="flex min-h-[80vh] w-full flex-col items-center justify-center text-center">
            <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight drop-shadow sm:text-6xl">
              Every link you love, on{" "}
              <span className="text-emerald-300">one page</span>.
            </h1>
            <HeroUsernameInput />
          </section>
        </main>
      </div>
    </LandingBackground>
  );
}