import { toast } from "react-hot-toast";
import { weekdays, SCHEDULE_TYPES } from "../../../constants/constants";

export function parseWeekly(cronText, setStateHandlers) {
  const { setSelectedWeekdays, setDateTimeWeekly, setScheduleType } =
    setStateHandlers;

  const parts = cronText.trim().split(" ");
  if (parts.length !== 5) {
    toast.error("Invalid CRON format for weekly schedule.");
    return;
  }

  const [min, hour, , , dayOfWeekStr] = parts;

  if (isNaN(min) || isNaN(hour)) {
    toast.error("Minute or hour is not a valid number.");
    return;
  }

  if (!/^(\d{1})(,\d{1})*$/.test(dayOfWeekStr)) {
    toast.error("Invalid day of week format.");
    return;
  }

  const weekdayNumbers = dayOfWeekStr.split(",").map(Number);

  const selectedWeekdays = weekdayNumbers
    .map(
      (num) =>
        Object.entries(weekdays.map).find(([, value]) => value === num)?.[0]
    )
    .filter(Boolean);

  if (!selectedWeekdays.length) {
    toast.error("No valid weekdays found.");
    return;
  }

  const date = new Date();
  date.setHours(parseInt(hour, 10));
  date.setMinutes(parseInt(min, 10));
  date.setSeconds(0);
  date.setMilliseconds(0);

  setSelectedWeekdays(selectedWeekdays);
  setDateTimeWeekly(date);
  setScheduleType(SCHEDULE_TYPES.WEEKLY);
  toast.success("Weekly schedule loaded!");
}
