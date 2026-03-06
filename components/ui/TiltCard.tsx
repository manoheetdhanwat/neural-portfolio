"use client";

import { useRef } from "react";
import Image from "next/image";

type Props = {
title: string;
description: string;
image: string;
github?: string;
demo?: string;
};

export default function TiltCard({ title, description, image, github, demo }: Props) {

const cardRef = useRef<HTMLDivElement>(null);

const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {


const card = cardRef.current;
if (!card) return;

const rect = card.getBoundingClientRect();

const x = e.clientX - rect.left;
const y = e.clientY - rect.top;

const rotateX = ((y / rect.height) - 0.5) * -6;
const rotateY = ((x / rect.width) - 0.5) * 6;

card.style.transform =
  `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;


};

const resetTilt = () => {
const card = cardRef.current;
if (!card) return;


card.style.transform =
  "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";


};

return (


<div
  ref={cardRef}
  onMouseMove={handleMouseMove}
  onMouseLeave={resetTilt}
  className="
    relative
    w-[320px]
    sm:w-[420px]
    md:w-[460px]
    h-[220px]
    sm:h-[260px]
    md:h-[300px]
    rounded-2xl
    overflow-hidden
    border border-white/10
    shadow-[0_25px_80px_rgba(0,0,0,0.6)]
    transition-transform
    duration-300
    group
  "
>

  {/* IMAGE */}
  <Image
    src={image}
    alt={title}
    fill
    className="
      object-cover
      transition-transform
      duration-700
      group-hover:scale-110
    "
  />

  {/* DARK GRADIENT OVERLAY */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

  {/* GLOW BORDER */}
  <div className="absolute inset-0 rounded-2xl border border-white/5 group-hover:border-white/20 transition"></div>

  {/* TEXT */}
  <div className="absolute bottom-0 p-8">

    <h3 className="text-2xl font-semibold mb-2">
      {title}
    </h3>

    <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
      {description}
    </p>
  
  <div className="flex gap-4 mt-4">

  {github && (
    <a
      href={github}
      target="_blank"
      className="text-sm text-white/70 hover:text-white transition"
    >
      GitHub →
    </a>
  )}

  {demo && (
    <a
      href={demo}
      target="_blank"
      className="text-sm text-white/70 hover:text-white transition"
    >
      Live →
    </a>
  )}

</div>

  </div>

</div>


);
}
