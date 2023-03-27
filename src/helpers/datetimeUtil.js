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

export const convertFullDateTime = (datetime) => {
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

  if (datetime !== undefined) {
    var date = datetime.split(" ")[0];
    var time = datetime.split(" ")[1].substr(0, 8);
    var year = date.split("-")[0];
    var month = date.split("-")[1];
    var day = date.split("-")[2];
    return (
      stringMonths[Number.parseInt(month) - 1] +
      " " +
      day +
      ", " +
      year +
      "   " +
      time
    );
  } else return "";
};

export const convertDatatime = (datetime) => {
  //Input format: 2022-07-14T09:00:00+07:00
  var date = datetime.split("T")[0];
  var year = date.split("-")[0];
  var month = date.split("-")[1];
  var day = date.split("-")[2];

  var timeString = datetime.split("T")[1];
  var time = timeString.split("+")[0];

  return (
    stringMonths[Number.parseInt(month) - 1] +
    " " +
    day +
    ", " +
    year +
    "   " +
    time.substr(0, 8)
  );
};
