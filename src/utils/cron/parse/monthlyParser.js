import { toast } from "react-hot-toast";
import { months, SCHEDULE_TYPES } from "../../../constants/constants";

export function parseMonthly(cronText, setStateHandlers) {
  const {
    setDayOfMonth,
    setSelectedMonths,
    setdateTimeMonthy,
    setScheduleType,
  } = setStateHandlers;

  const parts = cronText.trim().split(" ");
  if (parts.length !== 5) {
    toast.error("Invalid CRON format for monthly schedule.");
    return;
  }

  const [min, hour, dayStr, monthStr, dayOfWeek] = parts;

  if (
    isNaN(min) ||
    isNaN(hour) ||
    isNaN(dayStr) ||
    !/^(\d{1,2})(,\d{1,2})*$/.test(monthStr) ||
    dayOfWeek !== "*"
  ) {
    toast.error("Invalid monthly CRON format.");
    return;
  }

  const day = parseInt(dayStr, 10);
  const monthNumbers = monthStr.split(",").map(Number);

  const selectedMonthNames = monthNumbers
    .map(
      (num) => Object.entries(months.map).find(([, val]) => val === num)?.[0]
    )
    .filter(Boolean);

  if (!selectedMonthNames.length) {
    toast.error("Invalid month values.");
    return;
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
    toast.error("Unknown month configuration.");
    return;
  }

  if (day < 1 || day > maxValidDay) {
    toast.error(
      `Day must be between 1 and ${maxValidDay} based on selected months.`
    );
    return;
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
  toast.success("Monthly schedule loaded!");
}
