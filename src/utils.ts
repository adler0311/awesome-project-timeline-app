// Thu Nov 21 2019
export const convertToDateString = (dateObject: Date) => {
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();

  return `${year}/${month}/${day}`;
};
