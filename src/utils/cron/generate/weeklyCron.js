import { weekdays } from "../../../constants/constants";

export function generateWeeklyCron(selectedWeekdays, dateTimeWeekly) {
  const errors = {};
  if (!selectedWeekdays?.length) {
    errors.selectedWeekdays = "Please select at least one weekday";
  }
  if (!dateTimeWeekly) {
    errors.dateTimeWeekly = "Please select a time";
  }

  if (Object.keys(errors).length) {
    return {
      error: "weekly",
      message: "Please complete all required fields",
      details: errors,
    };
  }

  const days = selectedWeekdays.map((day) => weekdays.map[day]);
  const hour = dateTimeWeekly.getHours();
  const minute = dateTimeWeekly.getMinutes();

  return `${minute} ${hour} * * ${days.join(",")}`;
}
