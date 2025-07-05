import { toast } from "react-hot-toast";
import { SCHEDULE_TYPES } from "../../../constants/constants";

export function parseTimeInterval(cronText, setStateHandlers) {
  const { setMinutes, setScheduleType } = setStateHandlers;

  const trimmed = cronText.trim();

  const match = trimmed.match(/^\*\/(\d{1,2})\s\*\s\*\s\*\s\*$/);

  if (!match) {
    toast.error("Invalid format for time interval. Expected '*/X * * * *'.");
    return;
  }

  const interval = parseInt(match[1], 10);

  if (isNaN(interval) || interval < 1 || interval > 59) {
    toast.error("Time interval must be a number between 1 and 59.");
    return;
  }

  setMinutes(interval.toString());
  setScheduleType(SCHEDULE_TYPES.TIME_INTERVAL);
  toast.success("Time interval schedule loaded!");
}