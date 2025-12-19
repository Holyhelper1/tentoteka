import React, { useEffect } from "react";
import styles from "./order.module.css";
import Auto from "./icon/auto.png";
import Cart from "./icon/cart.png";

type VehicleType = "auto" | "trailer";

interface OrderProps {
  onClose?: () => void;
}

const MODELS: Record<VehicleType, string[]> = {
  auto: [
    "Газель 4.25",
    "Газель Бизнес 4.25",
    "Соболь 2.17",
    "УАЗ 39094",
    "Другой (ввести вручную)"
  ],
  trailer: [
    "Трейлер 82942T",
    "Трейлер Аэро 8294",
    "Прицеп малый 120x200",
    "Прицеп средний 170x270",
    "Другой (ввести вручную)"
  ]
};

const COLORS: { name: string; css: string }[] = [
  { name: "Серый", css: "#7d8aa3" },
  { name: "Синий", css: "#0d3483" },
  { name: "Хаки", css: "#78866b" },
  { name: "Чёрный", css: "#1b1b1b" },
];

const TELEGRAM_USERNAME = "tentoteka_zakaz";

const Order: React.FC<OrderProps> = ({ onClose }) => {
  // ... (оставляем логику шагов из предыдущего варианта)
  // Для краткости — вставляю код из предыдущей версии, только добавлю кнопку закрытия и esc:

  const [step, setStep] = React.useState<number>(0);
  const [type, setType] = React.useState<VehicleType | null>(null);
  const [model, setModel] = React.useState<string>("");
  const [manualModel, setManualModel] = React.useState<string>("");
  const [color, setColor] = React.useState<string>(COLORS[0].name);
  const [phone, setPhone] = React.useState<string>("");
  const [comment, setComment] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

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

  const onSubmit = () => {
    setError("");
    if (!validatePhone(phone)) {
      setError("Введите корректный телефон в формате +7 (XXX) XXX XX XX");
      setStep(3);
      return;
    }

    const chosenModel = model === "Другой (ввести вручную)" ? manualModel || "Указан вручную" : model;
    const normalizedPhone = normalizePhone(phone);

    const message = [
      "Заказ с сайта — ТЕНТОТЕКА",
      `Тип: ${type === "auto" ? "Авто" : "Прицеп"}`,
      `Модель: ${chosenModel}`,
      `Цвет: ${color}`,
      `Телефон: ${normalizedPhone}`,
      comment ? `Комментарий: ${comment}` : "Комментарий: -"
    ].join("\n");

    const url = `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(message)}`;

    const newWindow = window.open(url, "_blank");
    if (!newWindow) {
      window.location.href = url;
    }

    // закрываем модалку (если нужно)
    onClose?.();
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div>
            <h3 className={styles.title}>Подбор и заказ тента</h3>
            <p className={styles.subtitle}>Выберите тип транспорта и оформите заказ</p>
          </div>

          {/* close button */}
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
        <div className={`${styles.step} ${step === 0 ? styles.active : ""}`}>1. Тип</div>
        <div className={`${styles.step} ${step === 1 ? styles.active : ""}`}>2. Модель</div>
        <div className={`${styles.step} ${step === 2 ? styles.active : ""}`}>3. Цвет</div>
        <div className={`${styles.step} ${step === 3 ? styles.active : ""}`}>4. Контакт</div>
      </div>

      <div className={styles.content}>
        {step === 0 && (
          <div className={styles.stepPane}>
            <div className={styles.optionsRow}>
              <button
                className={`${styles.typeCard} ${type === "auto" ? styles.selected : ""}`}
                onClick={() => onSelectType("auto")}
                aria-pressed={type === "auto"}
                aria-label="Выбрать авто"
              >
                <div className={styles.typeIcon}><img src={Auto} alt="Auto" width={80}/></div>
                <div className={styles.typeLabel}>Тент на автомобиль</div>
                <div className={styles.typeHint}>ГАЗель, Соболь, УАЗ и др.</div>
              </button>

              <button
                className={`${styles.typeCard} ${type === "trailer" ? styles.selected : ""}`}
                onClick={() => onSelectType("trailer")}
                aria-pressed={type === "trailer"}
                aria-label="Выбрать прицеп"
              >
                <div className={styles.typeIcon}><img src={Cart} alt="Auto" width={80}/></div>
                <div className={styles.typeLabel}>Тент на прицеп</div>
                <div className={styles.typeHint}>МЗСА, КМЗ, ТИТАН, ИЗЛП и др.</div>
              </button>
            </div>

            <div className={styles.controlsRow}>
              <button className={styles.nextBtn} onClick={goNext}>Далее</button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className={styles.stepPane}>
            <div className={styles.modelsScroll} role="list">
              {modelsForType.map((m) => (
                <label
                  key={m}
                  className={`${styles.modelCard} ${model === m ? styles.selectedModel : ""}`}
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
                  <div className={styles.modelTitle}>{m}</div>
                  <div className={styles.modelMeta}>Подходит под выбранный тип</div>
                </label>
              ))}
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
              <button className={styles.backBtn} onClick={goBack}>Назад</button>
              <button className={styles.nextBtn} onClick={goNext}>Далее</button>
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
                  className={`${styles.colorSwatch} ${color === c.name ? styles.colorSelected : ""}`}
                  onClick={() => setColor(c.name)}
                  title={c.name}
                  style={{ background: c.css }}
                >
                  {color === c.name && <span className={styles.checkMark}>✓</span>}
                </button>
              ))}
            </div>

            <div className={styles.controlsRow}>
              <button className={styles.backBtn} onClick={goBack}>Назад</button>
              <button className={styles.nextBtn} onClick={goNext}>Далее</button>
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
              autoComplete='mobile tel'
              onChange={(e) => setPhone(e.target.value)}
            />

            <label className={styles.label}>Комментарий (опционально)</label>
            <textarea
              className={styles.textArea}
              placeholder="Укажите дополнительные пожелания"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <div className={styles.controlsRow}>
              <button className={styles.backBtn} onClick={goBack}>Назад</button>
              <button className={styles.orderBtn} onClick={onSubmit}>Заказать тент</button>
            </div>

            <p className={styles.micro}>Откроется Telegram — вы сможете проверить сообщение и отправить его в наш официальный чат.</p>
          </div>
        )}
      </div>

      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default Order;
