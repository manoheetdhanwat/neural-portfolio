"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const tech = [
  { name: "Python", icon: "/tech/python.png", glow: "rgba(59,130,246,0.6)" },
  { name: "TensorFlow", icon: "/tech/tensorflow.png", glow: "rgba(249,115,22,0.7)" },
  { name: "PyTorch", icon: "/tech/pytorch.png", glow: "rgba(239,68,68,0.7)" },
  { name: "React", icon: "/tech/react.png", glow: "rgba(34,211,238,0.7)" },
  { name: "NextJS", icon: "/tech/next.png", glow: "rgba(255,255,255,0.6)" },

  { name: "Tailwind", icon: "/tech/tailwindcss.png", glow: "rgba(56,189,248,0.7)" },
  { name: "TypeScript", icon: "/tech/typescript.png", glow: "rgba(37,99,235,0.7)" },
  { name: "Docker", icon: "/tech/docker.png", glow: "rgba(14,165,233,0.7)" },
  { name: "AWS", icon: "/tech/aws.png", glow: "rgba(251,191,36,0.7)" },
  { name: "Git", icon: "/tech/git.png", glow: "rgba(239,68,68,0.7)" },

  { name: "Postgres", icon: "/tech/postgres.png", glow: "rgba(59,130,246,0.7)" },
  { name: "Pandas", icon: "/tech/pandas.png", glow: "rgba(168,85,247,0.7)" },
  { name: "NumPy", icon: "/tech/numpy.png", glow: "rgba(59,130,246,0.7)" },
  { name: "Scikit", icon: "/tech/scikit.png", glow: "rgba(249,115,22,0.7)" },
  { name: "SQL", icon: "/tech/sql.png", glow: "rgba(34,197,94,0.7)" },
];

export default function TechStack() {

  const deviceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let t = 0;

    const animate = () => {
      t += 0.01;

      if (deviceRef.current) {
        const y = Math.sin(t) * 8;
        deviceRef.current.style.transform = `translateY(${y}px)`;
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  const createRipple = (e: any) => {

    const button = e.currentTarget;

    const ripple = document.createElement("span");

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    ripple.className = "ripple";

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  return (
    <section className="py-44 flex items-center justify-center">

      {/* DEVICE WRAPPER */}
      <div
        ref={deviceRef}
        className="relative transition-transform duration-300"
      >

        {/* DEVICE SHADOW */}
        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-[460px] h-16 bg-black/30 blur-2xl rounded-full"></div>

        {/* DEVICE BODY */}
        <div
          className="
          bg-white
          rounded-[28px]
          sm:rounded-[36px]
          px-8
          sm:px-16
          lg:px-24
          py-10
          sm:py-16
          lg:py-20
          border border-gray-200
          shadow-[0_40px_90px_rgba(0,0,0,0.35)]
          relative
          max-w-[95vw]
          "  
        >

          {/* INNER DEVICE GROOVE */}
          <div className="absolute inset-4 rounded-[28px] border border-gray-100 pointer-events-none"></div>

          <h2 className="text-center text-4xl font-semibold mb-14 text-black">
            Tech Stack
          </h2>

          {/* STREAM DECK GRID */}
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">

            {tech.map((t, i) => (

              <div
                key={i}
                onClick={createRipple}
                className="
                group
                h-20
                w-20
                rounded-xl
                bg-[#0f0f0f]
                flex
                items-center
                justify-center
                border border-white/10
                shadow-[0_8px_20px_rgba(0,0,0,0.6)]
                hover:scale-105
                hover:border-white/20
                transition
                duration-200
                relative
                overflow-hidden
                "
                style={{
                  boxShadow: `0 10px 18px rgba(0,0,0,0.6), 0 0 0px ${t.glow}`,
                }}
              >

                {/* BUTTON LIGHT */}
                <div
                  className="
                  absolute
                  inset-0
                  opacity-0
                  group-hover:opacity-100
                  group-active:opacity-100
                  transition
                  duration-200
                  "
                  style={{
                    background: `radial-gradient(circle at center, ${t.glow}, transparent 70%)`
                  }}
                ></div>

                <Image
                  src={t.icon}
                  alt={t.name}
                  width={36}
                  height={36}
                />

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}