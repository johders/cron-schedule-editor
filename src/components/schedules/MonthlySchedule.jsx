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
          value={dateTimeMonthy}
          onChange={setdateTimeMonthy}
          error={errors.dateTimeMonthy}
        />
      </div>
  );
}

export default MonthlySchedule;
