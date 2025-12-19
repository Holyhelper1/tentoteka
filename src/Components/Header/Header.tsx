// import { useState } from "react";
// import styles from "./Header.module.css";
// import { Link } from "react-router-dom";
// import { IoLogoVk } from "react-icons/io";
// import { FaTelegramPlane } from "react-icons/fa";
// // import Avito from "../../assets/SocialLinksIcons/Avito.png";
// // import Ozon from "../../assets/SocialLinksIcons/ozon.png";
// // import WB from "../../assets/SocialLinksIcons/WB.png";
// import Logo from "../../assets/Logo/Logo.png";
// export const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const closeMenu = () => {
//     setIsMenuOpen(false);
//   };

//   // Данные для соцсетей для удобства управления
//   const socialLinks = [
//     // { name: 'VK', url: 'https://vk.com/tentoteka', icon: 'VK' },
//     { name: "VK", url: "https://vk.com/tentoteka", icon: <IoLogoVk /> },
//     {
//       name: "Telegram",
//       url: "https://t.me/tentoteka",
//       icon: <FaTelegramPlane />,
//     },
//     {
//       name: "Avito",
//       url: "https://www.avito.ru/user/tentoteka",
//       icon: "Avito",
//     },
//     { name: "OZON", url: "https://www.ozon.ru/seller/tentoteka", icon: "OZON" },
//     {
//       name: "WB",
//       url: "https://www.wildberries.ru/seller/tentoteka",
//       icon: "WB",
//     },
//   ];

//   return (
//     <header className={styles.header}>
//       <div className={styles.container}>
//         {/* Логотип */}
//         <div className={styles.logo}>
//           <Link to="/tentoteka" onClick={closeMenu} className={styles.logo} title="На главную">
//           <img src={Logo} alt="Тентотека" />
//             Тентотека
//           </Link>
//         </div>

//         {/* Десктопное меню */}
//         <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`}>
//           {/* Контакты в мобильном меню */}
//           <div className={styles.mobileContacts}>
//             <a href="tel:+79875400027" className={styles.phone}>
//               +7 (999) 123-45-67
//             </a>
//             <a
//               href="https://yandex.ru/maps/?text=Москва, ул. Тентовая, 1"
//               target="_blank"
//               rel="noopener noreferrer"
//               className={styles.address}
//             >
//               г. Москва, ул. Тентовая, 1
//             </a>
//           </div>
//           {/* Ссылка на страницу контактов */}

//           <Link to="/contacts" className={styles.navLink} onClick={closeMenu}>
//             Контакты
//           </Link>

//           {/* Соцсети в навигации */}
//           <div className={styles.socialLinks}>
//             {socialLinks.map((social) => (
//               <a
//                 key={social.name}
//                 href={social.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={styles.socialLink}
//                 aria-label={social.name}
//                 onClick={closeMenu}
//               >
//                 {social.icon}
//               </a>
//             ))}
//           </div>

//           {/* Кнопка заказа */}
//           {/* <a
//             href="https://t.me/tentoteka_order"
//             target="_blank"
//             rel="noopener noreferrer"
//             className={styles.orderButton}
//             onClick={closeMenu}
//           >
//             Оформить заказ
//           </a> */}
//         </nav>

//         {/* Контакты в десктопной версии */}
//         <div className={styles.contacts}>
//           <a href="tel:+79991234567" className={styles.phone}>
//             +7 (987) 540 00 27
//           </a>
//           <a
//             href="https://yandex.ru/maps/?text=Нижний Новгород, ул. Памирская, 11В"
//             target="_blank"
//             rel="noopener noreferrer"
//             className={styles.address}
//           >
//             г. Нижний Новгород, ул. Памирская, 11В
//           </a>
//         </div>

//         {/* Бургер-меню */}
//         <button
//           className={`${styles.burger} ${isMenuOpen ? styles.burgerOpen : ""}`}
//           onClick={toggleMenu}
//           aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
//         >
//           <span></span>
//           <span></span>
//           <span></span>
//         </button>
//       </div>
//     </header>
//   );
// };



// с кнопкой выбора темы

import { useState } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { IoLogoVk } from "react-icons/io";
import { FaTelegramPlane } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import Logo from "../../assets/Logo/Logo.png";
import { useTheme } from "../../Hooks/useTheme";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme, isDark } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Данные для соцсетей для удобства управления
  const socialLinks = [
    { name: "VK", url: "https://vk.com/tentoteka", icon: <IoLogoVk /> },
    {
      name: "Telegram",
      url: "https://t.me/tentoteka",
      icon: <FaTelegramPlane />,
    },
    {
      name: "Avito",
      url: "https://www.avito.ru/user/tentoteka",
      icon: "Avito",
    },
    { name: "OZON", url: "https://www.ozon.ru/seller/tentoteka", icon: "OZON" },
    {
      name: "WB",
      url: "https://www.wildberries.ru/seller/tentoteka",
      icon: "WB",
    },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Логотип */}
        <div className={styles.logo}>
          <Link to="/tentoteka" onClick={closeMenu} className={styles.logo} title="На главную">
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
              href="https://yandex.ru/maps/?text=Москва, ул. Тентовая, 1"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.address}
            >
              г. Москва, ул. Тентовая, 1
            </a>
          </div>
          
          {/* Ссылка на страницу контактов */}
          <Link to="/contacts" className={styles.navLink} onClick={closeMenu}>
            Контакты
          </Link>

          {/* Соцсети в навигации */}
          <div className={styles.socialLinks}>
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={social.name}
                onClick={closeMenu}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Кнопка переключения темы в мобильном меню */}
          <button
            className={`${styles.themeToggle} ${styles.mobileThemeToggle}`}
            onClick={toggleTheme}
            aria-label={isDark ? "Переключить на светлую тему" : "Переключить на темную тему"}
          >
            {isDark ? <FiSun /> : <FiMoon />}
            <span className={styles.themeText}>
              {isDark ? "Светлая тема" : "Темная тема"}
            </span>
          </button>
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
            aria-label={isDark ? "Переключить на светлую тему" : "Переключить на темную тему"}
            title={isDark ? "Светлая тема" : "Темная тема"}
          >
            {isDark ? <FiSun /> : <FiMoon />}
          </button>

          {/* Бургер-меню */}
          <button
            className={`${styles.burger} ${isMenuOpen ? styles.burgerOpen : ""}`}
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