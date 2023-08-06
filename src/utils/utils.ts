interface Month {
  [key: number]: string;
}
//utils function
const month: Month = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

//format date
export const formatDateWithMonth = (date: Date):string => {
  const data = new Date(date);
  return `${month[data.getMonth()]} ${data.getDate()}, ${data.getFullYear()}`;
};

//format date function
export const formatDate = (dateForFormat:Date):string => {
  const data = new Date(dateForFormat);
  let month: number | string = data.getMonth();
  ++month;
  month = month.toString();
  let date: number | string = data.getDate();
  date = date.toString();
  const year = data.getFullYear();
  let monthToRender = month.length === 1 ? `0${month}` : `${month}`;
  let dateToRender = date.length === 1 ? `0${date}` : `${date}`;
  return `${year}/${monthToRender}/${dateToRender}`;
};

