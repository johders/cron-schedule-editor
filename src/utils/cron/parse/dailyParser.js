import { SCHEDULE_TYPES } from "../../../constants/constants";
import { validateCronTime } from "../cronValidators"; 

export function parseDaily(cronText, setStateHandlers) {
  const { setDailyTime1, setDailyTime2, setScheduleType } = setStateHandlers;

  const partsList = cronText.includes("|")
    ? cronText.split("|").map((p) => p.trim())
    : [cronText.trim()];

  if (partsList.length > 2) {
    return {
      error: "format",
      message: "Too many daily time entries. Maximum of 2 allowed.",
    };
  }

  const times = [];

  for (let i = 0; i < partsList.length; i++) {
    const cronParts = partsList[i].split(" ");
    if (cronParts.length !== 5) {
      return {
        error: "format",
        message: `Invalid CRON format at entry ${i + 1}.`,
        details: { [`time${i + 1}`]: "Expected format: 'min hour * * *'" },
      };
    }

    const [minStr, hourStr] = cronParts;
    const min = parseInt(minStr, 10);
    const hour = parseInt(hourStr, 10);

    const timeValidationError = validateCronTime(hour, min);
    if (timeValidationError) return timeValidationError;

    const date = new Date();
    date.setHours(hour);
    date.setMinutes(min);
    date.setSeconds(0);
    date.setMilliseconds(0);
    times.push(date);
  }

  setDailyTime1(times[0] || null);
  setDailyTime2(times[1] || null);
  setScheduleType(SCHEDULE_TYPES.DAILY);

  return { success: true };
}
