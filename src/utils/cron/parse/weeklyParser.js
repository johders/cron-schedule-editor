import { weekdays, SCHEDULE_TYPES } from "../../../constants/constants";
import { validateCronTime } from "../cronValidators";

export function parseWeekly(
  cronText,
  { setSelectedWeekdays, setDateTimeWeekly, setScheduleType }
) {
  const cronParts = parseCronParts(cronText);
  if (cronParts.error) return cronParts;

  const { minStr, hourStr, dayOfWeekStr } = cronParts;

  const timeResult = validateAndConvertTime(minStr, hourStr);
  if (timeResult.error) return timeResult;

  const weekdayResult = parseAndValidateWeekdays(dayOfWeekStr);
  if (weekdayResult.error) return weekdayResult;

  setSelectedWeekdays(weekdayResult.selectedWeekdays);
  setDateTimeWeekly(timeResult.date);
  setScheduleType(SCHEDULE_TYPES.WEEKLY);

  return { success: true };
}

function parseCronParts(cronText) {
  const parts = cronText.trim().split(" ");
  if (parts.length !== 5) {
    return {
      error: "Invalid format",
      message: "Expected 5 parts in CRON expression.",
    };
  }

  const [minStr, hourStr, , , dayOfWeekStr] = parts;
  return { minStr, hourStr, dayOfWeekStr };
}

function validateAndConvertTime(minStr, hourStr) {
  const min = parseInt(minStr, 10);
  const hour = parseInt(hourStr, 10);

  const timeValidationError = validateCronTime(hour, min, 0);
  if (timeValidationError) return timeValidationError;

  const date = new Date();
  date.setHours(hour, min, 0, 0);

  return { date };
}

function parseAndValidateWeekdays(dayOfWeekStr) {
  if (!/^([0-6])(,[0-6])*$/.test(dayOfWeekStr)) {
    return {
      error: "Invalid days",
      message: "Invalid weekday format. Allowed values are 0-6.",
    };
  }

  const weekdayNumbers = dayOfWeekStr.split(",").map(Number);

  const uniqueWeekdays = new Set(weekdayNumbers);
  if (uniqueWeekdays.size !== weekdayNumbers.length) {
    return {
      error: "Duplicate days",
      message: "Duplicate weekdays are not allowed.",
    };
  }

  const selectedWeekdays = weekdayNumbers
    .map(
      (num) =>
        Object.entries(weekdays.map).find(([, value]) => value === num)?.[0]
    )
    .filter(Boolean);

  if (!selectedWeekdays.length) {
    return {
      error: "No weekdays",
      message: "No valid weekdays found.",
    };
  }

  return { selectedWeekdays };
}
