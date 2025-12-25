import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Thumbs, FreeMode } from "swiper/modules";
import { FaPlay, FaPause, FaArrowLeft, FaArrowRight  } from "react-icons/fa";
import styles from "./Slider.module.css";

// Модальное окно для просмотра изображений
import Modal from "react-modal";

// Импорты всех 37 изображений согласно скриншоту
import img1 from "./assets/АВТОС A25M h880.webp";
import img2 from "./assets/АВТОС h480.webp";
import img3 from "./assets/АВТОС A25M h880.webp";
import img4 from "./assets/БелАЗ.webp";
import img5 from "./assets/Газель NEXT 2,06м.webp";
import img6 from "./assets/Газель NEXT 2,16м.webp";
import img7 from "./assets/Газель NEXT 4,25м.webp";
import img8 from "./assets/Газель Бизнес 4,25.webp";
import img9 from "./assets/Газель Бизнес 4,25м.webp";
import img10 from "./assets/ГАЗель Бизнес.webp";
import img11 from "./assets/Газель Нового образца.webp";
import img12 from "./assets/Газель Старого образца.webp";
import img13 from "./assets/Гранит 2513-04.webp";
import img14 from "./assets/КМЗ 8136-8284.webp";
import img15 from "./assets/КМЗ В1 7194 h825.webp";
import img16 from "./assets/КМЗ В1 7194.webp";
import img17 from "./assets/Композит Аэро.webp";
import img18 from "./assets/Кремень.webp";
import img19 from "./assets/Крепыш.webp";
import img20 from "./assets/ЛАВ 81011.webp";
import img21 from "./assets/ЛАКЕР.webp";
import img22 from "./assets/МЗСА 817700 h850.webp";
import img23 from "./assets/МЗСА 817700.webp";
import img24 from "./assets/МЗСА 817702.webp";
import img25 from "./assets/МЗСА 817704.webp";
import img26 from "./assets/САЗ.webp";
import img27 from "./assets/Соболь 2,17м.webp";
import img28 from "./assets/Соболь 2,42м.webp";
import img29 from "./assets/титан 2013 h600.webp";
import img30 from "./assets/ТИТАН 2013.webp";
import img31 from "./assets/ТРЕЙЛЕР 82942Т.webp";
import img32 from "./assets/Трейлер Аэро 8294.webp";
import img33 from "./assets/УАЗ 33036.webp";
import img34 from "./assets/УАЗ 39094 Фермер.webp";
import img35 from "./assets/Фермер Бизнес 2,42м.webp";
import img36 from "./assets/Фермер Бизнес 3,17м.webp";
import img37 from "./assets/Фермер Нового образца 2,42м.webp";

interface ImageData {
  id: number;
  url: string;
  alt: string;
}

interface SliderProps {
  images?: ImageData[];
}

// Настройки модального окна
Modal.setAppElement("#root");

const Slider: React.FC<SliderProps> = ({ images }) => {
  const defaultImages: ImageData[] = [
    { id: 1, url: img1, alt: "АВТОС A25M h880" },
    { id: 2, url: img2, alt: "АВТОС h480" },
    { id: 3, url: img3, alt: "АВТОС A25P h880" },
    { id: 4, url: img4, alt: "БелАЗ" },
    { id: 5, url: img5, alt: "Газель NEXT 2,06м" },
    { id: 6, url: img6, alt: "Газель NEXT 2,16м" },
    { id: 7, url: img7, alt: "Газель NEXT 4,25м" },
    { id: 8, url: img8, alt: "Газель Бизнес 4,25" },
    { id: 9, url: img9, alt: "Газель Бизнес 4,25м" },
    { id: 10, url: img10, alt: "ГАЗель Бизнес" },
    { id: 11, url: img11, alt: "Газель Нового образца" },
    { id: 12, url: img12, alt: "Газель Старого образца" },
    { id: 13, url: img13, alt: "Гранит 2513-04" },
    { id: 14, url: img14, alt: "КМЗ 8136-8284" },
    { id: 15, url: img15, alt: "КМЗ В1 7194 h825" },
    { id: 16, url: img16, alt: "КМЗ В1 7194" },
    { id: 17, url: img17, alt: "Композит Аэро" },
    { id: 18, url: img18, alt: "Кремень" },
    { id: 19, url: img19, alt: "Крепыш" },
    { id: 20, url: img20, alt: "ЛАВ 81011" },
    { id: 21, url: img21, alt: "ЛАКЕР" },
    { id: 22, url: img22, alt: "МЭСА 817700 h850" },
    { id: 23, url: img23, alt: "МЭСА 817700" },
    { id: 24, url: img24, alt: "МЭСА 817702" },
    { id: 25, url: img25, alt: "МЭСА 817704" },
    { id: 26, url: img26, alt: "САЗ" },
    { id: 27, url: img27, alt: "Соболь 2,17м" },
    { id: 28, url: img28, alt: "Соболь 2,42м" },
    { id: 29, url: img29, alt: "титан 2013 h600" },
    { id: 30, url: img30, alt: "ТИТАН 2013" },
    { id: 31, url: img31, alt: "ТРЕЙЛЕР 829421" },
    { id: 32, url: img32, alt: "Трейлер Аэро 8294" },
    { id: 33, url: img33, alt: "УАЗ 33036" },
    { id: 34, url: img34, alt: "УАЗ 39094 Фермер" },
    { id: 35, url: img35, alt: "Фермер Бизнес 2,42м" },
    { id: 36, url: img36, alt: "Фермер Бизнес 3,17м" },
    { id: 37, url: img37, alt: "Фермер Нового образца 2,42м" },
  ];

  const sliderImages = images ?? defaultImages;

  // Состояния для слайдера и модального окна
  // const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const mainSwiperRef = useRef<any>(null);
  const modalSwiperRef = useRef<any>(null);

  // Определение мобильного устройства
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Обработчики для модального окна
  const openModal = (index: number) => {
    // Не открываем модалку на мобильных
    if (isMobile) return;

    setSelectedImageIndex(index);
    setIsModalOpen(true);
    setIsPlaying(false);

    if (mainSwiperRef.current?.swiper?.autoplay?.running) {
      mainSwiperRef.current.swiper.autoplay.stop();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsPlaying(true);

    if (mainSwiperRef.current?.swiper?.autoplay) {
      mainSwiperRef.current.swiper.autoplay.start();
    }
  };

  // Переключение автопрокрутки
  const toggleAutoplay = () => {
    if (mainSwiperRef.current?.swiper?.autoplay) {
      if (isPlaying) {
        mainSwiperRef.current.swiper.autoplay.stop();
      } else {
        mainSwiperRef.current.swiper.autoplay.start();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Обработка навигации по клавиатуре
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen || isMobile) return;

      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "ArrowLeft" && modalSwiperRef.current) {
        modalSwiperRef.current.swiper.slidePrev();
      } else if (e.key === "ArrowRight" && modalSwiperRef.current) {
        modalSwiperRef.current.swiper.slideNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, isMobile]);

  // Кастомные стили для модального окна
  const modalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      position: "relative" as const,
      top: "auto",
      left: "auto",
      right: "auto",
      bottom: "auto",
      border: "none",
      background: "transparent",
      padding: 0,
      width: "90%",
      // maxWidth: "1200px",
      maxHeight: "95vh",
      borderRadius: "12px",
      overflow: "hidden",
    },
  };

  return (
    <div id="works" className={styles.sliderContainer}>
      <h2 className={styles.sliderTitle}>Наши работы</h2>
      <p className={styles.sliderSubtitle}>
        Качественные тенты для любого транспорта
      </p>

      {/* Основной слайдер */}
      <div className={styles.mainSliderWrapper}>
        <Swiper
          ref={mainSwiperRef}
          modules={[Autoplay, Navigation, Thumbs, FreeMode]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={800}
          navigation={{
            nextEl: `.${styles.slider_button_right}`,
            prevEl: `.${styles.slider_button_left}`,
          }}
          freeMode={{
            enabled: true,
            momentum: true,
            momentumRatio: 1,
            momentumBounce: false,
          }}
          grabCursor={!isMobile} // Убираем grab cursor на мобильных
          breakpoints={{
            480: {
              slidesPerView: 1.5,
              spaceBetween: 15,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            1600: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
          // thumbs={{ swiper: thumbsSwiper }}
          className={styles.mainSwiper}
        >
          {sliderImages.map((image, index) => (
            <SwiperSlide key={image.id} className={styles.slideItem}>
              <div className={styles.slideCard}>
                <div
                  className={styles.imageWrapper}
                  onClick={() => openModal(index)}
                  style={{ cursor: isMobile ? "default" : "pointer" }}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className={styles.slideImage}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%230d3483"/><text x="200" y="150" font-family="Arial" font-size="20" fill="white" text-anchor="middle" dominant-baseline="middle">Тент</text></svg>`;
                      e.currentTarget.alt = "Изображение временно недоступно";
                    }}
                  />
                  <div className={styles.imageOverlay}>
                    {!isMobile && <span className={styles.zoomIcon}>🔍</span>}
                  </div>
                </div>
                <div className={styles.slideInfo}>
                  <p className={styles.slideText}>{image.alt}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Кнопки управления слайдером */}
        <div className={styles.sliderControls}>
          <button
            className={styles.slider_button_left}
            aria-label="Предыдущий слайд"
          ><FaArrowLeft/></button>
          <button
            className={styles.autoplayButton}
            onClick={toggleAutoplay}
            aria-label={isPlaying ? "Пауза" : "Воспроизвести"}
          >
            {isPlaying ? <FaPause /> : <FaPlay/>}
          </button>
          <button
            className={styles.slider_button_right}
            aria-label="Следующий слайд"
          ><FaArrowRight/></button>
        </div>
      </div>

      {/* Модальное окно для просмотра изображений (только не на мобильных) */}
      {!isMobile && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={modalStyles}
          contentLabel="Просмотр изображения"
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
        >
          <div className={styles.modalContent}>
            <button
              className={styles.closeButton}
              onClick={closeModal}
              aria-label="Закрыть"
            >
              ✕
            </button>

            <Swiper
              ref={modalSwiperRef}
              modules={[Navigation, Thumbs]}
              spaceBetween={0}
              slidesPerView={1}
              initialSlide={selectedImageIndex}
              navigation={{
                nextEl: `.${styles.modalNext}`,
                prevEl: `.${styles.modalPrev}`,
              }}
              // thumbs={{ swiper: thumbsSwiper }}
              className={styles.modalSwiper}
            >
              {sliderImages.map((image) => (
                <SwiperSlide
                  key={`modal-${image.id}`}
                  className={styles.modalSlide}
                >
                  <div className={styles.modalImageWrapper}>
                    <img
                      src={image.url}
                      alt={image.alt}
                      className={styles.modalImage}
                    />
                  </div>
                  <div className={styles.modalCaption}>
                    <p>{image.alt}</p>
                    <span className={styles.imageCounter}>
                      {sliderImages.findIndex((img) => img.id === image.id) + 1}{" "}
                      / {sliderImages.length}
                    </span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              className={styles.modalPrev}
              aria-label="Предыдущее изображение"
            >
              ←
            </button>
            <button
              className={styles.modalNext}
              aria-label="Следующее изображение"
            >
              →
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Slider;
