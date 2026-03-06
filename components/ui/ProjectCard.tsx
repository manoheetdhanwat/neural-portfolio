"use client";

import { useRef } from "react";

type Props = {
  title: string;
  description: string;
};

export default function ProjectCard({ title, description }: Props) {

  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -10;
    const rotateY = ((x / rect.width) - 0.5) * 10;

    card.style.transform =
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
  };

  const handleMouseLeave = () => {

    const card = cardRef.current;
    if (!card) return;

    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="
      w-[420px]
      h-[260px]
      rounded-2xl
      border
      border-white/10
      bg-white/5
      backdrop-blur-xl
      p-8
      flex
      flex-col
      justify-between
      transition-transform
      duration-200
      shadow-[0_20px_60px_rgba(0,0,0,0.45)]
      hover:border-white/20
      "
    >

      <div>

        <h3 className="text-2xl font-semibold mb-4">
          {title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed">
          {description}
        </p>

      </div>

      <div className="text-sm text-gray-500">
        View Project →
      </div>

    </div>
  );
}