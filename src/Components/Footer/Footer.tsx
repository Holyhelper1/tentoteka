import { Link } from "react-router-dom";
import { IoLogoVk } from "react-icons/io";
import { FaTelegramPlane } from "react-icons/fa";
// import { FaWhatsapp } from "react-icons/fa";
import { RiMapPinLine } from "react-icons/ri";
import { FiPhone } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import Logo from "../../assets/Logo/Logo.png";
import Avito from "../../assets/icons/avito.webp";
import Rutube from "../../assets/icons/rutube.webp";
import Dzen from "../../assets/icons/Dzen.webp";
import styles from "./Footer.module.css";
import Order from "../Order/Order";
import { useState } from "react";
import type { SocialLink } from "../Header/Header";
import { PATH_NAMES } from "../../Constants/pathnames";

export const Footer = () => {
  const [orderOpen, setOrderOpen] = useState(false);

  // Данные для соцсетей
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
    // {
    //   name: "WhatsApp",
    //   url: "https://wa.me/79875400027",
    //   icon: FaWhatsapp,
    //   color: "#25D366",
    // },
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
      color: "#fff",
    },
  ];

  // Быстрые ссылки
  const quickLinks = [
    { name: "Главная", path: PATH_NAMES.HOME },
    // { name: "Каталог тентов", path: "/catalog" },
    { name: "Результаты работ", path: PATH_NAMES.PORTFOLIO },
    { name: "Контакты", path: PATH_NAMES.CONTACTS },
  ];

  const currentYear = new Date().getFullYear();

  const openOrder = () => setOrderOpen(true);
  const closeOrder = () => setOrderOpen(false);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Верхняя часть футера */}
        <div className={styles.footerTop}>
          <div className={styles.footerSection}>
            <div className={styles.logoSection}>
              <Link to={PATH_NAMES.HOME} className={styles.logo}>
                <img src={Logo} alt="Тентотека" className={styles.logoImage} />
                <span className={styles.logoText}>Тентотека</span>
              </Link>
              <p className={styles.companyDescription}>
                Тенты для тех, кто ценит свои вещи
              </p>
              <div className={styles.socialLinks}>
                {socialLinks.map((social) => {
                  const isImagePath = typeof social.icon === "string";

                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      title={social.name}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label={social.name}
                      style={{ backgroundColor: social.color }}
                    >
                      {isImagePath ? (
                        <img
                          src={social.icon as string}
                          alt={social.name}
                          className={styles.iconImg}
                        />
                      ) : (
                        <social.icon />
                      )}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className={styles.footerSection}>
            <h3 className={styles.sectionTitle}>Контакты</h3>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <FiPhone className={styles.contactIcon} />
                <div>
                  <a href="tel:+79875400027" className={styles.contactLink}>
                    +7 (987) 540-00-27
                  </a>
                  <p className={styles.contactSubtitle}>
                    Пн-Пт: с 9:00 до 18:00
                  </p>
                </div>
              </li>
              <li className={styles.contactItem}>
                <HiOutlineMail className={styles.contactIcon} />
                <div>
                  <a
                    href="mailto:tentoteka@yandex.ru"
                    className={styles.contactLink}
                  >
                    tentoteka@yandex.ru
                  </a>
                  <p className={styles.contactSubtitle}>Электронная почта</p>
                </div>
              </li>
              <li className={styles.contactItem}>
                <RiMapPinLine className={styles.contactIcon} />
                <div>
                  <a
                    href="https://yandex.ru/maps/?text=Нижний Новгород, ул. Памирская, 11В"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.contactLink}
                  >
                    г. Нижний Новгород, ул. Памирская, 11В
                  </a>
                  <p className={styles.contactSubtitle}>
                    Основной офис и производство
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3 className={styles.sectionTitle}>Быстрые ссылки</h3>
            <ul className={styles.linksList}>
              {quickLinks.map((link) => (
                <li key={link.name} className={styles.linkItem}>
                  <Link to={link.path} className={styles.navLink}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3 className={styles.sectionTitle}>Оформить заказ</h3>
            <p className={styles.orderDescription}>
              Нужен тент для вашего транспорта? Оставьте заявку, и наш менеджер
              свяжется с вами в течение 5 минут.
            </p>
            <button className={styles.orderButton} onClick={openOrder}>
              Заказать тент
            </button>
            {/* <div className={styles.paymentMethods}>
              <span className={styles.paymentTitle}>Способы оплаты:</span>
              <div className={styles.paymentIcons}>
                <span className={styles.paymentIcon}>💳</span>
                <span className={styles.paymentIcon}>🏦</span>
                <span className={styles.paymentIcon}>🤝</span>
                <span className={styles.paymentIcon}>📱</span>
              </div>
            </div> */}
          </div>
        </div>

        {/* Нижняя часть футера */}
        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            © {currentYear} ТЕНТОТЕКА. Все права защищены.
          </div>
          <div className={styles.legalLinks}>
            <Link to={PATH_NAMES.PRIVACY_POLICY} className={styles.legalLink} target="_blank">
              Политика конфиденциальности
            </Link>
            <Link to={PATH_NAMES.TERMS_OF_SERVICE} className={styles.legalLink} target="_blank">
              Пользовательское соглашение
            </Link>
            {/* <Link to="/sitemap" className={styles.legalLink}>
              Карта сайта
            </Link> */}
          </div>
          {/* <div className={styles.developer}>
            Разработка сайта:
            <a
              href="https://kwork.ru/user/alexander_web_react"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.developerLink}
            >
              Alexander WebStudio
            </a>
          </div> */}
        </div>
      </div>
      {orderOpen && (
        <div
          className={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          onClick={closeOrder}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <Order onClose={closeOrder} />
          </div>
        </div>
      )}
    </footer>
  );
};
