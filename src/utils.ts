// Thu Nov 21 2019
export const convertToDateString = (dateObject: Date) => {
  if (!dateObject) return '';

  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  let day = dateObject.getDate();

  return `${year}/${month}/${day.toString().length < 2 ? `0${day}` : `${day}`}`;
};
