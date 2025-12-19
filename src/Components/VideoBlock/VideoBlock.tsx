import { useState, useRef, useEffect } from 'react';
import { FaVolumeMute, FaVolumeUp, FaPlay, FaPause, FaExpand } from 'react-icons/fa';
import styles from './VideoBlock.module.css';

interface VideoBlockProps {
  /** Тип видео: 'local' для локального файла, 'rutube' для Rutube */
  videoType?: 'local' | 'rutube';
  /** Путь к локальному видеофайлу (для videoType='local') */
  localSrc?: string;
  /** ID видео на Rutube (для videoType='rutube') */
  rutubeId?: string;
  /** URL для Rutube (альтернатива rutubeId) */
  rutubeUrl?: string;
  /** Постер/заглушка видео */
  poster?: string;
  /** Автоповтор видео */
  loop?: boolean;
  /** Заголовок блока */
  title?: string;
  /** Описание блока */
  description?: string;
}

const VideoBlock = ({
  videoType = 'local',
  localSrc = '/videos/promo-video.mp4',
  rutubeId,
  rutubeUrl,
  poster = '/images/video-poster.jpg',
  loop = true,
  title = 'Наше производство',
  description = 'Посмотрите, как мы создаём качественные тенты для вашего транспорта'
}: VideoBlockProps) => {
  // Состояния
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  // Рефы
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);


  // @ts-ignore
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();// исправить  тип

  // Генерация URL для Rutube
  const getRutubeUrl = () => {
    if (rutubeUrl) return rutubeUrl;
    if (rutubeId) return `https://rutube.ru/play/embed/${rutubeId}`;
    return 'https://rutube.ru/play/embed/12345678'; // Заглушка
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

  // Переключение полноэкранного режима
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
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
    
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  // Обработка прогресс-бара
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const progressBar = e.currentTarget;
      const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
      const progressBarWidth = progressBar.clientWidth;
      const percentage = clickPosition / progressBarWidth;
      videoRef.current.currentTime = percentage * duration;
    }
  };

  // Форматирование времени
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
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
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

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

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPlaying]);

  return (
    <section className={styles.videoSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <p className={styles.sectionDescription}>{description}</p>
      </div>

      <div 
        ref={containerRef}
        className={styles.videoContainer}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setShowControls(false)}
      >
        {videoType === 'local' ? (
          <>
            {/* Локальное видео */}
            <video
              ref={videoRef}
              className={styles.videoElement}
              autoPlay
              muted={isMuted}
              loop={loop}
              poster={poster}
              onLoadedData={handleLoadedData}
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleEnded}
              playsInline
              preload="metadata"
            >
              <source src={localSrc} type="video/mp4" />
              <p>Ваш браузер не поддерживает видео.</p>
            </video>

            {/* Индикатор загрузки */}
            {isLoading && (
              <div className={styles.loadingOverlay}>
                <div className={styles.loadingSpinner}></div>
                <p className={styles.loadingText}>Загрузка видео...</p>
              </div>
            )}

            {/* Контролы видео */}
            <div className={`${styles.videoControls} ${showControls ? styles.controlsVisible : ''}`}>
              {/* Прогресс-бар */}
              <div 
                className={styles.progressBarContainer}
                onClick={handleProgressClick}
              >
                <div 
                  className={styles.progressBar}
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                ></div>
                <div className={styles.progressTime}>
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Основные контролы */}
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
                    aria-label={isFullscreen ? "Выйти из полноэкранного режима" : "Полноэкранный режим"}
                  >
                    <FaExpand />
                  </button>
                </div>
              </div>
            </div>

            {/* Иконка звука в углу (для быстрого доступа) */}
            <button 
              className={`${styles.muteCornerButton} ${!isMuted ? styles.unmuted : ''}`}
              onClick={toggleMute}
              aria-label={isMuted ? "Включить звук" : "Выключить звук"}
            >
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
          </>
        ) : (
          /* Rutube iframe */
          <div className={styles.rutubeContainer}>
            <iframe
              className={styles.rutubeIframe}
              src={`${getRutubeUrl()}?autoplay=1&mute=1&loop=${loop ? '1' : '0'}`}
              title="Промо-видео Тентотека"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            
            {/* Информация о Rutube */}
            <div className={styles.rutubeInfo}>
              <p className={styles.rutubeText}>
                Видео воспроизводится через <strong>Rutube</strong>
              </p>
              <a 
                href={getRutubeUrl().replace('/embed/', '/video/')}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.rutubeLink}
              >
                Открыть на Rutube
              </a>
            </div>
          </div>
        )}

        {/* Затемнение по краям для фокуса */}
        <div className={styles.videoVignette}></div>
      </div>

      {/* Дополнительная информация */}
      <div className={styles.videoInfo}>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <h3 className={styles.infoTitle}>Собственное производство</h3>
            <p className={styles.infoText}>Все тенты изготавливаем на собственном оборудовании</p>
          </div>
          <div className={styles.infoItem}>
            <h3 className={styles.infoTitle}>Команда профессионалов</h3>
            <p className={styles.infoText}>Опытные мастера с многолетним стажем работы</p>
          </div>
          <div className={styles.infoItem}>
            <h3 className={styles.infoTitle}>Контроль качества</h3>
            <p className={styles.infoText}>Каждый тент проходит тщательную проверку</p>
          </div>
          <div className={styles.infoItem}>
            <h3 className={styles.infoTitle}>Современные материалы</h3>
            <p className={styles.infoText}>Используем только качественные и долговечные материалы</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoBlock;