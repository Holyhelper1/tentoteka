import React from "react";
import styles from "./InfoBlock.module.css";
import { useIntersectionObserver } from "../../Hooks/useIntersectionObserver";
import Gazel from "./icons/gazel.webp";
import Pricep from "./icons/pricep.webp";
import UAZ from "./icons/uaz.webp";
import Batman from "./icons/batman.webp";

export const InfoBlock = () => {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  });

  const blocks = [
    {
      title: "Твоя ГАЗель будет самая красивая на районе",
      icon: Gazel,
      color: "#86afee",
    },
    {
      title: "Тент - который будет передаваться по наследству",
      icon: Pricep,
      color: "#1a5fb4",
    },
    {
      title: "Джипы будут завидовать Вашему УАЗу",
      icon: UAZ,
      color: "#28a745",
    },
    {
      title: "Даже Бэтмен заказывал свой плащ у нас",
      icon: Batman,
      color: "#e65206",
    },
  ];

  return (
    <div className={styles.info_Block_container} ref={elementRef}>
      <div className={styles.infoGrid}>
        {blocks.map((block, index) => (
          <div
            key={index}
            className={`${styles.infoItem} ${isVisible ? styles.fadeIn : ""}`}
            style={
              {
                animationDelay: isVisible ? `${index * 0.1}s` : "0s",
                "--icon-color": block.color,
              } as React.CSSProperties
            }
          >
            <div className={styles.iconWrapper}>
              <div
                className={styles.iconCircle}
                style={{ backgroundColor: `${block.color}15` }}
              >
                <img src={block.icon} alt={block.icon} width={"100%"} />
              </div>
            </div>
            <h3 className={styles.infoTitle}>{block.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
