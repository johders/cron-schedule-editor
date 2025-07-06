import TextArea from "./ui/TextArea";
import Button from "./ui/Button";
import styles from "./ScheduleFooter.module.css";

function ScheduleFormFooter({
  cronText,
  manualCronText,
  setManualCronText,
  error,
  onSave,
  onLoad,
}) {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.section}>
        <label htmlFor="generated-cron">Saved CRON schedule</label>
        <TextArea
          value={cronText}
          onChange={() => {}}
          id="generated-cron"
          readOnly={true}
        />
        <div>
          <Button children="Save" onClick={onSave} color="save" />
        </div>
      </div>

      <div className={styles.section}>
        <label htmlFor="manual-cron">Enter manual CRON expression</label>
        <TextArea
          value={manualCronText}
          onChange={setManualCronText}
          id="manual-cron"
          error={error}
        />
        <div>
          <Button children="Load" onClick={onLoad} color="load" />
        </div>
      </div>
    </div>
  );
}

export default ScheduleFormFooter;
