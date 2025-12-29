import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';
import { RiHomeLine } from 'react-icons/ri';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { PATH_NAMES } from '../../Constants/pathnames';

const NotFoundPage = () => {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.content}>
        {/* Анимированный номер 404 */}
        <div className={styles.errorNumber}>
          <span className={styles.number}>4</span>
          <span className={styles.number}>0</span>
          <span className={styles.number}>4</span>
        </div>

        {/* Иллюстрация тента/палатки */}
        <div className={styles.tentIllustration}>
          <div className={styles.tent}>
            <div className={styles.tentRoof}></div>
            <div className={styles.tentBase}></div>
            <div className={styles.tentDoor}></div>
            <div className={styles.tentPole}></div>
            <div className={styles.tentPoleRight}></div>
          </div>
          <div className={styles.tentShadow}></div>
        </div>

        {/* Текст ошибки */}
        <div className={styles.errorText}>
          <h1 className={styles.title}>Ой! Страница спряталась под тентом</h1>
          <p className={styles.subtitle}>
            Возможно, страница переехала, была удалена или вы ввели неверный адрес.
            Но не расстраивайтесь! У нас есть много других качественных тентов для вас.
          </p>
        </div>

        {/* Кнопки действий */}
        <div className={styles.actionButtons}>
          <Link to="/tentoteka" className={styles.primaryButton}>
            <RiHomeLine className={styles.buttonIcon} />
            На главную
          </Link>
          <button 
            className={styles.secondaryButton}
            onClick={() => window.history.back()}
          >
            <HiOutlineArrowLeft className={styles.buttonIcon} />
            Вернуться назад
          </button>
        </div>

        {/* Дополнительные ссылки */}
        <div className={styles.helpfulLinks}>
          <p className={styles.helpText}>Возможно, вы искали:</p>
          <div className={styles.links}>
            {/* <Link to="/catalog" className={styles.helpLink}>Каталог тентов</Link> */}
            {/* <Link to={PATH_NAMES.PORTFOLIO} className={styles.helpLink}>Результаты работ</Link> */}
            <Link to={PATH_NAMES.CONTACTS} className={styles.helpLink}>Контакты</Link>
            {/* <Link to="/delivery" className={styles.helpLink}>Доставка и оплата</Link> */}
          </div>
        </div>

        {/* Декоративные элементы */}
        <div className={styles.decorativeElements}>
          <div className={styles.circle}></div>
          <div className={styles.square}></div>
          <div className={styles.triangle}></div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;