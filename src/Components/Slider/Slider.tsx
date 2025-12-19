import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Thumbs, FreeMode } from "swiper/modules";
import styles from "./Slider.module.css";

// Модальное окно для просмотра изображений
import Modal from "react-modal";

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

// Настройки модального окна
Modal.setAppElement("#root");

const Slider: React.FC<SliderProps> = ({ images }) => {
  const defaultImages: ImageData[] = [
    { id: 1, url: img1, alt: "Тент NEXT 2,06 синий" },
    { id: 2, url: img2, alt: "Тент NEXT синий" },
    { id: 3, url: img3, alt: "Тент АВТОС А25Р 880 Синий" },
    { id: 4, url: img4, alt: "Тент АВТОС а20м 800 синий" },
    { id: 5, url: img5, alt: "Тент АВТОС а25м синий" },
    { id: 6, url: img6, alt: "Тент Белаз синий" },
    { id: 7, url: img7, alt: "Тент Бизнес синий" },
    { id: 8, url: img8, alt: "Тент Бизнес синий" },
    { id: 9, url: img9, alt: "Тент Газель Бизнес 4,25 синий" },
    { id: 10, url: img10, alt: "Тент Газель НО 4,25 синий" },
    { id: 11, url: img11, alt: "Тент Соболь 2,17 синий" },
    { id: 12, url: img12, alt: "Тент ТРЕЙЛЕР 82942Т синий" },
    { id: 13, url: img13, alt: "Тент Трейлер Аэро 8294" },
    { id: 14, url: img14, alt: "Тент УАЗ Фермер НО 3 черный" },
    { id: 15, url: img15, alt: "Тент УАЗ Фермер СО хаки" },
  ];

  const sliderImages = images ?? defaultImages;

  // Состояния для слайдера и модального окна
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
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
      maxWidth: "1200px",
      maxHeight: "90vh",
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
          thumbs={{ swiper: thumbsSwiper }}
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
          ></button>
          <button
            className={styles.autoplayButton}
            onClick={toggleAutoplay}
            aria-label={isPlaying ? "Пауза" : "Воспроизвести"}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button
            className={styles.slider_button_right}
            aria-label="Следующий слайд"
          ></button>
        </div>
      </div>

      {/* Миниатюры для навигации (только не на мобильных) */}
      {!isMobile && (
        <div className={styles.thumbsContainer}>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={8}
            freeMode={true}
            watchSlidesProgress={true}
            className={styles.thumbsSwiper}
            breakpoints={{
              320: {
                slidesPerView: 4,
              },
              480: {
                slidesPerView: 5,
              },
              640: {
                slidesPerView: 6,
              },
              768: {
                slidesPerView: 7,
              },
              1024: {
                slidesPerView: 8,
              },
            }}
          >
            {sliderImages.map((image) => (
              <SwiperSlide
                key={`thumb-${image.id}`}
                className={styles.thumbSlide}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className={styles.thumbImage}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

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
              thumbs={{ swiper: thumbsSwiper }}
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
