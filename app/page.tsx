"use client";

import { useEffect, useRef, useState } from "react";
import Scene from "@/components/3d/Scene";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/ui/Navbar";
import TiltCard from "@/components/ui/TiltCard";
import TechStack from "@/components/ui/TechStack";
import ProjectCard from "@/components/ui/ProjectCard";
import SectionTitle from "@/components/ui/SectionTitle";
import Typed from "typed.js";
import { Github, Linkedin, Twitter, Mail, FileText } from "lucide-react";
import SkillsNetwork from "@/components/ui/SkillsNetwork";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {

  const cameraZRef = useRef(10);
  const cameraYRef = useRef(0);
  const cameraXRef = useRef(0);
  const objectDepthRef = useRef(0);

  const projectsRef = useRef<HTMLDivElement>(null);

  const [introComplete, setIntroComplete] = useState(false);

  // Cinematic Intro
  useEffect(() => {

    document.body.style.overflow = "hidden";

    const introState = {
      cameraZ: 10
    };

    const tl = gsap.timeline({
      onUpdate: () => {
        cameraZRef.current = introState.cameraZ;
      },
      onComplete: () => {
        document.body.style.overflow = "auto";
        setIntroComplete(true);
      },
    });

    tl.to(introState, {
      cameraZ: 6,
      duration: 2,
      ease: "power3.out",
    });

  }, []);

  useEffect(() => {

  const typed = new Typed("#hero-roles", {
    strings: [
      "AI Engineer",
      "Machine Learning Developer",
      "Data Analyst",
      "Intelligent Systems Builder"
    ],
    typeSpeed: 35,
    backSpeed: 18,
    backDelay: 2500,
    startDelay: 800,
    smartBackspace: true,
    showCursor: true,
    cursorChar: "|",
    loop: true,
  });

  return () => typed.destroy();

}, []);

  // Scroll animations
  useEffect(() => {

    if (!introComplete) return;

    const ctx = gsap.context(() => {

      ScrollTrigger.normalizeScroll(true);

      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,

        onUpdate: (self) => {

          const progress = self.progress;

          cameraZRef.current = 6 - progress * 3;
          cameraYRef.current = progress * 1.5;
          objectDepthRef.current = progress * 2;

        }

      });

      // Section reveal animation
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((section) => {

        gsap.fromTo(
          section,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );

      });
         
      <div className="absolute top-24 w-full">
  <SectionTitle text="Projects" />
</div>

      // Horizontal projects scroll
      if (projectsRef.current) {

        const panels = projectsRef.current.children.length;

        gsap.to(projectsRef.current, {
          xPercent: -100 * (panels - 1),
          ease: "none",
          scrollTrigger: {
            trigger: "#projects",
            start: "top top",
            end: () => "+=" + window.innerWidth * (panels - 1)* 0.5,
            pin: true,
            scrub: 1,
          }
        });

      }

    });

    return () => ctx.revert();

  }, [introComplete]);

  // Mouse parallax
  useEffect(() => {

    const handleMouseMove = (e: MouseEvent) => {

      const normalizedX =
        (e.clientX / window.innerWidth - 0.5) * 2;

      cameraXRef.current = normalizedX * 0.5;

    };

    window.addEventListener("mousemove", handleMouseMove);

    return () =>
      window.removeEventListener("mousemove", handleMouseMove);

  }, []);

  return (
    <>
      <SmoothScroll />
      <Navbar />

      {/* 3D Background */}
      <div className="fixed inset-0 z-0">

        <Scene
          cameraZRef={cameraZRef}
          cameraYRef={cameraYRef}
          cameraXRef={cameraXRef}
          objectDepthRef={objectDepthRef}
        />

      </div>

      <main className="relative z-10">

        {/* HERO */}
        <section
          id="home"
          className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
        >
        {/* HERO GLOW BACKGROUND */}
        <div
          className="
          absolute
          w-[900px]
          h-[900px]
          bg-gradient-radial
          from-white/10
          via-white/5
          to-transparent
          blur-3xl
          pointer-events-none
          "
        />

          <h1
            className="
            text-white
            text-[48px]
            sm:text-[64px]
            md:text-[90px]
            lg:text-[120px]
            font-semibold
            tracking-tight
            leading-[0.9]
            drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]
            "
          >
            Manoheet <br /> Dhanwat
          </h1>

          {/* Animated Subtitle */}
          <p
            id="hero-roles"
            className="
            mt-8
            text-xl
            text-gray-400
            tracking-wide
            h-[28px]
            "
          ></p>

          <p
            className="
            mt-6
            max-w-xl
            text-gray-400
            leading-relaxed
            "
          >
            AI / ML Engineer building intelligent systems,
            data platforms and immersive digital experiences.
          </p>


          {/* HERO ACTIONS */}
          <div className="mt-10 flex flex-col items-center gap-5 w-full max-w-md">

            {/* RESUME BUTTON */}
            <a
              href="/resume.pdf"
              target="_blank"
              className="
              flex items-center gap-2
              bg-white text-black
              px-7 py-3
              rounded-md
              font-medium
              shadow-lg
              hover:bg-gray-200
              transition
              "
            >
              <FileText size={18} />
              Resume
            </a>


            {/* SOCIAL BUTTON GROUP */}
              <div
                className="
                flex flex-wrap justify-center gap-2
                px-3 py-2
                rounded-lg
                bg-white/5
                border border-white/10
                backdrop-blur-md
                w-full
                "
              >

              {/* Hire Me */}
              <a
                href="#contact"
                className="px-4 py-2 rounded-md hover:bg-white/10 transition text-sm flex items-center gap-2"
              >
                <Mail size={16} />
                Hire Me
              </a>

              {/* Twitter / X */}
              <a
                href="https://x.com/"
                target="_blank"
                className="p-2 rounded-md hover:bg-white/10 transition"
              >
                <Twitter size={18} />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/"
                target="_blank"
                className="p-2 rounded-md hover:bg-white/10 transition"
              >
                <Github size={18} />
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/"
                target="_blank"
                className="p-2 rounded-md hover:bg-white/10 transition"
              >
                <Linkedin size={18} />
              </a>

            </div>

          </div>

        </section>


        {/* ABOUT */}
        <section
          id="about"
          className="min-h-screen flex items-center justify-center reveal"
        >
          <SectionTitle text="About" />

        </section>


        {/* PROJECTS */}
        <section
        id="projects"
        className="relative h-[-300vh]"
      >

        <div className="sticky top-0 h-screen overflow-hidden">

          <div
            ref={projectsRef}
            className="flex h-full items-center will-change-transform"
          >

            <div className="w-screen flex items-center justify-center">

              <TiltCard
                title="EduAI Analytics"
                description="Machine learning powered student performance prediction system."
                image="/projects/eduai.png"
                github="https://github.com/yourusername/eduai"
                demo="#"
                />

            </div>

            <div className="w-screen flex items-center justify-center">

              <TiltCard
                title="HeartAI"
                description="AI based heart disease prediction model with Flask backend."
                image="/projects/heartai.png"
                github="https://github.com/yourusername/eduai"
                demo="#"
              />

            </div>

            <div className="w-screen flex items-center justify-center">

              <TiltCard
                title="Data Visualization Suite"
                description="Interactive dashboards using Python, SQL and data pipelines."
                image="/projects/dataviz.png"
                github="https://github.com/yourusername/eduai"
                demo="#"
              />

            </div>

          </div>

        </div>

        </section>

        {/* TECH STACK */}
        <section
          id="tech"
          className="reveal"
        >

          <TechStack />

        </section>

        <SkillsNetwork />

        {/* CONTACT */}

        <section
          id="contact"
          className="min-h-screen flex items-center justify-center px-6 reveal"
        >

          <div className="w-full max-w-xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 sm:p-10">

        <h2 className="text-3xl font-semibold mb-2">
          Contact Form
        </h2>

        <p className="text-gray-400 mb-8">
          Please contact me directly at your@email.com or drop your info here.
        </p>

        <form
          action="https://formspree.io/f/xaqpywqw"
          method="POST"
          className="space-y-6"
        >

          {/* NAME + EMAIL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full bg-white/10 border border-white/10 rounded-md px-4 py-3 sm:py-4 outline-none focus:border-white/30"
            />

            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full bg-white/10 border border-white/10 rounded-md px-4 py-3 sm:py-4 outline-none focus:border-white/30"
            />

          </div>

          {/* MESSAGE */}
          <textarea
            name="message"
            placeholder="Tell me about your project..."
            rows={5}
            className="w-full bg-white/10 border border-white/10 rounded-md px-4 py-3 sm:py-4 outline-none focus:border-white/30"
          />

          {/* SUBMIT */}
          <button
            type="submit"
            className="
            w-full
            bg-white text-black
            py-3 rounded-md
            font-medium
            hover:bg-gray-200
            transition
            "
          >
            Send Message →
          </button>

        </form>

          </div>

        </section>


              </main>
            </>
          );
        }