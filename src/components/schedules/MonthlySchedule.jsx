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
}) {
  return (
    <div className={styles.verticalStack}>
      <span>Every</span>
      <NumberInput
        value={dayOfMonth}
        maxInput="31"
        placeholder="N-th day of the month"
        onChange={setDayOfMonth}
      />
      <span>Of</span>
      <MultiSelect
        options={months.list}
        values={selectedMonths}
        onChange={setSelectedMonths}
      />
      <span>At</span>
      <TimePicker value={dateTimeMonthy} onChange={setdateTimeMonthy} />
    </div>
  );
}

export default MonthlySchedule;
