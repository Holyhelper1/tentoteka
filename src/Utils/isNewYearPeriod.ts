export const isNewYearPeriod = (): boolean => {
  const now = new Date();
  const month = now.getMonth(); // 0 - Январь, 11 - Декабрь
  const day = now.getDate();

  // Декабрь (11)
  if (month === 11) return true;
  // Январь (0) до 10 числа включительно
  if (month === 0 && day <= 10) return true;

  return false;
};
export const showSnow = (): boolean => {
  const now = new Date();
  const month = now.getMonth(); // 0-январь, 11-декабрь

  // Декабрь (месяц 11) - весь месяц
  if (month === 11 ) return true;
  
  // Январь (месяц 0) - весь месяц
  if (month === 0) return true;
  
  // Февраль (месяц 1) - весь месяц
  if (month === 1) return true;

  return false;
};