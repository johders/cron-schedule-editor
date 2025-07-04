import TimePicker from "../ui/TimePicker";
import styles from "../../App.module.css";

function DailySchedule({
  dailyTime1,
  setDailyTime1,
  dailyTime2,
  setDailyTime2,
}) {
  return (
    <fieldset>
      <legend>Daily schedule</legend>
      <div className={styles.verticalStack}>
        <span>First scheduled time</span>
        <TimePicker value={dailyTime1} onChange={setDailyTime1} />
        <span>Second scheduled time (optional)</span>
        <TimePicker value={dailyTime2} onChange={setDailyTime2} />
      </div>
    </fieldset>
  );
}

export default DailySchedule;
