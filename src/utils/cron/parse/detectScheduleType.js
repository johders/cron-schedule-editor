import { SCHEDULE_TYPES } from "../../../constants/constants";

export function detectScheduleType(cron) {
  const parts = cron.trim().split(" ");
  if (parts.length !== 5 && !cron.includes("|")) return null;

  if (cron.includes("|")) {
    const times = cron.split("|").map((p) => p.trim());
    const valid = times.every((p) => /^\d+\s+\d+\s+\*\s+\*\s+\*$/.test(p));
    return valid ? SCHEDULE_TYPES.DAILY : null;
  }

  const [min, hour, dom, month, dow] = parts;

  if (
    /^\*\/\d+$/.test(min) &&
    hour === "*" &&
    dom === "*" &&
    month === "*" &&
    dow === "*"
  ) {
    return SCHEDULE_TYPES.TIME_INTERVAL;
  }

  if (
    !isNaN(min) &&
    !isNaN(hour) &&
    dom === "*" &&
    month === "*" &&
    /^(\d,?)+$/.test(dow)
  ) {
    return SCHEDULE_TYPES.WEEKLY;
  }

  if (
    !isNaN(min) &&
    !isNaN(hour) &&
    !isNaN(dom) &&
    /^(\d+,?)+$/.test(month) &&
    dow === "*"
  ) {
    return SCHEDULE_TYPES.MONTHLY;
  }

  if (/^\d+\s+\d+\s+\*\s+\*\s+\*$/.test(cron)) {
    return SCHEDULE_TYPES.DAILY;
  }

  return null;
}
