import { useState } from "react";
import { toast } from "react-hot-toast";
import styles from "./App.module.css";
import { SCHEDULE_TYPES, } from "./constants/constants";
import {
  generateCronString,
  parseCronExpression,
} from "./utils/cron/cronUtils";
import WeeklySchedule from "./components/schedules/WeeklySchedule";
import DailySchedule from "./components/schedules/DailySchedule";
import TimeIntervalSchedule from "./components/schedules/TimeIntervalSchedule";
import MonthlySchedule from "./components/schedules/MonthlySchedule";
import ScheduleFooter from "./components/ScheduleFooter";
import ScheduleOption from "./components/ScheduleOption";

function App() {
  const [scheduleType, setScheduleType] = useState(SCHEDULE_TYPES.WEEKLY);

  const [selectedWeekdays, setSelectedWeekdays] = useState([]);
  const [dateTimeWeekly, setDateTimeWeekly] = useState(null);

  const [minutes, setMinutes] = useState("");

  const [dailyTime1, setDailyTime1] = useState(null);
  const [dailyTime2, setDailyTime2] = useState(null);

  const [selectedMonths, setSelectedMonths] = useState([]);
  const [dayOfMonth, setDayOfMonth] = useState("");
  const [dateTimeMonthly, setdateTimeMonthly] = useState(null);

  const [cronText, setCronText] = useState("");

  const [errors, setErrors] = useState({ fields: {}, suppressUI: false });

  const visibleErrors = errors.suppressUI ? {} : errors.fields;

  const handleSave = () => {
    const cron = generateCronString({
      scheduleType,
      selectedWeekdays,
      dateTimeWeekly,
      dailyTime1,
      dailyTime2,
      minutes,
      selectedMonths,
      dayOfMonth,
      dateTimeMonthly: dateTimeMonthly,
    });

    if (cron?.error) {
      if (cron.details) {
        setErrors({ fields: cron.details, suppressUI: false });
      } else {
        setErrors({
          fields: { [cron.error]: cron.message },
          suppressUI: false,
        });
      }
      toast.error(cron.message);
      return;
    }

    setErrors({ fields: {}, suppressUI: false });
    setCronText(cron);
    toast.success("Schedule saved!");
  };

  const handleLoad = () => {
    setErrors({ fields: {}, suppressUI: false });

    const result = parseCronExpression(cronText, {
      setDailyTime1,
      setDailyTime2,
      setScheduleType,
      setMinutes,
      setSelectedWeekdays,
      setDateTimeWeekly,
      setSelectedMonths,
      setDayOfMonth,
      setdateTimeMonthly: setdateTimeMonthly,
    });

    if (result?.error) {
      toast.error(result.message || "Failed to parse CRON.");
      setErrors({
        fields: { cronText: result.message, ...result.details },
        suppressUI: true,
      });
      return;
    }

    toast.success("Schedule loaded!");
  };

  return (
    <div className={styles.container}>
      <h1>CRON Schedule editor</h1>
      <ScheduleOption
        label={SCHEDULE_TYPES.WEEKLY}
        value={SCHEDULE_TYPES.WEEKLY}
        currentValue={scheduleType}
        onChange={setScheduleType}
      >
        <WeeklySchedule
          selectedWeekdays={selectedWeekdays}
          setSelectedWeekdays={setSelectedWeekdays}
          dateTimeWeekly={dateTimeWeekly}
          setDateTimeWeekly={setDateTimeWeekly}
          errors={visibleErrors}
        />
      </ScheduleOption>

      <ScheduleOption
        label={SCHEDULE_TYPES.DAILY}
        value={SCHEDULE_TYPES.DAILY}
        currentValue={scheduleType}
        onChange={setScheduleType}
      >
        <DailySchedule
          dailyTime1={dailyTime1}
          setDailyTime1={setDailyTime1}
          dailyTime2={dailyTime2}
          setDailyTime2={setDailyTime2}
          errors={visibleErrors}
        />
      </ScheduleOption>

      <ScheduleOption
        label={SCHEDULE_TYPES.TIME_INTERVAL}
        value={SCHEDULE_TYPES.TIME_INTERVAL}
        currentValue={scheduleType}
        onChange={setScheduleType}
      >
        <TimeIntervalSchedule
          minutes={minutes}
          setMinutes={setMinutes}
          errors={visibleErrors}
        />
      </ScheduleOption>

      <ScheduleOption
        label={SCHEDULE_TYPES.MONTHLY}
        value={SCHEDULE_TYPES.MONTHLY}
        currentValue={scheduleType}
        onChange={setScheduleType}
      >
        <MonthlySchedule
          dayOfMonth={dayOfMonth}
          setDayOfMonth={setDayOfMonth}
          selectedMonths={selectedMonths}
          setSelectedMonths={setSelectedMonths}
          dateTimeMonthly={dateTimeMonthly}
          setdateTimeMonthly={setdateTimeMonthly}
          errors={visibleErrors}
        />
      </ScheduleOption>

      <ScheduleFooter
        cronText={cronText}
        setCronText={setCronText}
        error={errors.fields.cronText}
        onSave={handleSave}
        onLoad={handleLoad}
      />
    </div>
  );
}

export default App;
