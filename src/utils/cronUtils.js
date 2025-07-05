import { toast } from "react-hot-toast";
import { weekdays, months, SCHEDULE_TYPES } from "../constants/constants";

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
    case SCHEDULE_TYPES.WEEKLY: {
      if (!selectedWeekdays?.length || !dateTimeWeekly) {
        toast.error("Please select at least one weekday and time");
        return null;
      }

      const days = selectedWeekdays.map((day) => weekdays.map[day]);
      const hour = dateTimeWeekly.getHours();
      const minute = dateTimeWeekly.getMinutes();

      return `${minute} ${hour} * * ${days.join(",")}`;
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
        return {
          error: "minutes",
          message: "Please enter a number between 1 and 59 for minutes",
        };
      }
      return `*/${minuteInterval} * * * *`;
    }

    case SCHEDULE_TYPES.MONTHLY: {
      const monthlyErrors = {};
      if (!dayOfMonth) {
        monthlyErrors.dayOfMonth = "Please enter a day of the month";
      }
      if (!selectedMonths.length) {
        monthlyErrors.selectedMonths = "Please select at least one month";
      }
      if (!dateTimeMonthy) {
        monthlyErrors.dateTimeMonthy = "Please select a time";
      }

      if (Object.keys(monthlyErrors).length) {
        return {
          error: "monthly",
          message: "Please complete all required fields",
          details: monthlyErrors,
        };
      }

      const monthNumbers = selectedMonths
        .map((monthName) => months.map[monthName])
        .filter(Boolean);

      const day = parseInt(dayOfMonth);
      const hour = dateTimeMonthy.getHours();
      const minute = dateTimeMonthy.getMinutes();

      if (monthNumbers.length === 0 || isNaN(day)) {
        toast.error("Invalid day or month");
        return null;
      }

      const now = new Date();
      const currentYear = now.getFullYear();

      for (const month of monthNumbers) {
        const daysInMonth = new Date(currentYear, month, 0).getDate();
        if (day > daysInMonth) {
          const monthName = Object.entries(months.map).find(
            ([, val]) => val === month
          )?.[0];
          monthlyErrors.dayOfMonth = `${monthName} only has ${daysInMonth} days. Please enter a valid day`;
          break;
        }
      }

      return `${minute} ${hour} ${day} ${monthNumbers.join(",")} *`;
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
