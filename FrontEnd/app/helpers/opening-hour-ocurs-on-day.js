import { helper } from '@ember/component/helper';

export default helper(function openingHourOcursOnDay(params/*, hash*/) {
  let [openingHour, dayIndexToCheck] = params
  for (const day of openingHour.opening_hour_days_attributes) {
    if (day.day_int == dayIndexToCheck)
      return true
  }
  return false
});
