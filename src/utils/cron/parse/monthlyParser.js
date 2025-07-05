import { months, SCHEDULE_TYPES } from "../../../constants/constants";
import { validateCronTime } from "../cronValidators";

export function parseMonthly(cronText, setStateHandlers) {
  const {
    setDayOfMonth,
    setSelectedMonths,
    setdateTimeMonthy,
    setScheduleType,
  } = setStateHandlers;

  const parts = cronText.trim().split(" ");
  if (parts.length !== 5) {
    return {
      error: "format",
      message: "Invalid CRON format: Expected 5 parts for monthly schedule.",
    };
  }

  const [minStr, hourStr, dayStr, monthStr, dayOfWeek] = parts;
  const min = parseInt(minStr, 10);
  const hour = parseInt(hourStr, 10);
  const day = parseInt(dayStr, 10);

  const timeValidationError = validateCronTime(hour, min, 0);
  if (timeValidationError) return timeValidationError;

  if (
    isNaN(day) ||
    !/^(\d{1,2})(,\d{1,2})*$/.test(monthStr) ||
    dayOfWeek !== "*"
  ) {
    return {
      error: "format",
      message: "Invalid monthly CRON structure or values.",
    };
  }

  const monthNumbers = monthStr.split(",").map(Number);

  const selectedMonthNames = monthNumbers
    .map(
      (num) => Object.entries(months.map).find(([, val]) => val === num)?.[0]
    )
    .filter(Boolean);

  if (!selectedMonthNames.length) {
    return {
      error: "months",
      message: "No valid month values were found.",
    };
  }

  const hasFeb = monthNumbers.includes(2);
  const has30DayMonth = monthNumbers.some((m) => [4, 6, 9, 11].includes(m));
  const has31DayMonth = monthNumbers.some((m) =>
    [1, 3, 5, 7, 8, 10, 12].includes(m)
  );

  let maxValidDay = 0;
  if (hasFeb) {
    maxValidDay = 28;
  } else if (has30DayMonth) {
    maxValidDay = 30;
  } else if (has31DayMonth) {
    maxValidDay = 31;
  } else {
    return {
      error: "months",
      message: "Unknown month configuration.",
    };
  }

  if (day < 1 || day > maxValidDay) {
    return {
      error: "dayOfMonth",
      message: `Day must be between 1 and ${maxValidDay} based on selected months.`,
      details: {
        dayOfMonth: `Must be between 1 and ${maxValidDay}`,
      },
    };
  }

  const date = new Date();
  date.setHours(parseInt(hour, 10));
  date.setMinutes(parseInt(min, 10));
  date.setSeconds(0);
  date.setMilliseconds(0);

  setDayOfMonth(day.toString());
  setSelectedMonths(selectedMonthNames);
  setdateTimeMonthy(date);
  setScheduleType(SCHEDULE_TYPES.MONTHLY);
  return { success: true };
}
