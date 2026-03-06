"use client";

import { useEffect, useState } from "react";

const sections = ["home", "about", "projects", "tech", "contact"];

export default function Navbar() {

  const [active, setActive] = useState("home");

  useEffect(() => {

    const handleScroll = () => {

      const scrollY = window.scrollY;

      sections.forEach((section) => {

        const el = document.getElementById(section);

        if (!el) return;

        const offsetTop = el.offsetTop - 200;
        const height = el.offsetHeight;

        if (scrollY >= offsetTop && scrollY < offsetTop + height) {
          setActive(section);
        }

      });

    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  const scrollToSection = (id: string) => {

    const el = document.getElementById(id);

    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
    });

  };

  return (

    <nav
      className="
      fixed
      top-4
      left-1/2
      -translate-x-1/2
      z-50
      w-[92%]
      max-w-[720px]
      bg-white/5
      backdrop-blur-xl
      border
      border-white/10
      rounded-full
      px-4
      sm:px-8
      py-2
      sm:py-3
      flex
      justify-center
      gap-4
      sm:gap-8
      text-xs
      sm:text-sm
      "
    >

      {sections.map((section) => (

        <button
          key={section}
          onClick={() => scrollToSection(section)}
          className={`
            px-2
            sm:px-3
            py-1
            transition
            ${active === section
              ? "text-white"
              : "text-gray-400 hover:text-white"}
          `}
        >
          {section.toUpperCase()}
        </button>

      ))}

    </nav>

  );
}