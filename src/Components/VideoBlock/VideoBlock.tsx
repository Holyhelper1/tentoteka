import { useState, useRef, useEffect } from "react";
import {
  FaVolumeMute,
  FaVolumeUp,
  FaPlay,
  FaPause,
  FaExpand,
  FaCompress,
} from "react-icons/fa";
import styles from "./VideoBlock.module.css";

interface VideoBlockProps {
  /** Тип видео: 'local' для локального файла, 'rutube' для Rutube */
  videoType?: "local" | "rutube";
  /** Путь к локальному видеофайлу (для videoType='local') */
  localSrc?: string;
  /** ID видео на Rutube (для videoType='rutube') */
  rutubeId?: string;
  /** URL для Rutube (альтернатива rutubeId) */
  rutubeUrl?: string;
  /** Постер/заглушка видео */
  // poster?: string;
  /** Автоповтор видео */
  loop?: boolean;
  /** Заголовок блока */
  title?: string;
  /** Описание блока */
  description?: string;
}

const VideoBlock = ({
  videoType = "local",
  localSrc = "/videos/promo-video.mp4",
  rutubeId,
  rutubeUrl,
  // poster = "/images/video-poster.jpg",
  loop = true,
  title = "Наше производство",
  description = "Посмотрите, как мы создаём качественные тенты для вашего транспорта",
}: VideoBlockProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isCustomFullscreen, setIsCustomFullscreen] = useState(false);
  // const [isNativeFullscreen, setIsNativeFullscreen] = useState(false);

  // Рефы
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<number | undefined>(undefined);

  // Генерация URL для Rutube
  const getRutubeUrl = () => {
    if (rutubeUrl) return rutubeUrl;
    if (rutubeId) return `https://rutube.ru/play/embed/${rutubeId}`;
    return "https://rutube.ru/play/embed/12345678";
  };

  // Переключение звука
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  // Переключение воспроизведения
  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // Вход в ландшафтный полноэкранный режим
const enterLandscapeFullscreen = async () => {
  const container = containerRef.current;
  const video = videoRef.current;
  if (!container) return;

  try {
    // 1) Стандартный fullscreen на контейнере
    if (container.requestFullscreen) {
      await container.requestFullscreen();
    } 
    // 2) Попробуем fullscreen на самом <video> (иногда более надёжно)
    else if (video && (video as any).requestFullscreen) {
      await (video as any).requestFullscreen();
    }
    // 3) iOS Safari: нативный полноэкранный режим у тега video
    else if (video && (video as any).webkitEnterFullscreen) {
      try {
        (video as any).webkitEnterFullscreen();
      } catch (err) {
        console.warn("webkitEnterFullscreen failed:", err);
      }
    }
    // Если ни одно API не поддерживается — используем "псевдо"-fullscreen через CSS класс
    else {
      console.warn("Fullscreen API not supported — falling back to CSS fullscreen");
    }

    // Попытка заблокировать ориентацию (в TS приводим к any)
    const orientation = (screen as any).orientation;
    if (orientation && typeof orientation.lock === "function") {
      try {
        await orientation.lock("landscape");
      } catch (error) {
        console.warn("Не удалось заблокировать ориентацию:", error);
      }
    }

    // В любом случае — включаем локальное состояние, чтобы применился .landscapeFullscreen
    setIsCustomFullscreen(true);
  } catch (error) {
    console.error("Ошибка при входе в полноэкранный режим:", error);
    // fallback
    setIsCustomFullscreen(true);
  }
};


  // Выход из ландшафтного полноэкранного режима
const exitLandscapeFullscreen = async () => {
  const video = videoRef.current;

  try {
    // Разблокировка ориентации (приводим к any)
    const orientation = (screen as any).orientation;
    if (orientation && typeof orientation.unlock === "function") {
      try {
        orientation.unlock();
      } catch (err) {
        console.warn("Не удалось разблокировать ориентацию:", err);
      }
    }

    // Если есть нативный fullscreen — выходим
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else if (video && (video as any).webkitExitFullscreen) {
      try {
        (video as any).webkitExitFullscreen();
      } catch (err) {
        // на iOS может не быть webkitExitFullscreen, но видео всё равно выйдет
        console.warn("webkitExitFullscreen failed:", err);
      }
    }

    // Отключаем наш CSS-псевдо fullscreen
    setIsCustomFullscreen(false);
  } catch (error) {
    console.error("Ошибка при выходе из полноэкранного режима:", error);
    setIsCustomFullscreen(false);
  }
};


  // Переключение полноэкранного режима
  const toggleFullscreen = () => {
    if (isCustomFullscreen) {
      exitLandscapeFullscreen();
    } else {
      enterLandscapeFullscreen();
    }
  };

  // Обработка события загрузки видео
  const handleLoadedData = () => {
    setIsLoading(false);
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Обновление времени воспроизведения
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Обработка окончания видео
  const handleEnded = () => {
    if (loop && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  // Показ/скрытие контролов
  const handleMouseMove = () => {
    setShowControls(true);

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }

    controlsTimeoutRef.current = window.setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  // Обработка прогресс-бара
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const progressBar = e.currentTarget;
      const clickPosition =
        e.clientX - progressBar.getBoundingClientRect().left;
      const progressBarWidth = progressBar.clientWidth;
      const percentage = clickPosition / progressBarWidth;
      videoRef.current.currentTime = percentage * duration;
    }
  };

  // Форматирование времени
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Эффект для автоскрытия контролов
  useEffect(() => {
    if (showControls) {
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showControls]);

  // Эффект для обработки полноэкранного режима
  useEffect(() => {
  const handleFullscreenChange = () => {
    const isCurrentlyFullscreen = !!document.fullscreenElement;
    if (!isCurrentlyFullscreen) {
      setIsCustomFullscreen(false);
      const orientation = (screen as any).orientation;
      if (orientation && typeof orientation.unlock === "function") {
        try {
          orientation.unlock();
        } catch (err) {
          console.warn("Не удалось разблокировать ориентацию:", err);
        }
      }
    } else {
      setIsCustomFullscreen(true);
    }
  };

  document.addEventListener("fullscreenchange", handleFullscreenChange);

  // iOS Safari - события нативного fullscreen у video
  const video = videoRef.current;
  const onWebkitBegin = () => setIsCustomFullscreen(true);
  const onWebkitEnd = () => setIsCustomFullscreen(false);

  if (video && (video as any).webkitEnterFullscreen) {
    video.addEventListener("webkitbeginfullscreen", onWebkitBegin);
    video.addEventListener("webkitendfullscreen", onWebkitEnd);
  }

  // Обработка изменения ориентации устройства
  const handleOrientationChange = () => {
    if ((window as any).orientation !== 90 && (window as any).orientation !== -90) {
      if (isCustomFullscreen) {
        exitLandscapeFullscreen();
      }
    }
  };
  window.addEventListener("orientationchange", handleOrientationChange);

  return () => {
    document.removeEventListener("fullscreenchange", handleFullscreenChange);
    window.removeEventListener("orientationchange", handleOrientationChange);
    if (video && (video as any).webkitEnterFullscreen) {
      video.removeEventListener("webkitbeginfullscreen", onWebkitBegin);
      video.removeEventListener("webkitendfullscreen", onWebkitEnd);
    }
  };
}, [isCustomFullscreen]);


  // Эффект для паузы видео при скрытии страницы
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (videoRef.current) {
        if (document.hidden) {
          videoRef.current.pause();
        } else if (isPlaying) {
          videoRef.current.play();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isPlaying]);

  // Определяем, показывать ли заголовок и описание
  const showHeader = !isCustomFullscreen;

  return (
    <section className={styles.videoSection}>
      {showHeader && (
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{title}</h2>
          <p className={styles.sectionDescription}>{description}</p>
        </div>
      )}

      <div
        ref={containerRef}
        className={`${styles.videoContainer} ${
          isCustomFullscreen ? styles.landscapeFullscreen : ""
        }`}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setShowControls(false)}
        onTouchStart={handleMouseMove}
      >
        {videoType === "local" ? (
          <>
            <video
              ref={videoRef}
              className={styles.videoElement}
              autoPlay
              muted={isMuted}
              loop={loop}
              // poster={poster}
              onLoadedData={handleLoadedData}
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleEnded}
              playsInline
              preload="metadata"
            >
              <source src={localSrc} type="video/mp4" />
              <p>Ваш браузер не поддерживает видео.</p>
            </video>

            {isLoading && (
              <div className={styles.loadingOverlay}>
                <div className={styles.loadingSpinner}></div>
                <p className={styles.loadingText}>Загрузка видео...</p>
              </div>
            )}

            <div
              className={`${styles.videoControls} ${
                showControls ? styles.controlsVisible : ""
              }`}
            >
              <div
                className={styles.progressBarContainer}
                onClick={handleProgressClick}
              >
                <div
                  className={styles.progressBar}
                  style={{
                    width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                  }}
                ></div>
                <div className={styles.progressTime}>
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className={styles.controlsMain}>
                <div className={styles.controlsLeft}>
                  <button
                    className={styles.controlButton}
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Пауза" : "Воспроизвести"}
                  >
                    {isPlaying ? <FaPause /> : <FaPlay />}
                  </button>

                  <button
                    className={styles.controlButton}
                    onClick={toggleMute}
                    aria-label={isMuted ? "Включить звук" : "Выключить звук"}
                  >
                    {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                  </button>

                  <div className={styles.timeDisplay}>
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>

                <div className={styles.controlsRight}>
                  <button
                    className={styles.controlButton}
                    onClick={toggleFullscreen}
                    aria-label={
                      isCustomFullscreen
                        ? "Выйти из полноэкранного режима"
                        : "На весь экран"
                    }
                  >
                    {isCustomFullscreen ? <FaCompress /> : <FaExpand />}
                  </button>
                </div>
              </div>
            </div>

            <button
              className={`${styles.muteCornerButton} ${
                !isMuted ? styles.unmuted : ""
              }`}
              onClick={toggleMute}
              aria-label={isMuted ? "Включить звук" : "Выключить звук"}
            >
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
          </>
        ) : (
          <div className={styles.rutubeContainer}>
            <iframe
              className={styles.rutubeIframe}
              src={`${getRutubeUrl()}?autoplay=1&mute=1&loop=${
                loop ? "1" : "0"
              }`}
              title="Промо-видео Тентотека"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

            <div className={styles.rutubeInfo}>
              <p className={styles.rutubeText}>
                Видео воспроизводится через <strong>Rutube</strong>
              </p>
              <a
                href={getRutubeUrl().replace("/embed/", "/video/")}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.rutubeLink}
              >
                Открыть на Rutube
              </a>
            </div>
          </div>
        )}
        <div className={styles.videoVignette}></div>
      </div>
    </section>
  );
};

export default VideoBlock;
