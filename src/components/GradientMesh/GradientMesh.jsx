import React, { useEffect, useRef } from 'react';
import './GradientMesh.css';

export const GradientMesh = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId = null;
    let width = 0;
    let height = 0;
    let isVisible = true;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const blobs = [
      { x: 0.2, y: 0.2, r: 0.45, color: 'rgba(124, 58, 237, 0.4)', speedX: 0.0003, speedY: 0.0004, seed: 0 },
      { x: 0.8, y: 0.3, r: 0.4, color: 'rgba(6, 182, 212, 0.35)', speedX: 0.0004, speedY: 0.0003, seed: 2 },
      { x: 0.5, y: 0.7, r: 0.5, color: 'rgba(79, 70, 229, 0.35)', speedX: 0.0002, speedY: 0.0005, seed: 4 },
      { x: 0.8, y: 0.8, r: 0.35, color: 'rgba(16, 185, 129, 0.25)', speedX: 0.0003, speedY: 0.0003, seed: 6 },
    ];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      if (prefersReducedMotion) {
        drawFrame(0);
      }
    };

    const drawFrame = (time) => {
      ctx.clearRect(0, 0, width, height);

      blobs.forEach((blob) => {
        const cx = prefersReducedMotion
          ? blob.x * width
          : (blob.x + Math.sin(time * blob.speedX + blob.seed) * 0.15) * width;
        const cy = prefersReducedMotion
          ? blob.y * height
          : (blob.y + Math.cos(time * blob.speedY + blob.seed) * 0.15) * height;
        const radius = Math.min(width, height) * blob.r;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, blob.color);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const render = (time) => {
      if (!isVisible) return;
      drawFrame(time);
      if (!prefersReducedMotion) {
        animFrameId = requestAnimationFrame(render);
      }
    };

    // IntersectionObserver to pause rendering when offscreen/hidden
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !prefersReducedMotion) {
            if (animFrameId) cancelAnimationFrame(animFrameId);
            animFrameId = requestAnimationFrame(render);
          }
        });
      },
      { threshold: 0.01 }
    );

    observer.observe(canvas);
    resize();
    window.addEventListener('resize', resize);

    if (!prefersReducedMotion) {
      animFrameId = requestAnimationFrame(render);
    }

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="gradient-mesh-container">
      <canvas ref={canvasRef} className="gradient-mesh-canvas" />
    </div>
  );
};

export default GradientMesh;
