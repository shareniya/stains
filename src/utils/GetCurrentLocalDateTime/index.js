const GetCurrentLocalDateTime = () => {
  // to convert UTC time into our Malaysia local time 
  let date = new Date();
  date.setHours(date.getHours() + 8);
  let dateString = date.toISOString().slice(0, 19).replace("T", " ");

  return dateString;
}

export default GetCurrentLocalDateTime; 
