import { useState } from "react";
import { toast } from "react-hot-toast";
import styles from "./App.module.css";
import RadioButton from "./components/ui/RadioButton";
import TextArea from "./components/ui/TextArea";
import Button from "./components/ui/Button";
import { SCHEDULE_TYPES, schedulingOption } from "./constants/constants";
import { generateCronString, parseCronExpression } from "./utils/cronUtils";
import WeeklySchedule from "./components/schedules/WeeklySchedule";
import DailySchedule from "./components/schedules/DailySchedule";
import TimeIntervalSchedule from "./components/schedules/TimeIntervalSchedule";
import MonthlySchedule from "./components/schedules/MonthlySchedule";

function App() {
  const [scheduleType, setScheduleType] = useState(SCHEDULE_TYPES.WEEKLY);

  const [selectedWeekdays, setSelectedWeekdays] = useState([]);
  const [dateTimeWeekly, setDateTimeWeekly] = useState(null);

  const [minutes, setMinutes] = useState("");

  const [dailyTime1, setDailyTime1] = useState(null);
  const [dailyTime2, setDailyTime2] = useState(null);

  const [selectedMonths, setSelectedMonths] = useState([]);
  const [dayOfMonth, setDayOfMonth] = useState("");
  const [dateTimeMonthy, setdateTimeMonthy] = useState(null);

  const [cronText, setCronText] = useState("");

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
      dateTimeMonthy,
    });

    if (cron) {
      setCronText(cron);
      toast.success("Schedule saved!");
    }
  };

  const handleLoad = () => {
    parseCronExpression(cronText, {
      setDailyTime1,
      setDailyTime2,
      setScheduleType,
      setMinutes,
      setSelectedWeekdays,
      setDateTimeWeekly,
      setSelectedMonths,
      setDayOfMonth,
      setdateTimeMonthy,
    });
  };

  return (
    <div className={styles.container}>
      <h1>CRON Schedule editor</h1>
      <div className={styles.schedulingOption}>
        <RadioButton
          label={SCHEDULE_TYPES.WEEKLY}
          name={schedulingOption}
          value={SCHEDULE_TYPES.WEEKLY}
          checked={scheduleType === SCHEDULE_TYPES.WEEKLY}
          onChange={setScheduleType}
        />

        {scheduleType === SCHEDULE_TYPES.WEEKLY && (
          <WeeklySchedule
            selectedWeekdays={selectedWeekdays}
            setSelectedWeekdays={setSelectedWeekdays}
            dateTimeWeekly={dateTimeWeekly}
            setDateTimeWeekly={setDateTimeWeekly}
          />
        )}
      </div>

      <div className={styles.schedulingOption}>
        <RadioButton
          label={SCHEDULE_TYPES.DAILY}
          name={schedulingOption}
          value={SCHEDULE_TYPES.DAILY}
          checked={scheduleType === SCHEDULE_TYPES.DAILY}
          onChange={setScheduleType}
        />

        {scheduleType === SCHEDULE_TYPES.DAILY && (
          <DailySchedule
            dailyTime1={dailyTime1}
            setDailyTime1={setDailyTime1}
            dailyTime2={dailyTime2}
            setDailyTime2={setDailyTime2}
          />
        )}
      </div>

      <div className={styles.schedulingOption}>
        <RadioButton
          label={SCHEDULE_TYPES.TIME_INTERVAL}
          name={schedulingOption}
          value={SCHEDULE_TYPES.TIME_INTERVAL}
          checked={scheduleType === SCHEDULE_TYPES.TIME_INTERVAL}
          onChange={setScheduleType}
        />

        {scheduleType === SCHEDULE_TYPES.TIME_INTERVAL && (
          <TimeIntervalSchedule minutes={minutes} setMinutes={setMinutes} />
        )}
      </div>

      <div className={styles.schedulingOption}>
        <RadioButton
          label={SCHEDULE_TYPES.MONTHLY}
          name={schedulingOption}
          value={SCHEDULE_TYPES.MONTHLY}
          checked={scheduleType === SCHEDULE_TYPES.MONTHLY}
          onChange={setScheduleType}
        />

        {scheduleType === SCHEDULE_TYPES.MONTHLY && (
          <MonthlySchedule
            dayOfMonth={dayOfMonth}
            setDayOfMonth={setDayOfMonth}
            selectedMonths={selectedMonths}
            setSelectedMonths={setSelectedMonths}
            dateTimeMonthy={dateTimeMonthy}
            setdateTimeMonthy={setdateTimeMonthy}
          />
        )}
      </div>

      <div className={styles.fullWidth}>
        <TextArea value={cronText} onChange={setCronText} />
        <div className={styles.buttonGroup}>
          <Button children="Save" onClick={handleSave}>
            Save
          </Button>
          <Button children="Load" onClick={handleLoad}>
            Load
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
