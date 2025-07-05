import { weekdays, SCHEDULE_TYPES } from "../../../constants/constants";
import { validateCronTime } from "../cronValidators";

export function parseWeekly(cronText, setStateHandlers) {
  const { setSelectedWeekdays, setDateTimeWeekly, setScheduleType } =
    setStateHandlers;

  const parts = cronText.trim().split(" ");
  if (parts.length !== 5) {
    return {
      error: "Invalid format",
      message: "Expected 5 parts in CRON expression.",
    };
  }

  const [minStr, hourStr, , , dayOfWeekStr] = parts;
  const min = parseInt(minStr, 10);
  const hour = parseInt(hourStr, 10);

  const timeValidationError = validateCronTime(hour, min, 0);
  if (timeValidationError) return timeValidationError;

  if (!/^(\d{1})(,\d{1})*$/.test(dayOfWeekStr)) {
    return { error: "Invalid days", message: "Invalid weekday format." };
  }

  const weekdayNumbers = dayOfWeekStr.split(",").map(Number);

  const selectedWeekdays = weekdayNumbers
    .map(
      (num) =>
        Object.entries(weekdays.map).find(([, value]) => value === num)?.[0]
    )
    .filter(Boolean);

  if (!selectedWeekdays.length) {
    return { error: "No weekdays", message: "No valid weekdays found." };
  }

  const date = new Date();
  date.setHours(parseInt(hour, 10));
  date.setMinutes(parseInt(min, 10));
  date.setSeconds(0);
  date.setMilliseconds(0);

  setSelectedWeekdays(selectedWeekdays);
  setDateTimeWeekly(date);
  setScheduleType(SCHEDULE_TYPES.WEEKLY);
  return { success: true };
}
