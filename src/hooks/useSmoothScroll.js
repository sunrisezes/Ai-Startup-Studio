import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll() {
  const location = useLocation();

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      window.scrollTo(0, 0);
      return;
    }

    let lenis;
    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
      });

      // Update ScrollTrigger safely on Lenis scroll
      lenis.on('scroll', () => {
        try {
          ScrollTrigger.update();
        } catch {
          // Ignore scroll trigger updates on unmounted elements
        }
      });

      // Synchronize GSAP ticker with Lenis requestAnimationFrame
      const updateTicker = (time) => {
        if (lenis) {
          lenis.raf(time * 1000);
        }
      };

      gsap.ticker.add(updateTicker);
      gsap.ticker.lagSmoothing(0);

      return () => {
        gsap.ticker.remove(updateTicker);
        if (lenis) {
          lenis.destroy();
        }
      };
    } catch {
      // Ignore initial canvas warnings
    }
  }, []);

  // Reset scroll position and refresh ScrollTrigger safely on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      try {
        ScrollTrigger.refresh();
      } catch {
        // ignore
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);
}

export default useSmoothScroll;
