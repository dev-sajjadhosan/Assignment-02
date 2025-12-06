export const getDate = (date: string) => {
  const dateValue = new Date(date).getDate();
  return dateValue;
};

export const getTimeFormate = (date: string) => {
  const result = new Date(date).toLocaleDateString('fr-CA');
  return result;
};
