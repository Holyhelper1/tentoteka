import { Link } from 'react-router-dom';
import { IoLogoVk } from 'react-icons/io';
import { FaTelegramPlane } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import { RiMapPinLine } from 'react-icons/ri';
import { FiPhone } from 'react-icons/fi';
import { HiOutlineMail } from 'react-icons/hi';
import Logo from '../../assets/Logo/Logo.png';
import styles from './Footer.module.css';
import Order from '../Order/Order';
import { useState } from 'react';

export const Footer = () => {
    const [orderOpen, setOrderOpen] = useState(false);



  // Данные для соцсетей
  const socialLinks = [
    { 
      name: 'VK', 
      url: 'https://vk.com/tentoteka', 
      icon: <IoLogoVk />,
      color: '#4C75A3'
    },
    { 
      name: 'Telegram', 
      url: 'https://t.me/tentoteka', 
      icon: <FaTelegramPlane />,
      color: '#0088CC'
    },
    { 
      name: 'WhatsApp', 
      url: 'https://wa.me/79875400027', 
      icon: <FaWhatsapp />,
      color: '#25D366'
    },
    { 
      name: 'Avito', 
      url: 'https://www.avito.ru/user/tentoteka', 
      icon: 'AV',
      color: '#FF6163'
    },
    { 
      name: 'OZON', 
      url: 'https://www.ozon.ru/seller/tentoteka', 
      icon: 'OZ',
      color: '#005BFF'
    },
    { 
      name: 'WB', 
      url: 'https://www.wildberries.ru/seller/tentoteka', 
      icon: 'WB',
      color: '#A7318E'
    },
  ];

  // Быстрые ссылки
  const quickLinks = [
    { name: 'Главная', path: '/' },
    { name: 'Каталог тентов', path: '/catalog' },
    { name: 'Наши работы', path: '/portfolio' },
    { name: 'Контакты', path: '/contacts' },
    { name: 'Доставка и оплата', path: '/delivery' },
    { name: 'Гарантия', path: '/guarantee' },
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
              <Link to="/" className={styles.logo}>
                <img src={Logo} alt="Тентотека" className={styles.logoImage} />
                <span className={styles.logoText}>Тентотека</span>
              </Link>
              <p className={styles.companyDescription}>
                Производство и продажа качественных тентов для грузовых автомобилей и прицепов.
                Собственное производство, гарантия 5+ лет, быстрая доставка по всей России.
              </p>
              <div className={styles.socialLinks}>
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label={social.name}
                    style={{ backgroundColor: social.color }}
                  >
                    {social.icon}
                  </a>
                ))}
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
                  <p className={styles.contactSubtitle}>Ежедневно с 9:00 до 20:00</p>
                </div>
              </li>
              <li className={styles.contactItem}>
                <HiOutlineMail className={styles.contactIcon} />
                <div>
                  <a href="mailto:info@tentoteka.ru" className={styles.contactLink}>
                    info@tentoteka.ru
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
                  <p className={styles.contactSubtitle}>Основной офис и производство</p>
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
              Нужен тент для вашего транспорта? Оставьте заявку, и наш менеджер свяжется с вами в течение 15 минут.
            </p>
            <button 
            className={styles.orderButton}
              onClick={openOrder}
            >
              Заказать тент
            </button>
            <div className={styles.paymentMethods}>
              <span className={styles.paymentTitle}>Способы оплаты:</span>
              <div className={styles.paymentIcons}>
                <span className={styles.paymentIcon}>💳</span>
                <span className={styles.paymentIcon}>🏦</span>
                <span className={styles.paymentIcon}>🤝</span>
                <span className={styles.paymentIcon}>📱</span>
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя часть футера */}
        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            © {currentYear} ТЕНТОТЕКА. Все права защищены.
          </div>
          <div className={styles.legalLinks}>
            <Link to="/privacy" className={styles.legalLink}>
              Политика конфиденциальности
            </Link>
            <Link to="/agreement" className={styles.legalLink}>
              Пользовательское соглашение
            </Link>
            <Link to="/sitemap" className={styles.legalLink}>
              Карта сайта
            </Link>
          </div>
          <div className={styles.developer}>
            Разработка сайта: 
            <a 
              href="https://kwork.ru/user/alexander_web_react" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.developerLink}
            >
              Alexander WebStudio
            </a>
          </div>
        </div>
      </div>
      {orderOpen && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true" onClick={closeOrder}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <Order onClose={closeOrder} />
          </div>
        </div>
      )}
    </footer>
  );
};