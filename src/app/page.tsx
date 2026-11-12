import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import GithubActivity from "@/components/sections/GithubActivity";
import Connect from "@/components/sections/Connect";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";

export default function Page() {
  return (
    <>
      {/* Animated grid background at the top (landing page) */}
      <div
        className="absolute inset-x-0 top-0 z-0 h-25 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={0.5}
          className="h-full w-full [mask-image:linear-gradient(to_bottom,black,transparent)]"
        />
      </div>

      <main className="flex flex-col gap-14">
        <Hero />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Projects />
        <GithubActivity />
        <Connect />
        <Footer />
      </main>

      {/* Floating bottom navbar for landing page */}
      <Navbar />
    </>
  );
}
