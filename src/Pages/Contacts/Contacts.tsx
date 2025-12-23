import VideoBlock from "../../Components/VideoBlock/VideoBlock";
import styles from "./contacts.module.css";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaWhatsapp,
  FaTelegram,
  FaVk,
} from "react-icons/fa";

const Contacts = () => {
  const yandexMapsAppUrl = `https://yandex.ru/maps/-/CLDJROM9`;

  // Контактная информация
  const contactInfo = {
    address: "г. Нижний Новгород, ул. Памирская, 11В",
    phone: "+7 (987) 540 00 27",
    email: "tentoteka@yandex.ru",
    workHours: {
      weekdays: "Пн-Пт: 9:00 - 18:00",
      weekend: "Сб-Вс: Выходной",
    },
    social: {
      whatsapp: "https://wa.me/74951234567",
      telegram: "https://t.me/tentoteka",
      vk: "https://vk.com/tentoteka",
    },
  };

  return (
    <div className={styles.contactsContainer}>
      <div className={styles.contactsHeader}>
        <h1 className={styles.pageTitle}>Контакты</h1>
        <p className={styles.pageSubtitle}>
          Свяжитесь с нами любым удобным способом. Мы всегда рады помочь!
        </p>
      </div>

      <div className={styles.contactsContent}>
        {/* Левая колонка - Карта и контакты */}
        <div className={styles.leftColumn}>
          {/* Карта */}
          <div className={styles.mapSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <FaMapMarkerAlt className={styles.titleIcon} />
                Как нас найти
              </h2>
              <p className={styles.sectionDescription}>
                Наш офис расположен в Нижнем Новгороде в ленинском районе
              </p>
            </div>

            <div className={styles.mapWrapper}>
              <div className={styles.mapContainer}>
                {/* <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                  title="Карта с расположением офиса"
                  className={styles.mapFrame}
                  loading="lazy"
                ></iframe> */}
                <iframe
                  src="https://yandex.ru/map-widget/v1/?um=constructor%3A41188a1a2d379437ab62602c58bbde0f2a67b986477d6ec24d67b813f359fab1&amp;source=constructor"
                  width="796"
                  height="640"
                  frameBorder="0"
                  loading="lazy"
                  className={styles.mapFrame}
                ></iframe>
              </div>

              <div className={styles.addressCard}>
                <div className={styles.addressInfo}>
                  <h3 className={styles.addressTitle}>Наш адрес</h3>
                  <p className={styles.addressText}>{contactInfo.address}</p>
                </div>
                <a
                  href={yandexMapsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapLink}
                >
                  Открыть в Яндекс.Картах
                </a>
              </div>
            </div>
          </div>

          {/* Контактная информация */}
          <div className={styles.contactsSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Контактная информация</h2>
              <p className={styles.sectionDescription}>
                Свяжитесь с нами для консультации или оформления заказа
              </p>
            </div>

            <div className={styles.contactsGrid}>
              <div className={styles.contactCard}>
                <div className={styles.contactIcon}>
                  <FaPhone />
                </div>
                <div className={styles.contactInfo}>
                  <h3 className={styles.contactTitle}>Телефон</h3>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className={styles.contactLink}
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </div>

              <div className={styles.contactCard}>
                <div className={styles.contactIcon}>
                  <FaEnvelope />
                </div>
                <div className={styles.contactInfo}>
                  <h3 className={styles.contactTitle}>Email</h3>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className={styles.contactLink}
                  >
                    {contactInfo.email}
                  </a>
                  <p className={styles.contactNote}>
                    Ответ в течение 1 рабочего дня
                  </p>
                </div>
              </div>

              <div className={styles.contactCard}>
                <div className={styles.contactIcon}>
                  <FaClock />
                </div>
                <div className={styles.contactInfo}>
                  <h3 className={styles.contactTitle}>Режим работы</h3>
                  <p className={styles.contactText}>
                    {contactInfo.workHours.weekdays}
                  </p>
                  <p className={styles.contactText}>
                    {contactInfo.workHours.weekend}
                  </p>
                </div>
              </div>
            </div>

            {/* Социальные сети */}
            <div className={styles.socialSection}>
              <h3 className={styles.socialTitle}>Мы в социальных сетях</h3>
              <div className={styles.socialLinks}>
                <a
                  href={contactInfo.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={contactInfo.social.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Telegram"
                >
                  <FaTelegram />
                  <span>Telegram</span>
                </a>
                <a
                  href={contactInfo.social.vk}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="ВКонтакте"
                >
                  <FaVk />
                  <span>ВКонтакте</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Правая колонка - Видео и форма */}
        <div className={styles.rightColumn}>
          {/* Видео-блок */}
          {/* <div className={styles.videoSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Как добраться до офиса</h2>
              <p className={styles.sectionDescription}>
                Посмотрите короткое видео, как пройти до нашего офиса
              </p>
            </div>

            <div className={styles.videoWrapper}>
              <VideoBlock
                videoType="local"
                localSrc="/videos/route-to-office.mp4"
                poster="/images/route-poster.jpg"
                title="Маршрут до офиса"
                description="Таймлапс маршрута от станции метро до нашего офиса"
                loop={true}
              />
            </div>
          </div> */}

          {/* Форма обратной связи */}
          <div className={styles.formSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Остались вопросы?</h2>
              <p className={styles.sectionDescription}>
                Заполните форму и мы свяжемся с вами в ближайшее время
              </p>
            </div>

            <form className={styles.contactForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.formLabel}>
                  Ваше имя
                </label>
                <input
                  type="text"
                  id="name"
                  className={styles.formInput}
                  placeholder="Иван Иванов"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.formLabel}>
                  Телефон
                </label>
                <input
                  type="tel"
                  id="phone"
                  className={styles.formInput}
                  placeholder="+7 (999) 123-45-67"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className={styles.formInput}
                  placeholder="example@mail.ru"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.formLabel}>
                  Сообщение
                </label>
                <textarea
                  id="message"
                  className={styles.formTextarea}
                  placeholder="Пожалуйста задайте Ваш вопрос..."
                  rows={4}
                  required
                ></textarea>
              </div>

              <button type="submit" className={styles.submitButton}>
                Отправить сообщение
              </button>

              <p className={styles.formNote}>
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Дополнительная информация */}
      <div className={styles.additionalInfo}>
        <div className={styles.infoCard}>
          <h3 className={styles.infoCardTitle}>Доставка</h3>
          <p className={styles.infoCardText}>
            Доставляем тенты по всей России. Сроки и стоимость доставки
            рассчитываются индивидуально
          </p>
        </div>
        <div className={styles.infoCard}>
          <h3 className={styles.infoCardTitle}>Гарантия</h3>
          <p className={styles.infoCardText}>
            Предоставляем гарантию на все наши тенты. Срок гарантии зависит от
            материала и условий эксплуатации
          </p>
        </div>
        <div className={styles.infoCard}>
          <h3 className={styles.infoCardTitle}>Оплата</h3>
          <p className={styles.infoCardText}>
            Принимаем наличные, банковские карты и безналичный расчет. Работаем
            с юрлицами по договору
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
