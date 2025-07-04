import SelectBox from "../ui/SelectBox";
import TimePicker from "../ui/TimePicker";
import { weekdays } from "../../constants/constants";
import styles from "../../App.module.css";

function WeeklySchedule({
  selectedWeekday,
  setSelectedWeekday,
  dateTimeWeekly,
  setDateTimeWeekly,
}) {
  return (
      <div className={styles.verticalStack}>
        <SelectBox
          options={weekdays.list}
          value={selectedWeekday}
          defaultSelection="Select weekday"
          onChange={setSelectedWeekday}
        />
        <TimePicker value={dateTimeWeekly} onChange={setDateTimeWeekly} />
      </div>
  );
}

export default WeeklySchedule;
