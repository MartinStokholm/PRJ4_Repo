export function Sorting(data, day) {
  switch (day) {
    case "Monday":
      var Day = data?.monday;
      break;
    case "Tuesday":
      var Day = data?.tuesday;
      break;
    case "Wednesday":
      var Day = data?.wednesday;
      break;
    case "Thursday":
      var Day = data?.thursday;
      break;
    case "Friday":
      var Day = data?.friday;
      break;
    case "Saturday":
      var Day = data?.saturday;
      break;
    case "Sunday":
      var Day = data?.sunday;
      break;
    default:
      break;
  }
  return Day;
}
