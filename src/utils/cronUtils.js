import { toast } from "react-hot-toast";
import { weekdays, months, SCHEDULE_TYPES } from "../constants/constants";

export function generateCronString({
  scheduleType,
  selectedWeekday,
  dateTimeWeekly,
  dailyTime1,
  dailyTime2,
  minutes,
  selectedMonth,
  dayOfMonth,
  dateTimeMonthy,
}) {
  switch (scheduleType) {
    case SCHEDULE_TYPES.WEEKLY: {
      if (!selectedWeekday || !dateTimeWeekly) {
        toast.error("Please select a weekday and time");
        return null;
      }
      const day = weekdays.map[selectedWeekday];
      const hour = dateTimeWeekly.getHours();
      const minute = dateTimeWeekly.getMinutes();
      return `${minute} ${hour} * * ${day}`;
    }

    case SCHEDULE_TYPES.DAILY: {
      if (!dailyTime1 && !dailyTime2) {
        toast.error("Please set at least one time");
        return null;
      }
      const times = [dailyTime1, dailyTime2].filter(Boolean);
      return times
        .map((time) => `${time.getMinutes()} ${time.getHours()} * * *`)
        .join(" | ");
    }

    case SCHEDULE_TYPES.TIME_INTERVAL: {
      const minuteInterval = parseInt(minutes, 10);
      if (isNaN(minuteInterval) || minuteInterval < 1 || minuteInterval > 59) {
        toast.error("Please enter a number between 1 and 59 for minutes");
        return null;
      }
      return `*/${minuteInterval} * * * *`;
    }

    case SCHEDULE_TYPES.MONTHLY: {
      if (!dayOfMonth || !selectedMonth || !dateTimeMonthy) {
        toast.error("Please complete all fields");
        return null;
      }

      const month = months.map[selectedMonth];
      const day = parseInt(dayOfMonth);
      const hour = dateTimeMonthy.getHours();
      const minute = dateTimeMonthy.getMinutes();

      if (!month || isNaN(day)) {
        toast.error("Invalid day or month");
        return null;
      }

      const now = new Date();
      let scheduledYear = now.getFullYear();
      const scheduledDate = new Date(
        scheduledYear,
        month - 1,
        day,
        hour,
        minute
      );

      if (scheduledDate < now) {
        scheduledYear++;
      }

      const daysInMonth = new Date(scheduledYear, month, 0).getDate();

      if (day < 1 || day > daysInMonth) {
        toast.error(
          `${selectedMonth} ${scheduledYear} only has ${daysInMonth} days. Please enter a valid day`
        );
        return null;
      }

      return `${minute} ${hour} ${day} ${month} *`;
    }

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
    setSelectedWeekday,
    setDateTimeWeekly,
    setSelectedMonth,
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
    !isNaN(dayOfWeekStr)
  ) {
    const weekdayNumber = parseInt(dayOfWeekStr);
    const weekdayEntry = Object.entries(weekdays.map).find(
      ([, value]) => value === weekdayNumber
    );

    if (weekdayEntry) {
      const weekdayName = weekdayEntry[0];
      const date = new Date();
      date.setHours(parseInt(hour));
      date.setMinutes(parseInt(min));

      setSelectedWeekday(weekdayName);
      setDateTimeWeekly(date);
      setScheduleType(SCHEDULE_TYPES.WEEKLY);
      toast.success("Weekly schedule loaded!");
      return;
    } else {
      toast.error("Invalid weekday value");
      return;
    }
  }

  if (
    !isNaN(min) &&
    !isNaN(hour) &&
    !isNaN(dayOfMonthStr) &&
    !isNaN(monthStr) &&
    dayOfWeekStr === "*"
  ) {
    const monthNumber = parseInt(monthStr);
    const monthEntry = Object.entries(months.map).find(
      ([, value]) => value === monthNumber
    );

    if (monthEntry) {
      const monthName = monthEntry[0];
      const day = parseInt(dayOfMonthStr);
      const date = new Date();
      date.setHours(parseInt(hour));
      date.setMinutes(parseInt(min));

      setDayOfMonth(day.toString());
      setSelectedMonth(monthName);
      setdateTimeMonthy(date);
      setScheduleType(SCHEDULE_TYPES.MONTHLY);
      toast.success("Monthly schedule loaded!");
      return;
    } else {
      toast.error("Invalid month value");
      return;
    }
  }

  toast.error(
    "Unsupported syntax. We could not process your request at this time"
  );
}
