import React, { useEffect, useRef } from "react";

const FoodDance = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const foods = [];

    class Food {
      constructor(x, y, emoji) {
        this.x = x;
        this.y = y;
        this.emoji = emoji;
        this.size = 50;
        this.angle = Math.random() * Math.PI * 2;
      }

      update(time) {
        this.y += Math.sin(time * 0.002 + this.angle) * 0.5;
        this.x += Math.cos(time * 0.001 + this.angle) * 0.3;
      }

      draw() {
        ctx.font = `${this.size}px serif`;
        ctx.fillText(this.emoji, this.x, this.y);
      }
    }

    const emojis = ["🍔", "🍕", "🍟", "🌭", "🍩", "🍜"];

    for (let i = 0; i < 20; i++) {
      foods.push(
        new Food(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          emojis[Math.floor(Math.random() * emojis.length)]
        )
      );
    }

    const animate = (time) => {
      ctx.fillStyle = "#111";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      foods.forEach((food) => {
        food.update(time);
        food.draw();
      });

      requestAnimationFrame(animate);
    };

    animate(0);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100vw",
        height: "100vh",
        display: "block",
      }}
    />
  );
};

export default FoodDance;