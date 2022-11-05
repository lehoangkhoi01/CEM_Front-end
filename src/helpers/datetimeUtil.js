export const convertDateTimeToString = (datetime) => {
  const stringMonths = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var date = datetime.split(" ")[0];
  var year = date.split("-")[0];
  var month = date.split("-")[1];
  var day = date.split("-")[2];

  return stringMonths[Number.parseInt(month) - 1] + " " + day + ", " + year;
};
