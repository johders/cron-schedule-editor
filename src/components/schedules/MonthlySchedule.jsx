import NumberInput from "../ui/NumberInput";
import SelectBox from "../ui/SelectBox";
import TimePicker from "../ui/TimePicker";
import styles from "../../App.module.css";
import { months } from "../../constants/constants";

function MonthlySchedule({
  dayOfMonth,
  setDayOfMonth,
  selectedMonth,
  setSelectedMonth,
  dateTimeMonthy,
  setdateTimeMonthy,
}) {
  return (
    <fieldset>
      <legend>Monthly schedule</legend>
      <div className={styles.verticalStack}>
        <span>Every</span>
        <NumberInput
          value={dayOfMonth}
          maxInput="31"
          placeholder="N-th day of the month"
          onChange={setDayOfMonth}
        />
        <span>Of</span>
        <SelectBox
          options={months.list}
          value={selectedMonth}
          defaultSelection="Select month"
          onChange={setSelectedMonth}
        />
        <span>At</span>
        <TimePicker value={dateTimeMonthy} onChange={setdateTimeMonthy} />
      </div>
    </fieldset>
  );
}

export default MonthlySchedule;
