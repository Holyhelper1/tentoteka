import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Thumbs, FreeMode } from "swiper/modules";
import { FaPlay, FaPause, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { TbZoomInArea } from "react-icons/tb";
import Modal from "react-modal";
import styles from "./Slider.module.css";
import { fetchSlides, type WPImage } from "../../api/wp";

Modal.setAppElement("#root");

interface SliderProps {
  images?: WPImage[];
}

const Slider: React.FC<SliderProps> = ({ images }) => {
  const [slides, setSlides] = useState<WPImage[]>(images ?? []);
  const [loading, setLoading] = useState<boolean>(!images);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const mainSwiperRef = useRef<any>(null);
  const modalSwiperRef = useRef<any>(null);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    if (images) return;
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const data = await fetchSlides();
        if (!mounted) return;
        setSlides(data);
      } catch (e: any) {
        console.error(e);
        if (!mounted) return;
        setError(e.message || "Ошибка загрузки слайдов");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [images]);

  const openModal = (index: number) => {
    if (isMobile) return;
    setSelectedImageIndex(index);
    setIsModalOpen(true);
    setIsPlaying(false);
    if (mainSwiperRef.current?.swiper?.autoplay?.running)
      mainSwiperRef.current.swiper.autoplay.stop();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsPlaying(true);
    if (mainSwiperRef.current?.swiper?.autoplay?.start)
      mainSwiperRef.current.swiper.autoplay.start();
  };

  const toggleAutoplay = () => {
    if (!mainSwiperRef.current?.swiper?.autoplay) return;
    if (isPlaying) mainSwiperRef.current.swiper.autoplay.stop();
    else mainSwiperRef.current.swiper.autoplay.start();
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isModalOpen || isMobile) return;
      if (e.key === "Escape") closeModal();
      else if (e.key === "ArrowLeft" && modalSwiperRef.current)
        modalSwiperRef.current.swiper.slidePrev();
      else if (e.key === "ArrowRight" && modalSwiperRef.current)
        modalSwiperRef.current.swiper.slideNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isModalOpen, isMobile]);

  if (loading) {
    return (
      <div id="works" className={styles.sliderContainer}>
        <h2 className={styles.sliderTitle}>Наши работы</h2>
        <p className={styles.sliderSubtitle}>
          Качественные тенты для любого транспорта
        </p>

        <div className={styles.loaderContainer}>
          <div className={styles.spinner}>
            <div className={styles.spinnerRing}></div>
            <div className={styles.spinnerRing}></div>
            <div className={styles.spinnerRing}></div>
            <div className={styles.spinnerRing}></div>
          </div>
          <p className={styles.loaderText}>Идёт загрузка...</p>
          <div className={styles.loaderProgress}>
            <div className={styles.loaderProgressBar}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error)
    return <div className={styles.errorContainer}>Ошибка: {error}</div>;
  if (!slides.length)
    return (
      <div className={styles.emptyContainer}>Нет слайдов для отображения</div>
    );

  return (
    <div id="works" className={styles.sliderContainer}>
      <h2 className={styles.sliderTitle}>Наши работы</h2>
      <p className={styles.sliderSubtitle}>
        Качественные тенты для любого транспорта
      </p>

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
          grabCursor={!isMobile}
          breakpoints={{
            480: { slidesPerView: 1.5, spaceBetween: 15 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 2.5, spaceBetween: 25 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
            1280: { slidesPerView: 4, spaceBetween: 30 },
            1600: { slidesPerView: 5, spaceBetween: 30 },
          }}
          className={styles.mainSwiper}
        >
          {slides.map((image, index) => (
            <SwiperSlide key={image.id} className={styles.slideItem}>
              <div className={styles.slideCard}>
                <div
                  className={styles.imageWrapper}
                  onClick={() => openModal(index)}
                  style={{ cursor: isMobile ? "default" : "pointer" }}
                >
                  <img
                    src={image.url}
                    alt={image.alt ?? image.caption ?? `slide-${image.id}`}
                    className={styles.slideImage}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%230d3483"/><text x="200" y="150" font-family="Arial" font-size="20" fill="white" text-anchor="middle" dominant-baseline="middle">Тент</text></svg>`;
                      e.currentTarget.alt = "Изображение временно недоступно";
                    }}
                  />
                  <div className={styles.imageOverlay}>
                    {!isMobile && (
                      <span className={styles.zoomIcon}>
                        <TbZoomInArea />
                      </span>
                    )}
                  </div>
                </div>
                <div className={styles.slideInfo}>
                  <p className={styles.slideText}>
                    {image.caption || image.alt}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={styles.sliderControls}>
          <button
            className={styles.slider_button_left}
            aria-label="Предыдущий слайд"
          >
            <FaArrowLeft />
          </button>
          <button
            className={styles.autoplayButton}
            onClick={toggleAutoplay}
            aria-label={isPlaying ? "Пауза" : "Воспроизвести"}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button
            className={styles.slider_button_right}
            aria-label="Следующий слайд"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      {!isMobile && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            content: {
              position: "relative",
              border: "none",
              background: "transparent",
              padding: 0,
              width: "90%",
              maxHeight: "95vh",
              borderRadius: "12px",
              overflow: "hidden",
            },
          }}
          contentLabel="Просмотр изображения"
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
              className={styles.modalSwiper}
            >
              {slides.map((image) => (
                <SwiperSlide
                  key={`modal-${image.id}`}
                  className={styles.modalSlide}
                >
                  <div className={styles.modalImageWrapper}>
                    <img
                      src={image.url}
                      alt={image.alt ?? image.caption}
                      className={styles.modalImage}
                    />
                  </div>
                  <div className={styles.modalCaption}>
                    <p>{image.caption || image.alt}</p>
                    <span className={styles.imageCounter}>
                      {slides.findIndex((img) => img.id === image.id) + 1} /{" "}
                      {slides.length}
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
