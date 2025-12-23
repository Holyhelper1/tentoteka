import { useState, useEffect, useRef } from "react";
import styles from "./main.module.css";
// import MainCar from "./assets/main_car.png";
import MainCar from "./assets/main_banner.webp";
import Circle from "./assets/circle-orange.png";
import Slider from "../Slider/Slider";
import Order from "../Order/Order";
import VideoBlock from "../VideoBlock/VideoBlock";
import { InfoBlock } from "../InfoBlock/InfoBlock";

export const Main = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // modal state
  const [orderOpen, setOrderOpen] = useState(false);

  // отдельные рефы: banner button и floating FAB
  const bannerBtnRef = useRef<HTMLButtonElement | null>(null);
  const fabRef = useRef<HTMLButtonElement | null>(null);

  // показывать FAB только после секции "Наши работы"
  const [showFab, setShowFab] = useState(false);

  // ----- attention animation for banner button (one-time subtle) -----
  useEffect(() => {
    const node = bannerBtnRef.current;
    if (!node) return;

    let removeTimeout: number | undefined;
    const ANIM_DURATION = 900;

    const runOnce = () => {
      node.classList.add(styles.attention);
      removeTimeout = window.setTimeout(() => node.classList.remove(styles.attention), ANIM_DURATION);
    };

    // запускаем чуть позже, чтобы пользователь успел увидеть баннер
    const t = window.setTimeout(runOnce, 900);

    return () => {
      window.clearTimeout(t);
      if (removeTimeout) window.clearTimeout(removeTimeout);
    };
  }, []); // монтирование

  // ----- attention animation for FAB (only when visible) -----
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

  // show FAB when #works intersects viewport
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
        // если секция ещё не на странице — скрываем кнопку
        setShowFab(false);
        ticking = false;
        return;
      }

      const rect = target.getBoundingClientRect();
      // триггер — когда верх секции приблизился в пределах 80% высоты вьюпорта
      const TRIGGER_RATIO = 0.8;
      const trigger = rect.top <= window.innerHeight * TRIGGER_RATIO;

      // Показываем ТОЛЬКО при прокрутке вниз и когда триггер достигнут
      if (trigger && isScrollingDown) {
        setShowFab(true);
      } else {
        // скрываем, если условие не выполнено (например, поднялись вверх выше секции)
        setShowFab(false);
      }

      ticking = false;
    });
  };

  // Вешаем слушатели
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  // вызовем один раз при монтировании (на случай, если пользователь уже внизу)
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
          <ul className={styles.main_list}>
            <li>Собственное производство тентов</li>
            <li>Тенты служат 5+ лет</li>
            <li>Простая установка</li>
            <li>Подбор за 1 минуту</li>
            <li>Быстрая доставка по РФ</li>
          </ul>

          {/* Баннерная кнопка (видна всегда в баннере) */}
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

        <img src={MainCar} alt="Газель и прицеп" className={styles.main_car_img} />
      </div>

      <Slider />
      <VideoBlock/>
      <InfoBlock/>

      {/* Плавающая FAB — появляется только после скролла к #works */}
      <button
        ref={fabRef}
        className={`${styles.fabOrder} ${showFab ? styles.visible : styles.hidden}`}
        onClick={openOrder}
        aria-label="Открыть окно заказа"
        aria-hidden={!showFab}
        style={{ pointerEvents: showFab ? "auto" : "none" }}
      >
        Заказать тент
      </button>

      {/* Модалка */}
      {orderOpen && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true" onClick={closeOrder}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <Order onClose={closeOrder} />
          </div>
        </div>
      )}
    </>
  );
};



// import { useState, useEffect, useRef } from "react";
// import styles from "./main.module.css";
// import MainCar from "./assets/main_car.png";
// import Circle from "./assets/circle-orange.png";
// import Slider from "../Slider/Slider";
// import Order from "../Order/Order";

// export const Main = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const containerRef = useRef<HTMLDivElement>(null);

//   // modal state
//   const [orderOpen, setOrderOpen] = useState(false);

//   // реф на кнопку
//   const fabRef = useRef<HTMLButtonElement | null>(null);

//   useEffect(() => {
//     const node = fabRef.current;
//     if (!node) return;

//     let intervalId: number | undefined;
//     let removeTimeoutId: number | undefined;
//     let initTimeout: number | undefined;

//     const ANIM_DURATION = 900; // ms — должен совпадать с длительностью анимации в CSS
//     const INTERVAL = 6000; // ms — как часто "подпрыгивать"

//     const runAnim = () => {
//       // добавляем класс — CSS анимация сработает
//       node.classList.add(styles.attention);
//       // через ANIM_DURATION удаляем класс, чтобы можно было запустить заново
//       removeTimeoutId = window.setTimeout(() => {
//         node.classList.remove(styles.attention);
//       }, ANIM_DURATION);
//     };

//     // Запустить один раз после небольшой задержки, чтобы пользователь увидел призыв
//     initTimeout = window.setTimeout(runAnim, 1200);

//     // Запустить периодически
//     intervalId = window.setInterval(runAnim, INTERVAL);

//     // Немного интерактива: при наведении запускать анимацию сразу
//     const onEnter = () => runAnim();
//     node.addEventListener("mouseenter", onEnter);

//     return () => {
//       if (intervalId) window.clearInterval(intervalId);
//       if (removeTimeoutId) window.clearTimeout(removeTimeoutId);
//       if (initTimeout) window.clearTimeout(initTimeout);
//       node.removeEventListener("mouseenter", onEnter);
//     };
//   }, []); // пустой deps — монтируем один раз

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       if (!containerRef.current) return;

//       const container = containerRef.current;
//       const rect = container.getBoundingClientRect();

//       const centerX = rect.left + rect.width / 2;
//       const centerY = rect.top + rect.height / 2;

//       const x = (e.clientX - centerX) / (rect.width / 2);
//       const y = (e.clientY - centerY) / (rect.height / 2);

//       setMousePosition({ x, y });
//     };

//     let animationFrameId: number;
//     const throttledMouseMove = (e: MouseEvent) => {
//       if (animationFrameId) {
//         cancelAnimationFrame(animationFrameId);
//       }
//       animationFrameId = requestAnimationFrame(() => handleMouseMove(e));
//     };

//     window.addEventListener("mousemove", throttledMouseMove);

//     return () => {
//       window.removeEventListener("mousemove", throttledMouseMove);
//       if (animationFrameId) {
//         cancelAnimationFrame(animationFrameId);
//       }
//     };
//   }, []);

//   const getTransform = (xMultiplier: number, yMultiplier: number) => {
//     const moveX = mousePosition.x * xMultiplier;
//     const moveY = mousePosition.y * yMultiplier;
//     return `translate(${moveX}px, ${moveY}px)`;
//   };

//   // const openOrder = () => setOrderOpen(true);
//   const closeOrder = () => setOrderOpen(false);

//   return (
//     <>
//       <div className={styles.main_container} ref={containerRef}>
//         <div className={styles.main_text_container}>
//           <h1 className={styles.main_title}>Тентотека</h1>
//           <ul className={styles.main_list}>
//             <li>Собственное производство тентов</li>
//             <li>Тенты служат 5+ лет</li>
//             <li>Простая установка</li>
//             <li>Подбор за 1 минуту</li>
//             <li>Быстрая доставка по РФ</li>
//           </ul>
//         <button
//         ref={fabRef}
//         className={styles.baner_order}
//         onClick={() => setOrderOpen(true)}
//         aria-label="Открыть окно заказа"
//       >
//         Заказать тент
//       </button>
//         </div>

//         <div>
//           <span
//             className={styles.main_square_top}
//             style={{ transform: getTransform(15, 15) }}
//           >
//             <img
//               src={Circle}
//               alt="Circle"
//               className={styles.main_circle_big}
//               style={{ transform: getTransform(15, 15) }}
//             />
//           </span>
//           <span
//             className={styles.main_square_right}
//             style={{ transform: getTransform(-20, -20) }}
//           ></span>
//           <span
//             className={styles.main_square_left}
//             style={{ transform: getTransform(10, 10) }}
//           >
//             <img
//               src={Circle}
//               alt="Circle"
//               className={styles.main_circle_small}
//               style={{ transform: getTransform(15, 15) }}
//             />
//           </span>
//         </div>

//         <img
//           src={MainCar}
//           alt="Газель и прицеп"
//           className={styles.main_car_img}
//         />
//       </div>

//       <Slider />

//       {/* Фиксированная кнопка заказа (уровень Main) */}
//        <button
//         ref={fabRef}
//         className={styles.fabOrder}
//         onClick={() => setOrderOpen(true)}
//         aria-label="Открыть окно заказа"
//       >
//         Заказать тент
//       </button>

//       {/* Модалка */}
//       {orderOpen && (
//         <div
//           className={styles.modalOverlay}
//           role="dialog"
//           aria-modal="true"
//           onClick={closeOrder}
//         >
//           <div
//             className={styles.modalContent}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <Order onClose={closeOrder} />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
