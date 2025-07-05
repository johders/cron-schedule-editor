import NumberInput from "../ui/NumberInput";
import MultiSelect from "../ui/MultiSelect";
import TimePicker from "../ui/TimePicker";
import styles from "../../App.module.css";
import { months } from "../../constants/constants";

function MonthlySchedule({
  dayOfMonth,
  setDayOfMonth,
  selectedMonths,
  setSelectedMonths,
  dateTimeMonthy,
  setdateTimeMonthy,
  errors = {},
}) {
  return (
    <div className={styles.verticalStack}>
      <span>Every</span>
      <NumberInput
        id="monthly-day"
        value={dayOfMonth}
        maxInput="31"
        placeholder="N-th day of the month"
        onChange={setDayOfMonth}
        error={errors.dayOfMonth}
      />
      <span>Of</span>
      <MultiSelect
        options={months.list}
        values={selectedMonths}
        onChange={setSelectedMonths}
        error={errors.selectedMonths}
      />
      <span>At</span>
        <TimePicker
          id="monthly-time"
          value={dateTimeMonthy}
          onChange={setdateTimeMonthy}
          error={errors.dateTimeMonthy}
        />
      </div>
  );
}

export default MonthlySchedule;
