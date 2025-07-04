import { useState } from "react";
import { toast } from "react-hot-toast";
import styles from "./App.module.css";
import SelectBox from "./components/SelectBox";
import RadioButton from "./components/RadioButton";
import TimePicker from "./components/TimePicker";
import NumberInput from "./components/NumberInput";
import TextArea from "./components/TextArea";
import Button from "./components/Button";
import {
  weekdays,
  months,
  SCHEDULE_TYPES,
  schedulingOption,
} from "./constants/constants";
import { generateCronString, parseCronExpression } from "./utils/cronUtils";

function App() {
  const [scheduleType, setScheduleType] = useState(SCHEDULE_TYPES.WEEKLY);

  const [selectedWeekday, setSelectedWeekday] = useState("");
  const [dateTimeWeekly, setDateTimeWeekly] = useState(null);

  const [minutes, setMinutes] = useState("");

  const [dailyTime1, setDailyTime1] = useState(null);
  const [dailyTime2, setDailyTime2] = useState(null);

  const [selectedMonth, setSelectedMonth] = useState("");
  const [dayOfMonth, setDayOfMonth] = useState("");
  const [dateTimeMonthy, setdateTimeMonthy] = useState(null);

  const [cronText, setCronText] = useState("");

  const handleSave = () => {
    const cron = generateCronString({
      scheduleType,
      selectedWeekday,
      dateTimeWeekly,
      dailyTime1,
      dailyTime2,
      minutes,
      selectedMonth,
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
      setSelectedWeekday,
      setDateTimeWeekly,
      setSelectedMonth,
      setDayOfMonth,
      setdateTimeMonthy,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.schedulingOption}>
        <RadioButton
          label={SCHEDULE_TYPES.WEEKLY}
          name={schedulingOption}
          value={SCHEDULE_TYPES.WEEKLY}
          checked={scheduleType === SCHEDULE_TYPES.WEEKLY}
          onChange={setScheduleType}
        />

        {scheduleType === SCHEDULE_TYPES.WEEKLY && (
          <div className={styles.verticalStack}>
            <SelectBox
              options={weekdays.list}
              value={selectedWeekday}
              defaultSelection={"Select weekday"}
              onChange={setSelectedWeekday}
            />
            <TimePicker value={dateTimeWeekly} onChange={setDateTimeWeekly} />
          </div>
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
          <div className={styles.verticalStack}>
            <TimePicker value={dailyTime1} onChange={setDailyTime1} />
            <TimePicker value={dailyTime2} onChange={setDailyTime2} />
          </div>
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
          <NumberInput
            value={minutes}
            maxInput="59"
            placeholder="Enter minute interval"
            onChange={setMinutes}
          />
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
          <div className={styles.verticalStack}>
            <NumberInput
              value={dayOfMonth}
              maxInput="31"
              placeholder="N-th day of the month"
              onChange={setDayOfMonth}
            />
            <SelectBox
              options={months.list}
              value={selectedMonth}
              defaultSelection={"Select month"}
              onChange={setSelectedMonth}
            />
            <TimePicker value={dateTimeMonthy} onChange={setdateTimeMonthy} />
          </div>
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
