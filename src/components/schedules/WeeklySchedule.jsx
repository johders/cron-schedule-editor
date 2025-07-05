import MultiSelect from "../ui/MultiSelect";
import TimePicker from "../ui/TimePicker";
import { weekdays } from "../../constants/constants";
import styles from "../../App.module.css";

function WeeklySchedule({
  selectedWeekdays,
  setSelectedWeekdays,
  dateTimeWeekly,
  setDateTimeWeekly,
  errors = {},
}) {
  return (
    <div className={styles.verticalStack}>
      <MultiSelect
        options={weekdays.list}
        values={selectedWeekdays}
        placeholder="Select weekdays"
        onChange={setSelectedWeekdays}
        error={errors.selectedWeekdays}
      />
      <TimePicker
        value={dateTimeWeekly}
        onChange={setDateTimeWeekly}
        error={errors.dateTimeWeekly}
      />
    </div>
  );
}

export default WeeklySchedule;
