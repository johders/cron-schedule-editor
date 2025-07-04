import { useState } from "react";
import styles from "./App.module.css";
import SelectBox from "./components/SelectBox";
import RadioButton from "./components/RadioButton";
import TimePicker from "./components/TimePicker";
import NumberInput from "./components/NumberInput";
import TextArea from "./components/TextArea";
import Button from "./components/Button";

const weekdays = {
  list: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  map: {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  },
};

const months = {
  list: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  map: {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  },
};

const weekly = "Weekly";
const daily = "Daily";
const monthly = "Monthly";
const custom = "Custom";

function App() {
  const [scheduleType, setScheduleType] = useState(weekly);

  const [selectedWeekday, setSelectedWeekday] = useState("");
  const [dateTimeWeekly, setDateTimeWeekly] = useState(null);

  const [minutes, setMinutes] = useState("");

  const [selecteMonth, setSelecteMonth] = useState("");
  const [dayOfMonth, setDayOfMonth] = useState("");
  const [dateTimeWMonthy, setdateTimeWMonthy] = useState(null);

  const [cronText, setCronText] = useState("");

  const handleSave = () => {
    let newCronString = "";

    switch (scheduleType) {
      case "Daily": {
        const minuteInterval = minutes;
        newCronString = `*/${minuteInterval} * * * *`;
        break;
      }

      case "Weekly": {
        if (!selectedWeekday || !dateTimeWeekly) return;
        const hour = dateTimeWeekly.getHours();
        const minute = dateTimeWeekly.getMinutes();
        const day = weekdays.map[selectedWeekday];
        newCronString = `${minute} ${hour} * * ${day}`;
        break;
      }

      case "Monthly": {
        if (!dayOfMonth || !selecteMonth || !dateTimeWMonthy) return;

        const month = months.map[selecteMonth];
        const day = parseInt(dayOfMonth);
        const hour = dateTimeWMonthy.getHours();
        const minute = dateTimeWMonthy.getMinutes();

        if (!month || isNaN(day)) return;

        newCronString = `${minute} ${hour} ${day} ${month} *`;
        break;
      }

      case "Custom": {
        newCronString = cronText;
        break;
      }

      default: {
        newCronString = "Unsupported schedule type";
      }
    }

    setCronText(newCronString);
  };

  const handleLoad = () => {
    const parts = cronText.trim().split(" ");
    if (parts.length !== 5) {
      setScheduleType(custom);
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
        setScheduleType(daily);
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
        setScheduleType(weekly);
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
        setSelecteMonth(monthName);
        setdateTimeWMonthy(date);
        setScheduleType(monthly);
        return;
      }
    }

    setScheduleType(custom);
  };

  return (
    <div className={styles.container}>
      <div className={styles.schedulingOption}>
        <RadioButton
          label={weekly}
          name="scheduling-option"
          value={weekly}
          checked={scheduleType === "Weekly"}
          onChange={setScheduleType}
        />

        <div className={styles.verticalStack}>
          <SelectBox
            options={weekdays.list}
            value={selectedWeekday}
            onChange={setSelectedWeekday}
          />

          <TimePicker value={dateTimeWeekly} onChange={setDateTimeWeekly} />
        </div>
      </div>

      <div className={styles.schedulingOption}>
        <RadioButton
          label={daily}
          name="scheduling-option"
          value={daily}
          checked={scheduleType === "Daily"}
          onChange={setScheduleType}
        />

        <NumberInput
          value={minutes}
          maxInput="59"
          placeholder="Enter minute interval"
          onChange={setMinutes}
        />
      </div>

      <div className={styles.schedulingOption}>
        <RadioButton
          label={monthly}
          name="scheduling-option"
          value={monthly}
          checked={scheduleType === "Monthly"}
          onChange={setScheduleType}
        />

        <div className={styles.verticalStack}>
          <NumberInput
            value={dayOfMonth}
            maxInput="31"
            placeholder="Nth day of the month"
            onChange={setDayOfMonth}
          />

          <SelectBox
            options={months.list}
            value={selecteMonth}
            onChange={setSelecteMonth}
          />

          <TimePicker value={dateTimeWMonthy} onChange={setdateTimeWMonthy} />
        </div>
      </div>

      <div className={styles.schedulingOption}></div>
      <RadioButton
        label={custom}
        name="scheduling-option"
        value={custom}
        checked={scheduleType === "Custom"}
        onChange={setScheduleType}
      />

      <div className={styles.fullWidth}>
        <TextArea value={cronText} onChange={setCronText} />
        <div className={styles.buttonGroup}>
          <Button children={"Save"} onClick={handleSave}></Button>
          <Button children={"Load"} onClick={handleLoad}></Button>
        </div>
      </div>
    </div>
  );
}

export default App;
