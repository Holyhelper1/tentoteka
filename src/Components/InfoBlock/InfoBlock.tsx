// import styles from './InfoBlock.module.css';
// export const InfoBlock = () => {

//     return (
//         <div className={styles.info_Block_container}>
//         <div className={styles.infoGrid}>
//           <div className={styles.infoItem}>
//             <h3 className={styles.infoTitle}>Собственное производство</h3>
//             <p className={styles.infoText}>Все тенты изготавливаем на собственном оборудовании</p>
//           </div>
//           <div className={styles.infoItem}>
//             <h3 className={styles.infoTitle}>Команда профессионалов</h3>
//             <p className={styles.infoText}>Опытные мастера с многолетним стажем работы</p>
//           </div>
//           <div className={styles.infoItem}>
//             <h3 className={styles.infoTitle}>Контроль качества</h3>
//             <p className={styles.infoText}>Каждый тент проходит тщательную проверку</p>
//           </div>
//           <div className={styles.infoItem}>
//             <h3 className={styles.infoTitle}>Современные материалы</h3>
//             <p className={styles.infoText}>Используем только качественные и долговечные материалы</p>
//           </div>
//         </div>
//       </div>
//     )
//   }


import React from 'react';
import styles from './InfoBlock.module.css';
import { 
  FaTools,
  FaUserTie,
  FaClipboardCheck,
  FaCube 
} from 'react-icons/fa';
import { useIntersectionObserver } from '../../Hooks/useIntersectionObserver';

export const InfoBlock = () => {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  const blocks = [
    {
      title: "Собственное производство",
      text: "Все тенты изготавливаем на собственном оборудовании",
      icon: <FaTools />,
      color: "#86afee"
    },
    {
      title: "Команда профессионалов",
      text: "Опытные мастера с многолетним стажем работы",
      icon: <FaUserTie />,
      color: "#1a5fb4"
    },
    {
      title: "Контроль качества",
      text: "Каждый тент проходит тщательную проверку",
      icon: <FaClipboardCheck />,
      color: "#28a745"
    },
    {
      title: "Современные материалы",
      text: "Используем только качественные и долговечные материалы",
      icon: <FaCube  />,
      color: "#e65206"
    }
  ];

  return (
    <div className={styles.info_Block_container} ref={elementRef}>
      <div className={styles.infoGrid}>
        {blocks.map((block, index) => (
          <div 
            key={index}
            className={`${styles.infoItem} ${isVisible ? styles.fadeIn : ''}`}
            style={{
             animationDelay: isVisible ? `${index * 0.1}s` : '0s',
              '--icon-color': block.color
            } as React.CSSProperties}
          >
            <div className={styles.iconWrapper}>
              <div 
                className={styles.iconCircle}
                style={{ backgroundColor: `${block.color}15` }}
              >
                <div 
                  className={styles.iconInner}
                  style={{ color: block.color }}
                >
                  {block.icon}
                </div>
              </div>
            </div>
            <h3 className={styles.infoTitle}>{block.title}</h3>
            <p className={styles.infoText}>{block.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};