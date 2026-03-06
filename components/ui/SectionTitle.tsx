"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  text: string;
};

export default function SectionTitle({ text }: Props) {

  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {

    if (!titleRef.current) return;

    gsap.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
        },
      }
    );

  }, []);

  return (
    <h2
      ref={titleRef}
      className="
      text-5xl
      font-semibold
      tracking-tight
      mb-16
      text-center
      "
    >
      {text}
    </h2>
  );
}