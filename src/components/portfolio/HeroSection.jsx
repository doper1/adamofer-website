"use client";
import { useEffect, useRef, useMemo } from "react";

export default function HeroSection({ name, subtitle, description }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null });
  const isVisibleRef = useRef(true);

  const displayName = name || "Adam Ofer";
  const { firstName, lastName } = useMemo(() => {
    const parts = displayName.split(" ");
    return { firstName: parts[0] || "Adam", lastName: parts.slice(1).join(" ") || "Ofer" };
  }, [displayName]);
  const displaySubtitle = subtitle || "DevOps Engineer & Software Developer";
  const displayDescription = description || "Building robust infrastructure, elegant code, and scalable systems. Based in Israel — passionate about automation, clean architecture, and performance.";

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animFrame;
    let particles = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    let resizeTimer;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };
    window.addEventListener("resize", debouncedResize);

    // Throttle mousemove to ~30fps
    let lastMouseTime = 0;
    const handleMouseMove = (e) => {
      const now = performance.now();
      if (now - lastMouseTime < 33) return;
      lastMouseTime = now;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseout", handleMouseLeave);

    // Pause animation when section is off-screen
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    const section = canvas.closest("section");
    if (section) observer.observe(section);

    // Reduce particle count for better performance (200 vs 400)
    const particleCount = Math.min(200, Math.floor((canvas.width * canvas.height) / 5000));
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        o: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      if (!isVisibleRef.current) {
        animFrame = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const hasMouse = mx !== null && my !== null;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167, 139, 250, ${p.o})`;
        ctx.fill();

        if (hasMouse) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const distSq = dx * dx + dy * dy;
          const maxDist = 150;

          if (distSq < maxDist * maxDist) {
            const distance = Math.sqrt(distSq);
            const force = (maxDist - distance) / maxDist;
            p.x -= (dx / distance) * force * 2;
            p.y -= (dy / distance) * force * 2;
          }
        }

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 && p.dx < 0) p.dx *= -1;
        if (p.x > canvas.width && p.dx > 0) p.dx *= -1;
        if (p.y < 0 && p.dy < 0) p.dy *= -1;
        if (p.y > canvas.height && p.dy > 0) p.dy *= -1;
      }
      animFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", debouncedResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <section id="about" className="relative min-h-[110vh] flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-[120%]" />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-700/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 text-center px-4 md:px-8 max-w-4xl mx-auto mt-10">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-none">
          <span className="text-white">{firstName}</span>{" "}
          <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            {lastName}
          </span>
        </h1>

        <p className="text-base md:text-xl text-gray-400 font-light mb-4 tracking-wide">
          {displaySubtitle}
        </p>

        <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
          {displayDescription}
        </p>



        <div className="mt-16 flex flex-col items-center gap-2 text-gray-600 text-xs">
          <span className="tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-purple-500/50 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}