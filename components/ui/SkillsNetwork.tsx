"use client";

import { useEffect, useRef } from "react";

export default function SkillsNetwork() {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = 400;

    const nodes = Array.from({ length: 40 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6
    }));

    const draw = () => {

      ctx.clearRect(0,0,width,height);

      nodes.forEach((n,i)=>{

        n.x += n.vx;
        n.y += n.vy;

        if(n.x<0 || n.x>width) n.vx *= -1;
        if(n.y<0 || n.y>height) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x,n.y,2,0,Math.PI*2);
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.fill();

        nodes.forEach((m)=>{

          const dist = Math.hypot(n.x-m.x,n.y-m.y);

          if(dist < 120){

            ctx.beginPath();
            ctx.moveTo(n.x,n.y);
            ctx.lineTo(m.x,m.y);
            ctx.strokeStyle = "rgba(255,255,255,0.08)";
            ctx.stroke();

          }

        });

      });

      requestAnimationFrame(draw);

    };

    draw();

  },[]);

  return (

    <section className="py-40 relative overflow-hidden">

      <div className="text-center mb-16">

        <h2 className="text-5xl font-semibold">
          Intelligence Network
        </h2>

        <p className="text-gray-400 mt-4">
          Systems, models and data pipelines connected together.
        </p>

      </div>

      <canvas
        ref={canvasRef}
        className="w-full"
      />

    </section>

  );

}