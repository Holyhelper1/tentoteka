import { useState } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { IoLogoVk } from "react-icons/io";
import { FaTelegramPlane } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import Logo from "../../assets/Logo/Logo.png";
import Avito from "../../assets/icons/avito.webp";
import Rutube from "../../assets/icons/rutube.webp";
import Dzen from "../../assets/icons/Dzen.webp";
import { useTheme } from "../../Hooks/useTheme";
import Snowfall from "./Snowfall/Snowfall";
import { isNewYearPeriod, showSnow } from "../../Utils/isNewYearPeriod";
import type { IconType } from "react-icons";
import { PATH_NAMES } from "../../Constants/pathnames";

export interface SocialLink {
  name: string;
  url: string;
  icon: IconType | string;
  color?: string;
}

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toggleTheme, isDark } = useTheme();

  const showHolidayDecor = isNewYearPeriod();
  const showSnowFall = showSnow();


  console.log('showSnowFall', showSnowFall);
  
  const headerClasses = `${styles.header} ${
    showHolidayDecor ? styles.headerHoliday : ""
  }`;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Данные для соцсетей для удобства управления
  const socialLinks: SocialLink[] = [
    {
      name: "VK",
      url: "https://vk.com/tentoteka",
      icon: IoLogoVk,
      color: "#4C75A3",
    },
    {
      name: "Telegram",
      url: "https://t.me/tentoteka",
      icon: FaTelegramPlane,
      color: "#0088CC",
    },
    {
      name: "Avito",
      url: "https://www.avito.ru/brands/526cd80c661d26132a8d5f257291451d/all/zapchasti_i_aksessuary?src=search_seller_info&iid=7661516354&sellerId=b35e07f781315cdc253610c2d7920f3b",
      icon: Avito,
    },
    {
      name: "RUTUBE",
      url: "https://rutube.ru/channel/72546798/",
      icon: Rutube,
    },
    {
      name: "Dzen",
      url: "https://dzen.ru/tentoteka",
      icon: Dzen,
    },
  ];

  return (
    <header className={headerClasses}>
      <div
        className={styles.headerSnowingContainer}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {showSnowFall ? <Snowfall /> : <></>}
      </div>

      <div className={styles.container}>
        {/* Логотип */}
        <div className={styles.logo}>
          <Link
            to={PATH_NAMES.HOME}
            onClick={closeMenu}
            className={styles.logo}
            title="На главную"
          >
            <img src={Logo} alt="Тентотека" />
            Тентотека
          </Link>
        </div>

        {/* Десктопное меню */}
        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`}>
          {/* Контакты в мобильном меню */}
          <div className={styles.mobileContacts}>
            <a href="tel:+79875400027" className={styles.phone}>
              +7 (999) 123-45-67
            </a>
            <a
              href="https://yandex.ru/maps/-/CLDJROM9"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.address}
            >
              г. Нижний Новгород, ул. Памирская, 11В
            </a>
          </div>

          {/* Ссылка на страницу контактов, позде раскомментируем */}
          <Link
            to={PATH_NAMES.CONTACTS}
            className={styles.navLink}
            onClick={closeMenu}
          >
            Контакты
          </Link>
          {/* <Link
            to={PATH_NAMES.PORTFOLIO}
            className={styles.navLink}
            onClick={closeMenu}
          >
            Результаты работ
          </Link> */}

          {/* Соцсети в навигации */}
          <div className={styles.socialLinks}>
            {socialLinks.map((social) => {
              const isImagePath = typeof social.icon === "string";

              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  onClick={closeMenu}
                  style={{ backgroundColor: social.color }}
                >
                  {isImagePath ? (
                    <img
                      src={social.icon as string}
                      alt={social.name}
                      title={social.name}
                      className={styles.iconImg}
                    />
                  ) : (
                    <social.icon size={24} color="#fff" />
                  )}
                </a>
              );
            })}
          </div>
        </nav>

        {/* Контакты в десктопной версии */}
        <div className={styles.contacts}>
          <a href="tel:+79991234567" className={styles.phone}>
            +7 (987) 540 00 27
          </a>
          <a
            href="https://yandex.ru/maps/?text=Нижний Новгород, ул. Памирская, 11В"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.address}
          >
            г. Нижний Новгород, ул. Памирская, 11В
          </a>
        </div>

        {/* Кнопки управления (тема и бургер) */}
        <div className={styles.headerControls}>
          {/* Кнопка переключения темы */}
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={
              isDark
                ? "Переключить на светлую тему"
                : "Переключить на темную тему"
            }
            title={isDark ? "Светлая тема" : "Темная тема"}
          >
            {isDark ? <FiSun /> : <FiMoon />}
          </button>

          {/* Бургер-меню */}
          <button
            className={`${styles.burger} ${
              isMenuOpen ? styles.burgerOpen : ""
            }`}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};
