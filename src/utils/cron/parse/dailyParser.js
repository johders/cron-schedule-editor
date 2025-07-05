import { SCHEDULE_TYPES } from "../../../constants/constants";
import { toast } from "react-hot-toast";

export function parseDaily(cronText, setStateHandlers) {
  const { setDailyTime1, setDailyTime2, setScheduleType } = setStateHandlers;
  const partsList = cronText.includes("|")
    ? cronText.split("|").map((p) => p.trim())
    : [cronText];

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
}
