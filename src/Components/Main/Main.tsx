import { useState, useEffect, useRef } from "react";
import styles from "./main.module.css";
import MainCar from "./assets/main_banner.webp";
import Circle from "./assets/circle-orange.png";
import Slider from "../Slider/Slider";
import Order from "../Order/Order";
import VideoBlock from "../VideoBlock/VideoBlock";
import { InfoBlock } from "../InfoBlock/InfoBlock";
import { GiSewingMachine } from "react-icons/gi";
import ShippingCar from "./assets/icons/shipping-icon.png";
import MainVideo from "./assets/video/Main-video.mp4";
export const Main = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // modal state
  const [orderOpen, setOrderOpen] = useState(false);
  const bannerBtnRef = useRef<HTMLButtonElement | null>(null);
  const fabRef = useRef<HTMLButtonElement | null>(null);

  const [showFab, setShowFab] = useState(false);

  useEffect(() => {
    const node = bannerBtnRef.current;
    if (!node) return;

    let removeTimeout: number | undefined;
    const ANIM_DURATION = 900;

    const runOnce = () => {
      node.classList.add(styles.attention);
      removeTimeout = window.setTimeout(
        () => node.classList.remove(styles.attention),
        ANIM_DURATION
      );
    };

    const t = window.setTimeout(runOnce, 900);

    return () => {
      window.clearTimeout(t);
      if (removeTimeout) window.clearTimeout(removeTimeout);
    };
  }, []);

  useEffect(() => {
    const node = fabRef.current;
    if (!node) return;

    let intervalId: number | undefined;
    let removeTimeoutId: number | undefined;
    let initTimeout: number | undefined;

    const ANIM_DURATION = 900;
    const INTERVAL = 6000;

    const runAnim = () => {
      node.classList.add(styles.attention);
      removeTimeoutId = window.setTimeout(() => {
        node.classList.remove(styles.attention);
      }, ANIM_DURATION);
    };

    if (showFab) {
      initTimeout = window.setTimeout(runAnim, 1200);
      intervalId = window.setInterval(runAnim, INTERVAL);
      node.addEventListener("mouseenter", runAnim);
    }

    return () => {
      if (intervalId) window.clearInterval(intervalId);
      if (removeTimeoutId) window.clearTimeout(removeTimeoutId);
      if (initTimeout) window.clearTimeout(initTimeout);
      node.removeEventListener("mouseenter", runAnim);
    };
  }, [showFab]);

  // ----- parallax mouse -----
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

  useEffect(() => {
    let ticking = false;
    let lastY = window.scrollY || 0;

    const getTarget = () => document.querySelector("#works") as Element | null;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const currentY = window.scrollY || 0;
        const isScrollingDown = currentY > lastY;
        lastY = currentY;

        const target = getTarget();
        if (!target) {
          setShowFab(false);
          ticking = false;
          return;
        }

        const rect = target.getBoundingClientRect();
        const TRIGGER_RATIO = 0.8;
        const trigger = rect.top <= window.innerHeight * TRIGGER_RATIO;

        if (trigger && isScrollingDown) {
          setShowFab(true);
        } else {
          setShowFab(false);
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const openOrder = () => setOrderOpen(true);
  const closeOrder = () => setOrderOpen(false);

  return (
    <>
      <div className={styles.main_container} ref={containerRef}>
        <div className={styles.main_text_container}>
          <h1 className={styles.main_title}>Тентотека</h1>
          
          {/* семантический блок для роботов */}
          <h2 className="visually-hidden">Ключевые услуги: тенты на Газель, тенты на прицеп, чехлы, ремонт тентов</h2>

          <h2 className={styles.main_subtitle}>Качество в каждом шве</h2>

          <p className={styles.main_utp_text}>
            <GiSewingMachine className={styles.icon_adaptive} />
            Своё производство
          </p>

          <p className={styles.main_utp_text}>
            <img
              src={ShippingCar}
              className={styles.icon_adaptive}
              alt="Доставка"
            />
            Быстрая доставка
          </p>

          {/* Баннерная кнопка */}
          <button
            ref={bannerBtnRef}
            className={styles.baner_order}
            onClick={openOrder}
            aria-label="Заказать (баннер)"
          >
            Заказать тент
          </button>
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
      <VideoBlock 
        videoType="local"
        localSrc={MainVideo}
        title="Наше производство"
        description="Посмотрите, как мы создаём качественные тенты для вашего транспорта"
        loop={true}
      />
      <InfoBlock />
      <button
        ref={fabRef}
        className={`${styles.fabOrder} ${
          showFab ? styles.visible : styles.hidden
        }`}
        onClick={openOrder}
        aria-label="Открыть окно заказа"
        aria-hidden={!showFab}
        style={{ pointerEvents: showFab ? "auto" : "none" }}
      >
        Заказать тент
      </button>

      {/* Модалка */}
      {orderOpen && (
        <div
          className={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          onClick={closeOrder}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <Order onClose={closeOrder} />
          </div>
        </div>
      )}
    </>
  );
};
