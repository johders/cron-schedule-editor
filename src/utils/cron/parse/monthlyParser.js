import { months, SCHEDULE_TYPES } from "../../../constants/constants";
import { validateCronTime } from "../cronValidators";

export function parseMonthly(
  cronText,
  { setDayOfMonth, setSelectedMonths, setdateTimeMonthly, setScheduleType }
) {
  const parts = parseCronParts(cronText);
  if (Array.isArray(parts) === false) return parts;

  const [minStr, hourStr, dayStr, monthStr, dayOfWeek] = parts;

  const structureResult = validateStructure(
    minStr,
    hourStr,
    dayStr,
    monthStr,
    dayOfWeek
  );
  if (structureResult.error) return structureResult;

  const { min, hour, day } = structureResult;

  const monthMapping = mapMonths(monthStr);
  if (monthMapping.error) return monthMapping;

  const { monthNumbers, selectedMonthNames } = monthMapping;

  const dayValidationError = validateDayOfMonth(day, monthNumbers);
  if (dayValidationError) return dayValidationError;

  const date = buildMonthlyDate(hour, min);

  setDayOfMonth(day.toString());
  setSelectedMonths(selectedMonthNames);
  setdateTimeMonthly(date);
  setScheduleType(SCHEDULE_TYPES.MONTHLY);

  return { success: true };
}

function parseCronParts(cronText) {
  const parts = cronText.trim().split(" ");
  if (parts.length !== 5) {
    return {
      error: "format",
      message: "Invalid CRON format: Expected 5 parts for monthly schedule.",
    };
  }
  return parts;
}

function validateStructure(minStr, hourStr, dayStr, monthStr, dayOfWeek) {
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

  return { min, hour, day };
}

function mapMonths(monthStr) {
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

  return { monthNumbers, selectedMonthNames };
}

function validateDayOfMonth(day, monthNumbers) {
  const hasFeb = monthNumbers.includes(2);
  const has30 = monthNumbers.some((m) => [4, 6, 9, 11].includes(m));
  const has31 = monthNumbers.some((m) => [1, 3, 5, 7, 8, 10, 12].includes(m));

  let maxDay = 0;
  if (hasFeb) {
    maxDay = 28;
  } else if (has30) {
    maxDay = 30;
  } else if (has31) {
    maxDay = 31;
  } else {
    return {
      error: "months",
      message: "Unknown month configuration.",
    };
  }

  if (day < 1 || day > maxDay) {
    return {
      error: "dayOfMonth",
      message: `Day must be between 1 and ${maxDay} based on selected months.`,
      details: {
        dayOfMonth: `Must be between 1 and ${maxDay}`,
      },
    };
  }

  return null;
}

function buildMonthlyDate(hour, min) {
  const date = new Date();
  date.setHours(hour, min, 0, 0);
  return date;
}
