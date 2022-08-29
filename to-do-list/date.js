exports.date = function () {
  let date = new Date();
  let option = {
    weekday: "long",
    day: "numeric",
    year: "numeric",
    month: "long",
  };
  let day = date.toLocaleDateString("en-US", option);
  return day;
};

exports.time = function () {
  let date = new Date();

  let hour = date.getHours();
  let min = date.getMinutes();
  hour = hour > 12 ? hour - 12 : hour;
  let zone = hour > 12 ? "PM" : "AM";

  let time = hour + ":" + min + zone;
  return time;
};
