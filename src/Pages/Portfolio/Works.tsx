import React, { useState } from 'react';
import styles from './Works.module.css';
import { 
  FaImage, 
  FaStar, 
  FaFilter, 
  FaChevronLeft, 
  FaChevronRight,
  FaTimes,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaTruck,
  FaCar
} from 'react-icons/fa';

interface WorkItem {
  id: number;
  image: string;
  title: string;
  category: 'auto' | 'trailer' | 'feedback';
  description?: string;
  date?: string;
  model?: string;
  features?: string[];
  rating?: number;
  clientName?: string;
}

const Works: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'auto' | 'trailer' | 'feedback'>('all');
  const [selectedImage, setSelectedImage] = useState<WorkItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Моковые данные для примера
  const works: WorkItem[] = [
    {
      id: 1,
      image: '/works/tent-1.jpg',
      title: 'Тент на ГАЗель NEXT',
      category: 'auto',
      description: 'Изготовление и установка тента на ГАЗель NEXT. Использован материал повышенной прочности.',
      date: 'Декабрь 2024',
      model: 'ГАЗель NEXT',
      features: ['Материал Oxford 600D', 'Усиленные крепления', 'Защита от УФ-лучей']
    },
    {
      id: 2,
      image: '/works/tent-2.jpg',
      title: 'Тент на прицеп КМЗ',
      category: 'trailer',
      description: 'Кастомизированный тент для прицепа КМЗ с дополнительными карманами для инструментов.',
      date: 'Ноябрь 2024',
      model: 'Прицеп КМЗ 8284',
      features: ['Влагостойкий материал', 'Усиленные стропы', 'Светоотражающие элементы']
    },
    {
      id: 3,
      image: '/works/feedback-1.jpg',
      title: 'Отзыв от ООО "ТрансЛогистик"',
      category: 'feedback',
      description: 'Работали с тентотекой более 2 лет. Качество тентов на высшем уровне, сроки соблюдаются всегда.',
      rating: 5,
      clientName: 'ООО "ТрансЛогистик"'
    },
    {
      id: 4,
      image: '/works/tent-3.jpg',
      title: 'Тент на УАЗ 3909',
      category: 'auto',
      description: 'Тент для УАЗ с улучшенной системой крепления. Отлично подходит для перевозки строительных материалов.',
      date: 'Октябрь 2024',
      model: 'УАЗ 3909',
      features: ['Повышенная износостойкость', 'Антигрибковая пропитка', 'Морозоустойчивость до -40°C']
    },
    {
      id: 5,
      image: '/works/tent-4.jpg',
      title: 'Тент на трейлер MZSA',
      category: 'trailer',
      description: 'Большой тент для грузового трейлера с системой быстрого монтажа/демонтажа.',
      date: 'Сентябрь 2024',
      model: 'Трейлер MZSA 9420',
      features: ['Быстросъемная система', 'Усиленные люверсы', 'Защита от выцветания']
    },
    {
      id: 6,
      image: '/works/feedback-2.jpg',
      title: 'Отзыв от ИП Сидоров',
      category: 'feedback',
      description: 'Заказал тент на ГАЗель, сделали быстро и качественно. Рекомендую!',
      rating: 5,
      clientName: 'ИП Сидоров А.В.'
    },
    {
      id: 7,
      image: '/works/tent-5.jpg',
      title: 'Тент на Соболь',
      category: 'auto',
      description: 'Компактный тент для Соболя с улучшенной аэродинамикой.',
      date: 'Август 2024',
      model: 'ГАЗ Соболь',
      features: ['Облегченный материал', 'Аэродинамический козырек', 'Съемные боковины']
    },
    {
      id: 8,
      image: '/works/tent-6.jpg',
      title: 'Тент на прицеп ТИТАН',
      category: 'trailer',
      description: 'Профессиональный тент для грузового прицепа с дополнительной защитой от влаги.',
      date: 'Июль 2024',
      model: 'Прицеп ТИТАН 12м',
      features: ['Герметичные швы', 'Двойной слой материала', 'Металлические кольца']
    }
  ];

  const filteredWorks = selectedCategory === 'all' 
    ? works 
    : works.filter(work => work.category === selectedCategory);

  const openImage = (work: WorkItem, index: number) => {
    setSelectedImage(work);
    setCurrentIndex(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    const currentFilteredWorks = selectedCategory === 'all' 
      ? works 
      : works.filter(work => work.category === selectedCategory);
    
    let newIndex = currentIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? currentFilteredWorks.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === currentFilteredWorks.length - 1 ? 0 : currentIndex + 1;
    }
    
    setCurrentIndex(newIndex);
    setSelectedImage(currentFilteredWorks[newIndex]);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'auto': return <FaCar />;
      case 'trailer': return <FaTruck />;
      case 'feedback': return <FaStar />;
      default: return <FaImage />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'auto': return 'Автомобили';
      case 'trailer': return 'Прицепы';
      case 'feedback': return 'Отзывы';
      default: return 'Все работы';
    }
  };

  return (
    <div className={styles.worksContainer}>
      <header className={styles.worksHeader}>
        <h1 className={styles.pageTitle}>Результаты работ</h1>
        <p className={styles.pageSubtitle}>
          Посмотрите наши выполненные проекты и отзывы довольных клиентов
        </p>
      </header>

      {/* Фильтры по категориям */}
      <div className={styles.filtersSection}>
        <div className={styles.filtersHeader}>
          <FaFilter className={styles.filterIcon} />
          <h2 className={styles.sectionTitle}>Фильтр работ</h2>
        </div>
        
        <div className={styles.filterButtons}>
          <button
            className={`${styles.filterButton} ${selectedCategory === 'all' ? styles.active : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            Все работы
          </button>
          <button
            className={`${styles.filterButton} ${selectedCategory === 'auto' ? styles.active : ''}`}
            onClick={() => setSelectedCategory('auto')}
          >
            <FaCar /> Автомобили
          </button>
          <button
            className={`${styles.filterButton} ${selectedCategory === 'trailer' ? styles.active : ''}`}
            onClick={() => setSelectedCategory('trailer')}
          >
            <FaTruck /> Прицепы
          </button>
          <button
            className={`${styles.filterButton} ${selectedCategory === 'feedback' ? styles.active : ''}`}
            onClick={() => setSelectedCategory('feedback')}
          >
            <FaStar /> Отзывы
          </button>
        </div>
      </div>

      {/* Сетка работ */}
      <div className={styles.worksGrid}>
        {filteredWorks.map((work, index) => (
          <div 
            key={work.id} 
            className={`${styles.workCard} ${work.category === 'feedback' ? styles.feedbackCard : ''}`}
            onClick={() => openImage(work, index)}
          >
            <div className={styles.workImageContainer}>
              <div className={styles.imagePlaceholder}>
                <div className={styles.categoryBadge}>
                  {getCategoryIcon(work.category)}
                  <span>{getCategoryLabel(work.category)}</span>
                </div>
                <div className={styles.imageOverlay}>
                  <FaExternalLinkAlt className={styles.viewIcon} />
                  <span className={styles.viewText}>Посмотреть</span>
                </div>
              </div>
            </div>
            
            <div className={styles.workInfo}>
              <h3 className={styles.workTitle}>{work.title}</h3>
              
              {work.category !== 'feedback' && (
                <div className={styles.workMeta}>
                  {work.model && (
                    <div className={styles.metaItem}>
                      <FaCar />
                      <span>{work.model}</span>
                    </div>
                  )}
                  {work.date && (
                    <div className={styles.metaItem}>
                      <FaCalendarAlt />
                      <span>{work.date}</span>
                    </div>
                  )}
                </div>
              )}
              
              {work.category === 'feedback' && work.rating && (
                <div className={styles.rating}>
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={`${styles.star} ${i < work.rating! ? styles.filled : ''}`}
                    />
                  ))}
                  {work.clientName && (
                    <span className={styles.clientName}>{work.clientName}</span>
                  )}
                </div>
              )}
              
              {work.description && (
                <p className={styles.workDescription}>{work.description}</p>
              )}
              
              {work.features && work.features.length > 0 && (
                <ul className={styles.featuresList}>
                  {work.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className={styles.featureItem}>{feature}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Статистика */}
      <div className={styles.statsSection}>
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>150+</div>
            <div className={styles.statLabel}>Выполненных заказов</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>98%</div>
            <div className={styles.statLabel}>Довольных клиентов</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>5 лет</div>
            <div className={styles.statLabel}>Опыта работы</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>24/7</div>
            <div className={styles.statLabel}>Поддержка клиентов</div>
          </div>
        </div>
      </div>

      {/* Модальное окно для просмотра изображения */}
      {selectedImage && (
        <div className={styles.modalOverlay} onClick={closeImage}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.closeModal} onClick={closeImage}>
              <FaTimes />
            </button>
            
            <button 
              className={styles.navButton} 
              onClick={() => navigateImage('prev')}
              style={{ left: '20px' }}
            >
              <FaChevronLeft />
            </button>
            
            <button 
              className={styles.navButton} 
              onClick={() => navigateImage('next')}
              style={{ right: '20px' }}
            >
              <FaChevronRight />
            </button>
            
            <div className={styles.modalImageContainer}>
              <div className={styles.modalImagePlaceholder}>
                <div className={styles.imageInfo}>
                  <h3 className={styles.modalTitle}>{selectedImage.title}</h3>
                  
                  {selectedImage.category !== 'feedback' && selectedImage.model && (
                    <div className={styles.modalMeta}>
                      <div className={styles.modalMetaItem}>
                        <strong>Модель:</strong> {selectedImage.model}
                      </div>
                      {selectedImage.date && (
                        <div className={styles.modalMetaItem}>
                          <strong>Дата:</strong> {selectedImage.date}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {selectedImage.category === 'feedback' && (
                    <div className={styles.feedbackDetails}>
                      {selectedImage.rating && (
                        <div className={styles.modalRating}>
                          {[...Array(5)].map((_, i) => (
                            <FaStar 
                              key={i} 
                              className={`${styles.star} ${i < selectedImage.rating! ? styles.filled : ''}`}
                            />
                          ))}
                        </div>
                      )}
                      {selectedImage.clientName && (
                        <div className={styles.modalClient}>
                          <strong>Клиент:</strong> {selectedImage.clientName}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className={styles.modalDescription}>
              {selectedImage.description && (
                <p>{selectedImage.description}</p>
              )}
              
              {selectedImage.features && selectedImage.features.length > 0 && (
                <div className={styles.modalFeatures}>
                  <h4>Особенности:</h4>
                  <ul>
                    {selectedImage.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className={styles.modalCounter}>
              {currentIndex + 1} / {filteredWorks.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Works;