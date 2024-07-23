import { useEffect } from "react";
import { gsap } from "gsap";

const StarAnimation = () => {
  useEffect(() => {
    const createStars = (num: any) => {
      const container = document.querySelector(".star-container");
      const burstX = Math.random() * window.innerWidth; // Random X coordinate for burst
      const burstY = Math.random() * window.innerHeight; // Random Y coordinate for burst

      for (let i = 0; i < num; i++) {
        const star = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        star.setAttribute(
          "class",
          "star absolute fill-current text-yellow-400"
        );
        star.setAttribute("viewBox", "0 0 24 24");
        star.setAttribute("width", "8");
        star.setAttribute("height", "8");
        star.innerHTML =
          '<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />';
        container!.appendChild(star);

        // Initial burst animation
        gsap.from(star, {
          x: burstX,
          y: burstY,
          opacity: 0,
          scale: 0,
          duration: 1 + Math.random(),
          ease: "power4.out",
          delay: Math.random() * 1.5,
        });
      }
    };

    createStars(50);

    const stars = document.querySelectorAll(".star");
    stars.forEach((star) => {
      gsap.to(star, {
        x: () => Math.random() * window.innerWidth,
        y: () => Math.random() * window.innerHeight,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    });
  }, []);

  return (
    <div className=" inset-0 hidden md:flex overflow-hidden absolute z-50 pointer-events-none star-container"></div>
  );
};

export default StarAnimation;
