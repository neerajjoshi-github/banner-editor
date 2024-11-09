"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  animate,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

const images = [
  "https://i.ibb.co/HHxgb8v/Screenshot-2024-11-09-at-1-39-30-PM.png",
  "https://i.ibb.co/z5vgmgw/Screenshot-2024-11-09-at-1-40-44-PM.png",
  "https://i.ibb.co/kBXVLtB/Screenshot-2024-11-09-at-1-41-29-PM.png",
  "https://i.ibb.co/gdmKJ1T/Screenshot-2024-11-09-at-1-42-12-PM.png",
  "https://i.ibb.co/CK5dPq5/Screenshot-2024-11-09-at-1-43-54-PM.png",
  "https://i.ibb.co/HHxgb8v/Screenshot-2024-11-09-at-1-39-30-PM.png",
  "https://i.ibb.co/z5vgmgw/Screenshot-2024-11-09-at-1-40-44-PM.png",
  "https://i.ibb.co/kBXVLtB/Screenshot-2024-11-09-at-1-41-29-PM.png",
  "https://i.ibb.co/gdmKJ1T/Screenshot-2024-11-09-at-1-42-12-PM.png",
  "https://i.ibb.co/CK5dPq5/Screenshot-2024-11-09-at-1-43-54-PM.png",
];

const Carousel = () => {
  const ringRef = useRef(null);
  const rotationY = useMotionValue(180);
  const smoothRotation = useSpring(rotationY, {
    stiffness: 100,
    damping: 30,
    mass: 0.05,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const lastUpdateTime = useRef(Date.now());
  const lastDragX = useRef(0);
  const lastScrollY = useRef(0);

  const itemCount = images.length;
  const angleStep = 360 / itemCount;
  // Increased radius for more spacing between images
  const radius = 1600;

  const handleDragStart = (e: any) => {
    setIsDragging(true);
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    setStartX(clientX);
    lastDragX.current = clientX;
    lastUpdateTime.current = Date.now();
    setVelocity(0);
  };

  const handleDragMove = (e: any) => {
    if (!isDragging) return;

    const currentX = e.clientX || (e.touches && e.touches[0].clientX);
    const deltaX = currentX - startX;
    const currentTime = Date.now();
    const deltaTime = currentTime - lastUpdateTime.current;

    if (deltaTime > 0) {
      const instantVelocity = (currentX - lastDragX.current) / deltaTime;
      setVelocity(instantVelocity * 20);
    }

    const sensitivity = 0.1;
    const newRotation = rotationY.get() - deltaX * sensitivity;
    rotationY.set(newRotation);

    setStartX(currentX);
    lastDragX.current = currentX;
    lastUpdateTime.current = currentTime;
  };

  const handleDragEnd = () => {
    setIsDragging(false);

    if (Math.abs(velocity) > 0.1) {
      const momentum = velocity * 20;
      const targetRotation = rotationY.get() - momentum;

      animate(rotationY, targetRotation, {
        type: "spring",
        stiffness: 50,
        damping: 20,
        mass: 1,
        velocity: velocity,
      });
    }
  };

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const deltaY = latest - lastScrollY.current;
    const scrollSensitivity = 0.5;
    const newRotation = rotationY.get() - deltaY * scrollSensitivity;

    animate(rotationY, newRotation, {
      type: "tween",
      duration: 0.1,
      ease: "linear",
    });

    lastScrollY.current = latest;
  });

  useEffect(() => {
    animate(rotationY, 180, {
      type: "spring",
      stiffness: 60,
      damping: 15,
    });

    const images = document.querySelectorAll(".carousel-image");
    images.forEach((img, i) => {
      animate(
        img,
        { y: [200, 0], opacity: [0, 1] },
        {
          duration: 1.5,
          delay: i * 0.1,
          ease: [0.16, 1, 0.3, 1],
        }
      );
    });
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className="absolute rotate-[4deg] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[40rem]"
        style={{
          perspective: "4000px", // Increased perspective for better 3D effect
        }}
      >
        <motion.div
          ref={ringRef}
          className="w-full h-full"
          style={{
            rotateY: smoothRotation,
            cursor: isDragging ? "grabbing" : "grab",
            transformStyle: "preserve-3d",
          }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          onMouseMove={handleDragMove}
          onTouchMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onTouchEnd={handleDragEnd}
          onMouseLeave={handleDragEnd}
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="carousel-image rounded-[30px] absolute w-full h-full bg-cover bg-no-repeat bg-center"
              style={{
                rotateY: index * -angleStep,
                transformOrigin: `50% 50% ${radius}px`,
                z: -radius,
                backgroundImage: `url(${image})`,
                backfaceVisibility: "hidden",
                transformStyle: "preserve-3d",
                transition: "opacity 0.3s ease",
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                // Added scale to make images slightly smaller
                scale: 1,
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Carousel;
