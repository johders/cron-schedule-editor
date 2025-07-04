import MultiSelect from "../ui/MultiSelect";
import TimePicker from "../ui/TimePicker";
import { weekdays } from "../../constants/constants";
import styles from "../../App.module.css";

function WeeklySchedule({
  selectedWeekdays,
  setSelectedWeekdays,
  dateTimeWeekly,
  setDateTimeWeekly,
}) {
  return (
    <div className={styles.verticalStack}>
      <MultiSelect
        options={weekdays.list}
        values={selectedWeekdays}
        placeholder="Select weekdays"
        onChange={setSelectedWeekdays}
      />
      <TimePicker value={dateTimeWeekly} onChange={setDateTimeWeekly} />
    </div>
  );
}

export default WeeklySchedule;
