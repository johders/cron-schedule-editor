import { toast } from "react-hot-toast";
import { SCHEDULE_TYPES } from "../../constants/constants";
import {
  generateWeeklyCron,
  generateDailyCron,
  generateTimeIntervalCron,
  generateMonthlyCron,
} from "./generate";
import {
  detectScheduleType,
  parseWeekly,
  parseDaily,
  parseTimeInterval,
  parseMonthly
} from "./parse";

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
  const raw = cronText.trim();
  const type = detectScheduleType(raw);

  switch (type) {
    case SCHEDULE_TYPES.DAILY:
      return parseDaily(raw, setStateHandlers);
    case SCHEDULE_TYPES.WEEKLY:
      return parseWeekly(raw, setStateHandlers);
    case SCHEDULE_TYPES.MONTHLY:
      return parseMonthly(raw, setStateHandlers);
    case SCHEDULE_TYPES.TIME_INTERVAL:
       return parseTimeInterval(raw, setStateHandlers);
    default:
      return { error: "Unsupported", message: "Unsupported CRON syntax or format." };
  }
}
