import { useState, useEffect, useRef } from "react";
import styles from "./main.module.css";
import MainCar from "./assets/main_car.png";
import Circle from "./assets/circle.png";
import Slider from "../Slider/Slider";

export const Main = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);

      setMousePosition({ x, y });
    };

    let animationFrameId: number;
    const throttledMouseMove = (e: MouseEvent) => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      animationFrameId = requestAnimationFrame(() => handleMouseMove(e));
    };

    window.addEventListener("mousemove", throttledMouseMove);

    return () => {
      window.removeEventListener("mousemove", throttledMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const getTransform = (xMultiplier: number, yMultiplier: number) => {
    const moveX = mousePosition.x * xMultiplier;
    const moveY = mousePosition.y * yMultiplier;
    return `translate(${moveX}px, ${moveY}px)`;
  };

  return (
    <>
    
    <div className={styles.main_container} ref={containerRef}>
      <div className={styles.main_text_container}>
        <h1 className={styles.main_title}>Тентотека</h1>
        <ul className={styles.main_list}>
          <li>Собственное производство тентов</li>
          <li>Тенты служат 5+ лет</li>
          <li>Простая установка</li>
          <li>Подбор за 1 минуту</li>
          <li>Быстрая доставка по РФ</li>
        </ul>
      </div>

      <div>
        <span
          className={styles.main_square_top}
          style={{ transform: getTransform(15, 15) }}
        >
          <img
            src={Circle}
            alt="Circle"
            className={styles.main_circle_big}
            style={{ transform: getTransform(15, 15) }}
          />
        </span>
        <span
          className={styles.main_square_right}
          style={{ transform: getTransform(-20, -20) }}
        ></span>
        <span
          className={styles.main_square_left}
          style={{ transform: getTransform(10, 10) }}
        >
          <img
            src={Circle}
            alt="Circle"
            className={styles.main_circle_small}
            style={{ transform: getTransform(15, 15) }}
          />
        </span>
      </div>

      <img
        src={MainCar}
        alt="Газель и прицеп"
        className={styles.main_car_img}
      />
    </div>
    <Slider />
    </>
  );
};
