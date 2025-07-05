import { toast } from "react-hot-toast";
import { weekdays, months, SCHEDULE_TYPES } from "../../constants/constants";
import {
  generateWeeklyCron,
  generateDailyCron,
  generateTimeIntervalCron,
  generateMonthlyCron,
} from "./generate";

export function generateCronString({
  scheduleType,
  selectedWeekdays,
  dateTimeWeekly,
  dailyTime1,
  dailyTime2,
  minutes,
  selectedMonths,
  dayOfMonth,
  dateTimeMonthy,
}) {
  switch (scheduleType) {
    case SCHEDULE_TYPES.WEEKLY:
      return generateWeeklyCron(selectedWeekdays, dateTimeWeekly);
    case SCHEDULE_TYPES.DAILY:
      return generateDailyCron(dailyTime1, dailyTime2);
    case SCHEDULE_TYPES.TIME_INTERVAL:
      return generateTimeIntervalCron(minutes);
    case SCHEDULE_TYPES.MONTHLY:
      return generateMonthlyCron({
        selectedMonths,
        dayOfMonth,
        dateTimeMonthy,
      });
    default:
      toast.error("Unsupported schedule type");
      return null;
  }
}

export function parseCronExpression(cronText, setStateHandlers) {
  const {
    setDailyTime1,
    setDailyTime2,
    setScheduleType,
    setMinutes,
    setSelectedWeekdays,
    setDateTimeWeekly,
    setSelectedMonths,
    setDayOfMonth,
    setdateTimeMonthy,
  } = setStateHandlers;

  const raw = cronText.trim();

  const isDailyCron = /^\d+\s+\d+\s+\*\s+\*\s+\*$/.test(raw);
  if (isDailyCron || raw.includes("|")) {
    const partsList = raw.includes("|")
      ? raw.split("|").map((p) => p.trim())
      : [raw];

    const validFormat = partsList.every((p) =>
      /^\d+\s+\d+\s+\*\s+\*\s+\*$/.test(p)
    );

    if (validFormat) {
      const times = partsList.map((p) => {
        const [min, hour] = p.split(" ");
        const date = new Date();
        date.setHours(parseInt(hour, 10));
        date.setMinutes(parseInt(min, 10));
        return date;
      });

      setDailyTime1(times[0] || null);
      setDailyTime2(times[1] || null);
      setScheduleType(SCHEDULE_TYPES.DAILY);
      toast.success("Daily schedule loaded!");
      return;
    } else {
      toast.error("Invalid format for daily schedule");
      return;
    }
  }

  const parts = raw.split(" ");
  if (parts.length !== 5) {
    toast.error("Invalid cron expression format");
    return;
  }

  const [min, hour, dayOfMonthStr, monthStr, dayOfWeekStr] = parts;

  if (
    min.startsWith("*/") &&
    hour === "*" &&
    dayOfMonthStr === "*" &&
    monthStr === "*" &&
    dayOfWeekStr === "*"
  ) {
    const minuteInterval = min.slice(2);
    if (!isNaN(minuteInterval)) {
      setMinutes(minuteInterval);
      setScheduleType(SCHEDULE_TYPES.TIME_INTERVAL);
      toast.success("Time interval schedule loaded!");
      return;
    } else {
      toast.error("Invalid minute interval");
      return;
    }
  }

  if (
    !isNaN(min) &&
    !isNaN(hour) &&
    dayOfMonthStr === "*" &&
    monthStr === "*" &&
    dayOfWeekStr.match(/^(\d,?)+$/)
  ) {
    const weekdayNumbers = dayOfWeekStr.split(",").map(Number);
    const selectedWeekdays = weekdayNumbers
      .map(
        (num) =>
          Object.entries(weekdays.map).find(([, value]) => value === num)?.[0]
      )
      .filter(Boolean);

    if (selectedWeekdays.length) {
      const date = new Date();
      date.setHours(parseInt(hour));
      date.setMinutes(parseInt(min));

      setSelectedWeekdays(selectedWeekdays);
      setDateTimeWeekly(date);
      setScheduleType(SCHEDULE_TYPES.WEEKLY);
      toast.success("Weekly schedule loaded!");
      return;
    } else {
      toast.error("Invalid weekdays input");
      return;
    }
  }

  if (
    !isNaN(min) &&
    !isNaN(hour) &&
    !isNaN(dayOfMonthStr) &&
    monthStr.match(/^(\d+,?)+$/) &&
    dayOfWeekStr === "*"
  ) {
    const monthNumbers = monthStr.split(",").map(Number);
    const monthNames = monthNumbers
      .map(
        (num) =>
          Object.entries(months.map).find(([, value]) => value === num)?.[0]
      )
      .filter(Boolean);

    if (monthNames.length) {
      const day = parseInt(dayOfMonthStr);
      const date = new Date();
      date.setHours(parseInt(hour));
      date.setMinutes(parseInt(min));

      setDayOfMonth(day.toString());
      setSelectedMonths(monthNames);
      setdateTimeMonthy(date);
      setScheduleType(SCHEDULE_TYPES.MONTHLY);
      toast.success("Monthly schedule loaded!");
      return;
    } else {
      toast.error("Invalid month values");
      return;
    }
  }

  toast.error(
    "Unsupported syntax. We could not process your request at this time"
  );
}
