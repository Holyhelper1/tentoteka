import React, { useState, useRef, useEffect } from "react";
import styles from "./contacts.module.css";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  // FaWhatsapp,
  // FaTelegram,
  FaVk,
} from "react-icons/fa";
import MAX from "../../assets/icons/Max_light.svg";
import PrivacyAgreementCheckbox from "../../Components/PrivacyAgreementCheckbox/PrivacyAgreementCheckbox";

const MAX_CHAT_URL =
  "https://max.ru/u/f9LHodD0cOKQcOiETej2BNa4tH6J56bZI5bsKObjg8Nv1yLXys7OxYSXCK0";

const Contacts = () => {
  const yandexMapsAppUrl = `https://yandex.ru/maps/-/CLDJROM9`;

  const autoOpenTimerRef = useRef<number | null>(null);

  const [showMaxModal, setShowMaxModal] = useState(false);
  const [copiedText, setCopiedText] = useState("");

  // Состояния для формы
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    // email: "",
    message: "",
  });

  const [isAgreed, setIsAgreed] = useState(false);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkboxError, setCheckboxError] = useState("");

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
      // whatsapp: "https://wa.me/79875400027",
      // telegram: "https://t.me/tentoteka",
      max: MAX_CHAT_URL,
      vk: "https://vk.com/tentoteka",
    },
  };

  useEffect(() => {
    return () => {
      if (autoOpenTimerRef.current) {
        window.clearTimeout(autoOpenTimerRef.current);
      }
    };
  }, []);

  const openMaxChat = () => {
    const newWindow = window.open(MAX_CHAT_URL, "_blank");
    if (!newWindow) {
      window.location.href = MAX_CHAT_URL;
    }
  };

  // Обработчики изменения полей формы
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (formError) {
      setFormError("");
    }
  };

  // Валидация телефона
  const validatePhone = (phone: string) => {
    return /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(
      phone,
    );
  };

  // Обработка отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newFormErrors: string[] = [];
    let newCheckboxError = "";

    if (!formData.phone.trim() || !validatePhone(formData.phone)) {
      newFormErrors.push("Пожалуйста, введите корректный номер телефона");
    }

    if (!isAgreed) {
      newCheckboxError = "Необходимо согласие на обработку персональных данных";
    }

    setFormError(newFormErrors.length > 0 ? newFormErrors.join(", ") : "");
    setCheckboxError(newCheckboxError);

    if (newFormErrors.length > 0 || newCheckboxError) {
      return;
    }

    setIsSubmitting(true);

    try {
      const message = `Новый вопрос с сайта — ТЕНТОТЕКА

      Имя: ${formData.name || "-"}
      Телефон: ${formData.phone}
      Сообщение: ${formData.message || "-"}

      Дата: ${new Date().toLocaleString()}`;

      try {
        await navigator.clipboard.writeText(message);
      } catch {}

      setCopiedText(message);
      setShowMaxModal(true);

      if (autoOpenTimerRef.current) {
        clearTimeout(autoOpenTimerRef.current);
      }

      autoOpenTimerRef.current = window.setTimeout(() => {
        openMaxChat();
        setShowMaxModal(false);
      }, 4000);

      setFormData({
        name: "",
        phone: "",
        message: "",
      });
      setIsAgreed(false);
    } catch (error) {
      console.error("Ошибка отправки формы:", error);
      setFormError(
        "Произошла ошибка при отправке. Попробуйте позже или свяжитесь по телефону.",
      );
    } finally {
      setIsSubmitting(false);
    }
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
                <iframe
                  src="https://yandex.ru/map-widget/v1/?um=constructor%3A41188a1a2d379437ab62602c58bbde0f2a67b986477d6ec24d67b813f359fab1&amp;source=constructor"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  loading="lazy"
                  className={styles.mapFrame}
                  title="Карта с расположением офиса ТЕНТОТЕКА в Нижнем Новгороде"
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
              <h3 className={styles.socialTitle}>
                Свяжитесь с нами в мессенджерах
              </h3>
              <div className={styles.socialLinks}>
                <a
                  href={contactInfo.social.max}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="MAX"
                >
                  <img src={MAX} alt="MAX" width={"20.8px"} />
                  <span>MAX</span>
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

        {/* Правая колонка - Форма обратной связи */}
        <div className={styles.rightColumn}>
          <div className={styles.formSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Остались вопросы?</h2>
              <p className={styles.sectionDescription}>
                Заполните форму и мы свяжемся с вами в ближайшее время
              </p>
            </div>

            <form
              className={styles.contactForm}
              onSubmit={handleSubmit}
              noValidate
            >
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.formLabel}>
                  Ваше имя
                </label>
                <input
                  type="text"
                  id="name"
                  className={styles.formInput}
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.formLabel}>
                  Телефон *
                </label>
                <input
                  type="tel"
                  id="phone"
                  className={styles.formInput}
                  placeholder="+7 (999) 123-45-67"
                  value={formData.phone}
                  onChange={handleInputChange}
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
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              {/* Используем компонент чекбокса */}
              <PrivacyAgreementCheckbox
                id="contacts-privacy"
                checked={isAgreed}
                onChange={(checked) => {
                  setIsAgreed(checked);
                  if (checked && checkboxError) {
                    setCheckboxError("");
                  }
                }}
                error={checkboxError}
                animateError={true}
                className={styles.privacyCheckbox}
              />

              {formError && (
                <div className={styles.formError} role="alert">
                  {formError}
                </div>
              )}

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Отправка..." : "Отправить сообщение"}
              </button>
              {/* МОДАЛКА */}
              {showMaxModal && (
                <div className={styles.modalOverlay}>
                  <div className={styles.modalCard}>
                    <div className={styles.modalTitle}>Текст скопирован</div>

                    <textarea
                      readOnly
                      value={copiedText}
                      className={styles.modalPreview}
                    />

                    <button
                      className={styles.orderBtn}
                      onClick={() => {
                        if (autoOpenTimerRef.current) {
                          clearTimeout(autoOpenTimerRef.current);
                        }
                        openMaxChat();
                        setShowMaxModal(false);
                      }}
                    >
                      Перейти в MAX
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Дополнительная информация, требуется согласовать и доработать */}
      {/* <div className={styles.additionalInfo}>
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
            Принимаем наличные, безналичный расчет и СПБ платежи. Работаем с
            физлицами, и с юрлицами по договору
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default Contacts;