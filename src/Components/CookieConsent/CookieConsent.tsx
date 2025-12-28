import { useState, useEffect } from 'react';
import style from './CookieConsent.module.css';
import { Link } from 'react-router-dom';
import { PATH_NAMES } from '../../Constants/pathnames';

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Проверяем, дал ли пользователь уже согласие
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Показываем баннер с небольшой задержкой
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={style.cookieBanner}>
      <div className={style.container}>
        <div className={style.content}>
          <p className={style.text}>
            Этот сайт использует файлы cookie для улучшения работы и анализа трафика. 
            Некоторые файлы cookie необходимы для работы сайта. 
            Продолжая использовать сайт, вы соглашаетесь с{' '}
            <Link 
              to={PATH_NAMES.PRIVACY_POLICY} 
              className={style.link}
              aria-label="Политика конфиденциальности"
            >
              Политикой конфиденциальности
            </Link>
          </p>
          <div className={style.controls}>
            <button 
              onClick={handleReject} 
              className={style.rejectButton}
              aria-label="Отклонить использование cookies"
            >
              Отклонить
            </button>
            <button 
              onClick={handleAccept} 
              className={style.acceptButton}
              aria-label="Принять использование cookies"
            >
              Принять
            </button>
          </div>
        </div>
        <button 
          onClick={handleReject} 
          className={style.closeButton}
          aria-label="Закрыть уведомление о cookies"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};