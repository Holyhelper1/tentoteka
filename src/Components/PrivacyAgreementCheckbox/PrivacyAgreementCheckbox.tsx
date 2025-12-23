// // components/PrivacyAgreementCheckbox/PrivacyAgreementCheckbox.tsx
// import React from 'react';
// import styles from './PrivacyAgreementCheckbox.module.css';
// import { Link } from 'react-router-dom';

// interface PrivacyAgreementCheckboxProps {
//   /** Состояние чекбокса */
//   checked: boolean;
//   /** Функция для изменения состояния */
//   onChange: (checked: boolean) => void;
//   /** ID для связи label с input */
//   id?: string;
//   /** Текст ошибки (если нужно отобразить) */
//   error?: string;
//   /** Дополнительный CSS-класс */
//   className?: string;
// }

// export const PrivacyAgreementCheckbox: React.FC<PrivacyAgreementCheckboxProps> = ({
//   checked,
//   onChange,
//   id = 'privacyAgreement',
//   error,
//   className = ''
// }) => {
//   return (
//     <div className={`${styles.checkboxContainer} ${className}`}>
//       <input
//         type="checkbox"
//         id={id}
//         checked={checked}
//         onChange={(e) => onChange(e.target.checked)}
//         className={styles.checkboxInput}
//         aria-invalid={!!error}
//         aria-describedby={error ? `${id}-error` : undefined}
//       />
//       <label htmlFor={id} className={styles.checkboxLabel}>
//         Я согласен на обработку персональных данных в соответствии с{' '}
//         <Link  to="/privacy" target="_blank" rel="noopener noreferrer" className={styles.checkboxLink}>
       
//           Политикой конфиденциальности
//         </Link>{' '}
//         и{' '}
//         <a 
//           href="/user-agreement" 
//           target="_blank" 
//           rel="noopener noreferrer"
//           className={styles.checkboxLink}
//         >
//           Пользовательским соглашением
//         </a>
//       </label>
      
//       {error && (
//         <div id={`${id}-error`} className={styles.checkboxError} role="alert">
//           {error}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PrivacyAgreementCheckbox;






// components/PrivacyAgreementCheckbox/PrivacyAgreementCheckbox.tsx
import React, { useState, useEffect } from 'react';
import styles from './PrivacyAgreementCheckbox.module.css';
import { Link } from 'react-router-dom';

interface PrivacyAgreementCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
  error?: string;
  className?: string;
  animateError?: boolean;
}

export const PrivacyAgreementCheckbox: React.FC<PrivacyAgreementCheckboxProps> = ({
  checked,
  onChange,
  id = 'privacyAgreement',
  error,
  className = '',
  animateError = true
}) => {
  const [showError, setShowError] = useState(false);
  const [hasErrorAnimation, setHasErrorAnimation] = useState(false);

 useEffect(() => {
  if (error) {
    setShowError(true);
    // анимация только если animateError === true
    setHasErrorAnimation(Boolean(animateError));
    if (animateError) {
      const timer = setTimeout(() => {
        setHasErrorAnimation(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  } else {
    setShowError(false);
    setHasErrorAnimation(false);
  }
}, [error, animateError]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const newValue = e.target.checked;
  onChange(newValue);

  // локально скрываем сообщение об ошибке сразу при чекке
  if (newValue) {
    setShowError(false);
    setHasErrorAnimation(false);
  }
};

  return (
    <div className={`${styles.checkboxContainer} ${className} ${showError ? styles.checkboxContainerError : ''} ${hasErrorAnimation ? styles.errorShake : ''}`}>
      <div className={styles.checkboxContent}>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={handleCheckboxChange}
          className={`${styles.checkboxInput} ${showError ? styles.checkboxInputError : ''}`}
          aria-invalid={showError}
          aria-describedby={showError ? `${id}-error` : undefined}
        />
        <label htmlFor={id} className={styles.checkboxLabel}>
          Я согласен на обработку персональных данных в соответствии с{' '}
          <Link 
            to="/privacy" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.checkboxLink}
          >
            Политикой конфиденциальности
          </Link>{' '}
          и{' '}
          <Link 
            to="/user-agreement" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.checkboxLink}
          >
            Пользовательским соглашением
          </Link>
        </label>
      </div>
      
      {showError && (
        <div 
          id={`${id}-error`} 
          className={`${styles.checkboxError} ${hasErrorAnimation ? styles.errorFadeIn : ''}`} 
          role="alert"
          aria-live="polite"
        >
          <span className={styles.errorIcon}>⚠</span>
          <span className={styles.errorText}>{error}</span>
        </div>
      )}
    </div>
  );
};

export default PrivacyAgreementCheckbox;