import { useState } from "react";
import { toast } from "react-hot-toast";
import styles from "./App.module.css";
import SelectBox from "./components/SelectBox";
import RadioButton from "./components/RadioButton";
import TimePicker from "./components/TimePicker";
import NumberInput from "./components/NumberInput";
import TextArea from "./components/TextArea";
import Button from "./components/Button";
import { weekdays, months, SCHEDULE_TYPES, schedulingOption } from "./constants/constants";

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
    let newCronString = "";

    switch (scheduleType) {
      case SCHEDULE_TYPES.WEEKLY: {
        if (!selectedWeekday || !dateTimeWeekly) {
          toast.error("Please select a weekday and time");
          return;
        }

        const day = weekdays.map[selectedWeekday];
        const hour = dateTimeWeekly.getHours();
        const minute = dateTimeWeekly.getMinutes();

        newCronString = `${minute} ${hour} * * ${day}`;
        break;
      }

      case SCHEDULE_TYPES.DAILY: {
        if (!dailyTime1 && !dailyTime2) {
          toast.error("Please set at least one time");
          return;
        }

        const times = [dailyTime1, dailyTime2].filter(Boolean);
        const cronParts = times.map((time) => {
          const hour = time.getHours();
          const minute = time.getMinutes();
          return `${minute} ${hour} * * *`;
        });

        newCronString = cronParts.join(" | ");
        break;
      }

      case SCHEDULE_TYPES.TIME_INTERVAL: {
        const minuteInterval = parseInt(minutes, 10);

        if (
          isNaN(minuteInterval) ||
          minuteInterval < 1 ||
          minuteInterval > 59
        ) {
          toast.error("Please enter a number between 1 and 59 for minutes");
          return;
        }

        newCronString = `*/${minuteInterval} * * * *`;
        break;
      }

      case SCHEDULE_TYPES.MONTHLY: {
        if (!dayOfMonth || !selectedMonth || !dateTimeMonthy) {
          toast.error("Please complete all fields");
          return;
        }

        const month = months.map[selectedMonth];
        const day = parseInt(dayOfMonth);
        const hour = dateTimeMonthy.getHours();
        const minute = dateTimeMonthy.getMinutes();

        if (!month || isNaN(day)) {
          toast.error("Invalid day or month");
          return;
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
          return;
        }

        newCronString = `${minute} ${hour} ${day} ${month} *`;
        break;
      }

      default: {
        toast.error("Unsupported schedule type");
      }
    }

    setCronText(newCronString);
    toast.success("Schedule saved!");
  };

  const handleLoad = () => {
    const raw = cronText.trim();

    if (raw.includes("|")) {
      const partsList = raw.split("|").map((p) => p.trim());

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

    toast.error("Unsupported syntax. We could not process your request at this time");
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
          <Button children="Save" onClick={handleSave}>Save</Button>
          <Button children="Load" onClick={handleLoad}>Load</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
