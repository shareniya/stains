const DateToString = (date) => {
  // parse to ISO 8061 Date object
  date = new Date(date);
  // convert date object to YYYY-MM-DD string
  // use UTC date to avoid timezone issue
  return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
};

export default DateToString;