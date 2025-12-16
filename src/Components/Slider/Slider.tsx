// import { useRef } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Navigation } from 'swiper/modules';
// // import 'swiper/swiper-bundle.css';
// // import 'swiper/css/navigation';
// import styles from './Slider.module.css';

// import img1 from "./assets/NEXT 2,06 синий 1 (600гр)-Photoroom.png";
// import img2 from "./assets/NEXT синий 1 (600гр)-Photoroom (1).png";
// import img3 from "./assets/АВТОС А25Р 880 Синий - 1 (600гр)-Photoroom.png";
// import img4 from "./assets/АВТОС а20м 800 синий 1 (550гр)-Photoroom.png";
// import img5 from "./assets/АВТОС а25м (480)  синий 2-Photoroom.png";
// import img6 from "./assets/Белаз синий - 1 (600гр)-Photoroom.png";
// import img7 from "./assets/Бизнес синий 3 -Photoroom.png";
// import img8 from "./assets/Бизнес синий 4-Photoroom.png";
// import img9 from "./assets/Газель Бизнес 4,25 синий 4-Photoroom.png";
// import img10 from "./assets/Газель НО 4,25 синий 4-Photoroom.png";
// import img11 from "./assets/Соболь 2,17 синий 2-Photoroom.png";
// import img12 from "./assets/ТРЕЙЛЕР 82942Т синий - 2-Photoroom.png";
// import img13 from "./assets/Трейлер Аэро 8294 - 2-Photoroom.png";
// import img14 from "./assets/УАЗ Фермер НО 3 черный-Photoroom.png";
// import img15 from "./assets/УАЗ Фермер СО хаки 600гр 1-Photoroom.png";

// // Типы для изображений
// interface ImageData {
//   id: number;
//   url: string;
//   alt: string;
// }

// interface SliderProps {
//   images?: ImageData[];
// }

// const Slider = ({ images }: SliderProps) => {
//   // Массив изображений по умолчанию
//   const defaultImages: ImageData[] = [
//     { id: 1, url: img1, alt: 'Тент NEXT 2,06 синий' },
//     { id: 2, url: img2, alt: 'Тент NEXT синий' },
//     { id: 3, url: img3, alt: 'Тент АВТОС А25Р 880 Синий' },
//     { id: 4, url: img4, alt: 'Тент АВТОС а20м 800 синий' },
//     { id: 5, url: img5, alt: 'Тент АВТОС а25м синий' },
//     { id: 6, url: img6, alt: 'Тент Белаз синий' },
//     { id: 7, url: img7, alt: 'Тент Бизнес синий' },
//     { id: 8, url: img8, alt: 'Тент Бизнес синий' },
//     { id: 9, url: img9, alt: 'Тент Газель Бизнес 4,25 синий' },
//     { id: 10, url: img10, alt: 'Тент Газель НО 4,25 синий' },
//     { id: 11, url: img11, alt: 'Тент Соболь 2,17 синий' },
//     { id: 12, url: img12, alt: 'Тент ТРЕЙЛЕР 82942Т синий' },
//     { id: 13, url: img13, alt: 'Тент Трейлер Аэро 8294' },
//     { id: 14, url: img14, alt: 'Тент УАЗ Фермер НО 3 черный' },
//     { id: 15, url: img15, alt: 'Тент УАЗ Фермер СО хаки' },
//   ];

//   const sliderImages = images || defaultImages;
//   const swiperRef = useRef<any>(null);

//   const handleSlideClick = (index: number) => {
//     console.log('Слайд кликнут:', index);
//   };

//   return (
//     <div className={styles.sliderContainer}>
//       <h2 className={styles.sliderTitle}>Наши работы</h2>
//       <p className={styles.sliderSubtitle}>
//         Качественные тенты для любого транспорта
//       </p>
      
//       <Swiper
//         ref={swiperRef}
//         modules={[Autoplay, Navigation]}
//         spaceBetween={30}
//         slidesPerView={1}
//         loop={true}
//         autoplay={{
//           delay: 3000,
//           disableOnInteraction: false,
//           pauseOnMouseEnter: true,
//         }}
//         speed={1000}
//         centeredSlides={true}
//         breakpoints={{
//           640: {
//             slidesPerView: 2,
//             spaceBetween: 20,
//           },
//           768: {
//             slidesPerView: 3,
//             spaceBetween: 25,
//           },
//           1024: {
//             slidesPerView: 4,
//             spaceBetween: 30,
//           },
//           1280: {
//             slidesPerView: 5,
//             spaceBetween: 30,
//           },
//         }}
//         className={styles.swiper}
//       >
//         {sliderImages.map((image) => (
//           <SwiperSlide key={image.id} className={styles.swiperSlide}>
//             <div 
//               className={styles.slideContent}
//               onClick={() => handleSlideClick(image.id)}
//             >
//               <div className={styles.imageWrapper}>
//                 <img
//                   src={image.url}
//                   alt={image.alt}
//                   className={styles.slideImage}
//                   loading="lazy"
//                   onError={(e) => {
//                     e.currentTarget.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%230d3483"/><text x="200" y="150" font-family="Arial" font-size="20" fill="white" text-anchor="middle" dominant-baseline="middle">Тент</text></svg>`;
//                     e.currentTarget.alt = 'Изображение временно недоступно';
//                   }}
//                 />
//                 <div className={styles.imageOverlay} />
//               </div>
//               <div className={styles.slideInfo}>
//                 <p className={styles.slideText}>{image.alt}</p>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* Индикаторы прогресса */}
//       <div className={styles.sliderProgress}>
//         {/* <div className={styles.progressBar}>
//           <div className={styles.progressFill}></div>
//         </div> */}
//         <div className={styles.sliderControls}>
//           <button 
//             className={styles.controlButton}
//             onClick={() => swiperRef.current?.swiper.slidePrev()}
//             aria-label="Предыдущий слайд"
//           >
//             ←
//           </button>
//           <button 
//             className={styles.controlButton}
//             onClick={() => swiperRef.current?.swiper.slideNext()}
//             aria-label="Следующий слайд"
//           >
//             →
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Slider;







// import { useRef } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Navigation } from 'swiper/modules';
// import styles from './Slider.module.css';

// import img1 from "./assets/NEXT 2,06 синий 1 (600гр)-Photoroom.png";
// import img2 from "./assets/NEXT синий 1 (600гр)-Photoroom (1).png";
// import img3 from "./assets/АВТОС А25Р 880 Синий - 1 (600гр)-Photoroom.png";
// import img4 from "./assets/АВТОС а20м 800 синий 1 (550гр)-Photoroom.png";
// import img5 from "./assets/АВТОС а25м (480)  синий 2-Photoroom.png";
// import img6 from "./assets/Белаз синий - 1 (600гр)-Photoroom.png";
// import img7 from "./assets/Бизнес синий 3 -Photoroom.png";
// import img8 from "./assets/Бизнес синий 4-Photoroom.png";
// import img9 from "./assets/Газель Бизнес 4,25 синий 4-Photoroom.png";
// import img10 from "./assets/Газель НО 4,25 синий 4-Photoroom.png";
// import img11 from "./assets/Соболь 2,17 синий 2-Photoroom.png";
// import img12 from "./assets/ТРЕЙЛЕР 82942Т синий - 2-Photoroom.png";
// import img13 from "./assets/Трейлер Аэро 8294 - 2-Photoroom.png";
// import img14 from "./assets/УАЗ Фермер НО 3 черный-Photoroom.png";
// import img15 from "./assets/УАЗ Фермер СО хаки 600гр 1-Photoroom.png";

// // Типы для изображений
// interface ImageData {
//   id: number;
//   url: string;
//   alt: string;
// }

// interface SliderProps {
//   images?: ImageData[];
// }

// const Slider = ({ images }: SliderProps) => {
//   // Массив изображений по умолчанию
//   const defaultImages: ImageData[] = [
//     { id: 1, url: img1, alt: 'Тент NEXT 2,06 синий' },
//     { id: 2, url: img2, alt: 'Тент NEXT синий' },
//     { id: 3, url: img3, alt: 'Тент АВТОС А25Р 880 Синий' },
//     { id: 4, url: img4, alt: 'Тент АВТОС а20м 800 синий' },
//     { id: 5, url: img5, alt: 'Тент АВТОС а25м синий' },
//     { id: 6, url: img6, alt: 'Тент Белаз синий' },
//     { id: 7, url: img7, alt: 'Тент Бизнес синий' },
//     { id: 8, url: img8, alt: 'Тент Бизнес синий' },
//     { id: 9, url: img9, alt: 'Тент Газель Бизнес 4,25 синий' },
//     { id: 10, url: img10, alt: 'Тент Газель НО 4,25 синий' },
//     { id: 11, url: img11, alt: 'Тент Соболь 2,17 синий' },
//     { id: 12, url: img12, alt: 'Тент ТРЕЙЛЕР 82942Т синий' },
//     { id: 13, url: img13, alt: 'Тент Трейлер Аэро 8294' },
//     { id: 14, url: img14, alt: 'Тент УАЗ Фермер НО 3 черный' },
//     { id: 15, url: img15, alt: 'Тент УАЗ Фермер СО хаки' },
//   ];

//   const sliderImages = images || defaultImages;
//   const swiperRef = useRef<any>(null);

//   return (
//     <div className={styles.sliderContainer}>
//       <h2 className={styles.sliderTitle}>Наши работы</h2>
//       <p className={styles.sliderSubtitle}>
//         Качественные тенты для любого транспорта
//       </p>
      
//       <Swiper
//         ref={swiperRef}
//         modules={[Autoplay, Navigation]}
//         spaceBetween={30}
//         slidesPerView={2}
//         loop={true}
//         // Непрерывная автопрокрутка без пауз
//         autoplay={{
//           delay: 3000, // 0 - мгновенное начало следующего слайда
//           disableOnInteraction: false, // не отключать при взаимодействии
//           pauseOnMouseEnter: true, // пауза только при наведении
//           waitForTransition: true, // не ждать завершения перехода
//         }}
//         speed={1000} 
//         centeredSlides={true}
//         freeMode={{
//           enabled: true,
//           momentum: true,
//           momentumRatio: 1,
//           momentumBounce: false,
//           minimumVelocity: 0.02,
//         }}
//         breakpoints={{
//           640: {
//             slidesPerView: 2,
//             spaceBetween: 10,
//           },
//           768: {
//             slidesPerView: 1,
//             spaceBetween: 25,
//           },
//           1024: {
//             slidesPerView: 2,
//             spaceBetween: 30,
//           },
//           1280: {
//             slidesPerView: 3,
//             spaceBetween: 30,
//           },
//         }}
//         className={styles.swiper}
//       >
//         {sliderImages.map((image) => (
//           <SwiperSlide key={image.id} className={styles.swiperSlide}>
//             <div className={styles.slideContent}>
//               <div className={styles.imageWrapper}>
//                 <img
//                   src={image.url}
//                   alt={image.alt}
//                   className={styles.slideImage}
//                   loading="lazy"
//                   onError={(e) => {
//                     e.currentTarget.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%230d3483"/><text x="200" y="150" font-family="Arial" font-size="20" fill="white" text-anchor="middle" dominant-baseline="middle">Тент</text></svg>`;
//                     e.currentTarget.alt = 'Изображение временно недоступно';
//                   }}
//                 />
//                 <div className={styles.imageOverlay} />
//               </div>
//               <div className={styles.slideInfo}>
//                 <p className={styles.slideText}>{image.alt}</p>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       <div className={styles.sliderControls}>
//         <button 
//           className={styles.controlButton}
//           onClick={() => swiperRef.current?.swiper.slidePrev()}
//           aria-label="Предыдущий слайд"
//         >
//           ←
//         </button>
//         <button 
//           className={styles.controlButton}
//           onClick={() => swiperRef.current?.swiper.slideNext()}
//           aria-label="Следующий слайд"
//         >
//           →
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Slider;




import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './Slider.module.css';

import img1 from "./assets/NEXT 2,06 синий 1 (600гр)-Photoroom.png";
import img2 from "./assets/NEXT синий 1 (600гр)-Photoroom (1).png";
import img3 from "./assets/АВТОС А25Р 880 Синий - 1 (600гр)-Photoroom.png";
import img4 from "./assets/АВТОС а20м 800 синий 1 (550гр)-Photoroom.png";
import img5 from "./assets/АВТОС а25м (480)  синий 2-Photoroom.png";
import img6 from "./assets/Белаз синий - 1 (600гр)-Photoroom.png";
import img7 from "./assets/Бизнес синий 3 -Photoroom.png";
import img8 from "./assets/Бизнес синий 4-Photoroom.png";
import img9 from "./assets/Газель Бизнес 4,25 синий 4-Photoroom.png";
import img10 from "./assets/Газель НО 4,25 синий 4-Photoroom.png";
import img11 from "./assets/Соболь 2,17 синий 2-Photoroom.png";
import img12 from "./assets/ТРЕЙЛЕР 82942Т синий - 2-Photoroom.png";
import img13 from "./assets/Трейлер Аэро 8294 - 2-Photoroom.png";
import img14 from "./assets/УАЗ Фермер НО 3 черный-Photoroom.png";
import img15 from "./assets/УАЗ Фермер СО хаки 600гр 1-Photoroom.png";

interface ImageData {
  id: number;
  url: string;
  alt: string;
}

interface SliderProps {
  images?: ImageData[];
}

const Slider: React.FC<SliderProps> = ({ images }) => {
  const defaultImages: ImageData[] = [
    { id: 1, url: img1, alt: 'Тент NEXT 2,06 синий' },
    { id: 2, url: img2, alt: 'Тент NEXT синий' },
    { id: 3, url: img3, alt: 'Тент АВТОС А25Р 880 Синий' },
    { id: 4, url: img4, alt: 'Тент АВТОС а20м 800 синий' },
    { id: 5, url: img5, alt: 'Тент АВТОС а25м синий' },
    { id: 6, url: img6, alt: 'Тент Белаз синий' },
    { id: 7, url: img7, alt: 'Тент Бизнес синий' },
    { id: 8, url: img8, alt: 'Тент Бизнес синий' },
    { id: 9, url: img9, alt: 'Тент Газель Бизнес 4,25 синий' },
    { id: 10, url: img10, alt: 'Тент Газель НО 4,25 синий' },
    { id: 11, url: img11, alt: 'Тент Соболь 2,17 синий' },
    { id: 12, url: img12, alt: 'Тент ТРЕЙЛЕР 82942Т синий' },
    { id: 13, url: img13, alt: 'Тент Трейлер Аэро 8294' },
    { id: 14, url: img14, alt: 'Тент УАЗ Фермер НО 3 черный' },
    { id: 15, url: img15, alt: 'Тент УАЗ Фермер СО хаки' },
  ];

  const sliderImages = images ?? defaultImages;

  // Храним ссылку на реальный .swiper-wrapper (в DOM, генерируемый Swiper)
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const retryRef = useRef<number>(0);

  useEffect(() => {
    // Пытаемся найти .swiper-wrapper внутри нашего Swiper (styles.swiper — hashed class)
    const findWrapper = () => {
      const q = document.querySelector(`.${styles.swiper} .swiper-wrapper`) as HTMLDivElement | null;
      if (q) {
        wrapperRef.current = q;
        wrapperRef.current.style.animationPlayState = 'running';
      } else if (retryRef.current < 8) {
        retryRef.current += 1;
        setTimeout(findWrapper, 100); // небольшая задержка, пока Swiper рендерит
      } else {
        // не нашли — ничего страшного, но hover-пауза тогда может не работать JS-ом
      }
    };

    findWrapper();

    return () => {
      retryRef.current = 0;
    };
  }, []);

  // pause/resume handlers (desktop hover + touch)
  const handlePointerEnter = () => {
    if (wrapperRef.current) wrapperRef.current.style.animationPlayState = 'paused';
  };
  const handlePointerLeave = () => {
    if (wrapperRef.current) wrapperRef.current.style.animationPlayState = 'running';
  };

  return (
    <div className={styles.sliderContainer}>
      <h2 className={styles.sliderTitle}>Наши работы</h2>
      <p className={styles.sliderSubtitle}>
        Качественные тенты для любого транспорта
      </p>

      <div
        className={styles.marquee}
        onMouseEnter={handlePointerEnter}
        onMouseLeave={handlePointerLeave}
        onTouchStart={handlePointerEnter}
        onTouchEnd={handlePointerLeave}
      >
        <Swiper
          slidesPerView="auto"
          spaceBetween={30}
          loop={false} 
          allowTouchMove={false}
          className={styles.swiper}
        >
          
          {[...sliderImages, ...sliderImages].map((image, idx) => (
            <SwiperSlide key={`${image.id}-${idx}`} className={styles.slideItem}>
              <div className={styles.slideCard}>
                <div className={styles.imageWrapper}>
                  <img
                    src={image.url}
                    alt={image.alt}
                    className={styles.slideImage}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%230d3483"/><text x="200" y="150" font-family="Arial" font-size="20" fill="white" text-anchor="middle" dominant-baseline="middle">Тент</text></svg>`;
                      e.currentTarget.alt = 'Изображение временно недоступно';
                    }}
                  />
                  <div className={styles.imageOverlay} />
                </div>

                <div className={styles.slideInfo}>
                  <p className={styles.slideText}>{image.alt}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
