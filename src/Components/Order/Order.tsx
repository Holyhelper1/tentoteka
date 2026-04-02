import React, { useEffect, useRef } from "react";
import styles from "./order.module.css";
import Auto from "./assets/icon/auto.webp";
import Cart from "./assets/icon/cart.webp";
import PrivacyAgreementCheckbox from "../PrivacyAgreementCheckbox/PrivacyAgreementCheckbox";

import Img_Tent_na_Gazel_3_17m from "./assets/cars/Тент на Газель 3,17м.webp";
import Img_Tent_na_Gazel_4_25m from "./assets/cars/Тент на Газель 4,25м.webp";
import Img_Tent_na_Gazel_NEXT_3_17m from "./assets/cars/Тент на Газель NEXT 3,17м.webp";
import Img_Tent_na_Gazel_NEXT_4_25m from "./assets/cars/Тент на Газель NEXT 4.25м.webp";
import Img_Tent_na_Gazel_Fermer_2_42m from "./assets/cars/Тент на Газель Фермер 2,42м.webp";
import Img_Tent_na_Gazel_Fermer_3_17m from "./assets/cars/Тент на Газель Фермер 3,17м.webp";
import Img_Tent_na_Sobol_2_17m from "./assets/cars/Тент на Соболь 2,17м.webp";
import Img_Tent_na_Sobol_2_42m from "./assets/cars/Тент на Соболь 2,42м.webp";
import Img_Tent_na_UAZ_33036 from "./assets/cars/Тент на УАЗ 33036.webp";
import Img_Tent_na_UAZ_Fermer from "./assets/cars/Тент на УАЗ Фермер.webp";

import Img_Tent_na_pritsep_AvtoS from "./assets/trailers/Тент на прицеп AvtoS.webp";
import Img_Tent_na_pritsep_BelAZ from "./assets/trailers/Тент на прицеп БелАЗ.webp";
import Img_Tent_na_pritsep_GRANIT from "./assets/trailers/Тент на прицеп ГРАНИТ.webp";
import Img_Tent_na_pritsep_IZLP_KAMA from "./assets/trailers/Тент на прицеп ИЗЛП-КАМА.webp";
import Img_Tent_na_pritsep_KMZ from "./assets/trailers/Тент на прицеп КМЗ.webp";
import Img_Tent_na_pritsep_Kremen from "./assets/trailers/Тент на прицеп Кремень.webp";
import Img_Tent_na_pritsep_Krepish from "./assets/trailers/Тент на прицеп Крепыш.webp";
import Img_Tent_na_pritsep_LAV from "./assets/trailers/Тент на прицеп ЛАВ.webp";
import Img_Tent_na_pritsep_LAKER from "./assets/trailers/Тент на прицеп ЛАКЕР.webp";
import Img_Tent_na_pritsep_MAZ from "./assets/trailers/Тент на прицеп МАЗ.webp";
import Img_Tent_na_pritsep_MZSA from "./assets/trailers/Тент на прицеп МЗСА.webp";
import Img_Tent_na_pritsep_MMZ from "./assets/trailers/Тент на прицеп ММЗ.webp";
import Img_Tent_na_pritsep_SAZ from "./assets/trailers/Тент на прицеп САЗ.webp";
import Img_Tent_na_pritsep_TITAN from "./assets/trailers/Тент на прицеп ТИТАН.webp";
import Img_Tent_na_pritsep_Trailer from "./assets/trailers/Тент на прицеп Трейлер.webp";
import Img_Other from "./assets/trailers/Другой (ввести вручную).webp";

const MODEL_IMAGES: Record<string, string | undefined> = {
  /* авто */
  "Тент на Газель 3,17м": Img_Tent_na_Gazel_3_17m,
  "Тент на Газель 4,25м": Img_Tent_na_Gazel_4_25m,
  "Тент на Газель NEXT 3,17м": Img_Tent_na_Gazel_NEXT_3_17m,
  "Тент на Газель NEXT 4.25м": Img_Tent_na_Gazel_NEXT_4_25m,
  "Тент на Газель Фермер 2,42м": Img_Tent_na_Gazel_Fermer_2_42m,
  "Тент на Газель Фермер 3,17м": Img_Tent_na_Gazel_Fermer_3_17m,
  "Тент на Соболь 2,17м": Img_Tent_na_Sobol_2_17m,
  "Тент на Соболь 2,42м": Img_Tent_na_Sobol_2_42m,
  "Тент на УАЗ 33036": Img_Tent_na_UAZ_33036,
  "Тент на УАЗ Фермер": Img_Tent_na_UAZ_Fermer,

  /* прицепы */
  "Тент на прицеп AvtoS": Img_Tent_na_pritsep_AvtoS,
  "Тент на прицеп БелАЗ": Img_Tent_na_pritsep_BelAZ,
  "Тент на прицеп ГРАНИТ": Img_Tent_na_pritsep_GRANIT,
  "Тент на прицеп ИЗЛП-КАМА": Img_Tent_na_pritsep_IZLP_KAMA,
  "Тент на прицеп КМЗ": Img_Tent_na_pritsep_KMZ,
  "Тент на прицеп Кремень": Img_Tent_na_pritsep_Kremen,
  "Тент на прицеп Крепыш": Img_Tent_na_pritsep_Krepish,
  "Тент на прицеп ЛАВ": Img_Tent_na_pritsep_LAV,
  "Тент на прицеп ЛАКЕР": Img_Tent_na_pritsep_LAKER,
  "Тент на прицеп МАЗ": Img_Tent_na_pritsep_MAZ,
  "Тент на прицеп МЗСА": Img_Tent_na_pritsep_MZSA,
  "Тент на прицеп ММЗ": Img_Tent_na_pritsep_MMZ,
  "Тент на прицеп САЗ": Img_Tent_na_pritsep_SAZ,
  "Тент на прицеп ТИТАН": Img_Tent_na_pritsep_TITAN,
  "Тент на прицеп Трейлер": Img_Tent_na_pritsep_Trailer,
  "Другой (ввести вручную)": Img_Other,
};

type VehicleType = "auto" | "trailer";

interface OrderProps {
  onClose?: () => void;
}

const MODELS: Record<VehicleType, string[]> = {
  auto: [
    "Тент на Газель 3,17м",
    "Тент на Газель NEXT 3,17м",
    "Тент на Газель Фермер 2,42м",
    "Тент на Газель Фермер 3,17м",
    "Тент на Соболь 2,17м",
    "Тент на Соболь 2,42м",
    "Тент на Газель 4,25м",
    "Тент на Газель NEXT 4.25м",
    "Тент на УАЗ Фермер",
    "Тент на УАЗ 33036",
    "Другой (ввести вручную)",
  ],
  trailer: [
    "Тент на прицеп МЗСА",
    "Тент на прицеп Крепыш",
    "Тент на прицеп ТИТАН",
    "Тент на прицеп Кремень",
    "Тент на прицеп ИЗЛП-КАМА",
    "Тент на прицеп БелАЗ",
    "Тент на прицеп AvtoS",
    "Тент на прицеп САЗ",
    "Тент на прицеп Трейлер",
    "Тент на прицеп ММЗ",
    "Тент на прицеп КМЗ",
    "Тент на прицеп ЛАВ",
    "Тент на прицеп МАЗ",
    "Тент на прицеп ЛАКЕР",
    "Тент на прицеп ГРАНИТ",
    "Другой (ввести вручную)",
  ],
};

const COLORS: { name: string; css: string }[] = [
  { name: "Серый", css: "#7d8aa3" },
  { name: "Синий", css: "#0d3483" },
  { name: "Хаки", css: "#78866b" },
  { name: "Чёрный", css: "#1b1b1b" },
];

// const TELEGRAM_USERNAME = "tentoteka_zakaz";
const MAX_CHAT_URL =
  "https://max.ru/u/f9LHodD0cOKQcOiETej2BNa4tH6J56bZI5bsKObjg8Nv1yLXys7OxYSXCK0";

const Order: React.FC<OrderProps> = ({ onClose }) => {
  const [step, setStep] = React.useState<number>(0);
  const [type, setType] = React.useState<VehicleType | null>(null);
  const [model, setModel] = React.useState<string>("");
  const [manualModel, setManualModel] = React.useState<string>("");
  const [color, setColor] = React.useState<string>(COLORS[0].name);
  const [phone, setPhone] = React.useState<string>("");
  const [comment, setComment] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [isAgreed, setIsAgreed] = React.useState<boolean>(false);
  const [checkboxError, setCheckboxError] = React.useState<string>("");

  const [showMaxModal, setShowMaxModal] = React.useState(false);
  const [copiedText, setCopiedText] = React.useState("");
  const autoOpenTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

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

  const modelsForType = type ? MODELS[type] : [];

  const goNext = () => {
    setError("");
    if (step === 0 && !type) {
      setError("Выберите тип: авто или прицеп");
      return;
    }
    if (step === 1 && !model) {
      setError("Выберите модель или введите вручную");
      return;
    }
    if (step === 2 && !color) {
      setError("Выберите цвет");
      return;
    }
    setStep((s) => Math.min(3, s + 1));
  };

  const goBack = () => {
    setError("");
    setStep((s) => Math.max(0, s - 1));
  };

  const normalizePhone = (raw: string) => {
    const digits = raw.replace(/\D/g, "");
    if (digits.length === 11 && digits.startsWith("8")) {
      return "+7" + digits.slice(1);
    }
    if (digits.length === 10) {
      return "+7" + digits;
    }
    if (digits.startsWith("7") && digits.length === 11) {
      return "+" + digits;
    }
    if (raw.startsWith("+") && digits.length >= 10) {
      return "+" + digits;
    }
    return raw;
  };

  const validatePhone = (p: string) => {
    const normalized = normalizePhone(p);
    return /^\+7\d{10}$/.test(normalized);
  };

  const onSubmit = async () => {
    const newErrors: string[] = [];
    let newCheckboxError = "";

    if (!validatePhone(phone)) {
      newErrors.push("Введите корректный телефон");
    }

    if (!isAgreed) {
      newCheckboxError = "Необходимо согласие";
    }

    setError(newErrors.join(", "));
    setCheckboxError(newCheckboxError);

    if (newErrors.length || newCheckboxError) return;

    const chosenModel =
      model === "Другой (ввести вручную)"
        ? manualModel || "Указан вручную"
        : model;

    const message = [
      "Заказ с сайта — ТЕНТОТЕКА",
      `Тип: ${type === "auto" ? "Авто" : "Прицеп"}`,
      `Модель: ${chosenModel}`,
      `Цвет: ${color}`,
      `Телефон: ${normalizePhone(phone)}`,
      comment ? `Комментарий: ${comment}` : "Комментарий: -",
    ].join("\n");

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
      onClose?.();
    }, 4000);
  };

  const onSelectType = (t: VehicleType) => {
    setType(t);
    setModel("");
    setManualModel("");
    setColor(COLORS[0].name);
    setStep(1);
    setError("");
  };

  return (
    <div className={styles.orderCard} aria-live="polite">
      <div className={styles.header}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 12,
          }}
        >
          <div>
            <h3 className={styles.title}>Подбор и заказ тента</h3>
            <p className={styles.subtitle}>
              Выберите тип транспорта и оформите заказ
            </p>
          </div>

          <button
            onClick={() => onClose?.()}
            aria-label="Закрыть"
            className={styles.closeButton}
          >
            ✕
          </button>
        </div>
      </div>

      <div className={styles.stepper}>
        <div className={`${styles.step} ${step === 0 ? styles.active : ""}`}>
          1. Тип
        </div>
        <div className={`${styles.step} ${step === 1 ? styles.active : ""}`}>
          2. Модель
        </div>
        <div className={`${styles.step} ${step === 2 ? styles.active : ""}`}>
          3. Цвет
        </div>
        <div className={`${styles.step} ${step === 3 ? styles.active : ""}`}>
          4. Контакт
        </div>
      </div>

      <div className={styles.content}>
        {step === 0 && (
          <div className={styles.stepPane}>
            <div className={styles.optionsRow}>
              <button
                className={`${styles.typeCard} ${
                  type === "auto" ? styles.selected : ""
                }`}
                onClick={() => onSelectType("auto")}
                aria-pressed={type === "auto"}
                aria-label="Выбрать авто"
              >
                <div className={styles.typeIcon}>
                  <img src={Auto} alt="Auto" width={150} />
                </div>
                <div className={styles.typeLabel}>Тент на автомобиль</div>
                <div className={styles.typeHint}>ГАЗель, Соболь, УАЗ и др.</div>
              </button>

              <button
                className={`${styles.typeCard} ${
                  type === "trailer" ? styles.selected : ""
                }`}
                onClick={() => onSelectType("trailer")}
                aria-pressed={type === "trailer"}
                aria-label="Выбрать прицеп"
              >
                <div className={styles.typeIcon}>
                  <img src={Cart} alt="Auto" width={150} />
                </div>
                <div className={styles.typeLabel}>Тент на прицеп</div>
                <div className={styles.typeHint}>
                  МЗСА, КМЗ, ТИТАН, ИЗЛП и др.
                </div>
              </button>
            </div>

            <div className={styles.controlsRow}>
              <button className={styles.nextBtn} onClick={goNext}>
                Далее
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className={styles.stepPane}>
            <div className={styles.modelsScroll} role="list">
              {modelsForType.map((m) => {
                const imageSrc = MODEL_IMAGES[m];
                const isOther = m === "Другой (ввести вручную)";

                return (
                  <label
                    key={m}
                    className={`${styles.modelCard} ${
                      model === m ? styles.selectedModel : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="model"
                      value={m}
                      checked={model === m}
                      onChange={() => {
                        setModel(m);
                        if (m !== "Другой (ввести вручную)") setManualModel("");
                      }}
                      className={styles.hiddenRadio}
                    />

                    {!isOther && imageSrc ? (
                      <div className={styles.modelImageWrap}>
                        <img
                          src={imageSrc}
                          alt={m}
                          className={styles.modelImage}
                        />
                      </div>
                    ) : (
                      <>
                        <div className={styles.modelImageWrap}>
                          <img
                            src={imageSrc}
                            alt={m}
                            className={styles.modelImage}
                          />
                        </div>
                        {/* Если убрать картинку вопроса, то раскомментировать строку ниже */}
                        {/* <div className={styles.modelImagePlaceholder} /> */}
                      </>
                    )}

                    <div className={styles.modelTitle}>{m}</div>
                  </label>
                );
              })}
            </div>

            {model === "Другой (ввести вручную)" && (
              <div className={styles.manualInput}>
                <label className={styles.label}>Укажите модель вручную</label>
                <input
                  type="text"
                  value={manualModel}
                  onChange={(e) => setManualModel(e.target.value)}
                  placeholder="Например: Газель NN модификация"
                  className={styles.textInput}
                />
              </div>
            )}

            <div className={styles.controlsRow}>
              <button className={styles.backBtn} onClick={goBack}>
                Назад
              </button>
              <button className={styles.nextBtn} onClick={goNext}>
                Далее
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={styles.stepPane}>
            <div className={styles.label}>Выберите цвет</div>
            <div className={styles.colorsRow}>
              {COLORS.map((c) => (
                <button
                  key={c.name}
                  className={`${styles.colorSwatch} ${
                    color === c.name ? styles.colorSelected : ""
                  }`}
                  onClick={() => setColor(c.name)}
                  title={c.name}
                  style={{ background: c.css }}
                >
                  {color === c.name && (
                    <span className={styles.checkMark}>✓</span>
                  )}
                </button>
              ))}
            </div>

            <div className={styles.controlsRow}>
              <button className={styles.backBtn} onClick={goBack}>
                Назад
              </button>
              <button className={styles.nextBtn} onClick={goNext}>
                Далее
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className={styles.stepPane}>
            <label className={styles.label}>Телефон</label>
            <input
              type="tel"
              className={styles.textInput}
              placeholder="+7 (___) ___-__-__"
              value={phone}
              autoComplete="mobile tel"
              onChange={(e) => {
                setPhone(e.target.value);
                if (error) setError("");
              }}
            />

            <label className={styles.label}>Комментарий (опционально)</label>
            <textarea
              className={styles.textArea}
              placeholder="Укажите модель и год выпуска транспортного средства, тип каркаса (заводской/самодельный), требуемые размеры"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <PrivacyAgreementCheckbox
              id="order-privacy"
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

            <div className={styles.controlsRow}>
              <button className={styles.backBtn} onClick={goBack}>
                Назад
              </button>
              <button
                className={styles.orderBtn}
                onClick={() => {
                  if (!isAgreed) {
                    setCheckboxError(
                      "Необходимо согласие на обработку персональных данных",
                    );
                    const el = document.getElementById("order-privacy");
                    el?.focus();
                    return;
                  }
                  onSubmit();
                }}
              >
                Оформить заказ
              </button>
              {/* 🆕 МОДАЛКА */}
              {showMaxModal && (
                <div className={styles.modalOverlay}>
                  <div className={styles.modalCard}>
                    <div className={styles.modalTitle}>
                      Текст заказа скопирован
                    </div>

                    <div className={styles.modalText}>
                      Через 3 секунды откроется MAX. Вставьте сообщение в чат.
                    </div>

                    <textarea
                      className={styles.modalPreview}
                      readOnly
                      value={copiedText}
                    />

                    <div className={styles.modalActions}>
                      <button
                        className={styles.orderBtn}
                        onClick={() => {
                          if (autoOpenTimerRef.current) {
                            clearTimeout(autoOpenTimerRef.current);
                          }
                          openMaxChat();
                          setShowMaxModal(false);
                          onClose?.();
                        }}
                      >
                        Перейти в MAX
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <p className={styles.micro}>
              Откроется MAX — вы сможете проверить сообщение и отправить его в
              наш официальный чат.
            </p>
          </div>
        )}
      </div>

      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default Order;
