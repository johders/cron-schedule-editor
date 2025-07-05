import { SCHEDULE_TYPES } from "../../../constants/constants";
import { validateCronTime } from "../cronValidators";

export function parseDaily(
  cronText,
  { setDailyTime1, setDailyTime2, setScheduleType }
) {
  const partsList = splitCronParts(cronText);

  const countError = validateCronEntryCount(partsList);
  if (countError) return countError;

  const times = [];

  for (let i = 0; i < partsList.length; i++) {
    const result = parseCronTimePart(partsList[i], i);
    if (result?.error) return result;
    times.push(result);
  }

  setDailyTime1(times[0] || null);
  setDailyTime2(times[1] || null);
  setScheduleType(SCHEDULE_TYPES.DAILY);

  return { success: true };
}

function splitCronParts(cronText) {
  return cronText.includes("|")
    ? cronText.split("|").map((p) => p.trim())
    : [cronText.trim()];
}

function validateCronEntryCount(partsList) {
  if (partsList.length > 2) {
    return {
      error: "format",
      message: "Too many daily time entries. Maximum of 2 allowed.",
    };
  }
  return null;
}

function parseCronTimePart(part, index) {
  const cronParts = part.split(" ");
  if (cronParts.length !== 5) {
    return {
      error: "format",
      message: `Invalid CRON format at entry ${index + 1}.`,
      details: {
        [`time${index + 1}`]: "Expected format: 'min hour * * *'",
      },
    };
  }

  const [minStr, hourStr] = cronParts;
  const min = parseInt(minStr, 10);
  const hour = parseInt(hourStr, 10);

  const timeValidationError = validateCronTime(hour, min);
  if (timeValidationError) return timeValidationError;

  const date = new Date();
  date.setHours(hour, min, 0, 0);
  return date;
}
