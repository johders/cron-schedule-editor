import TextArea from "./ui/TextArea";
import Button from "./ui/Button";
import styles from "../App.module.css";

function ScheduleFormFooter({ cronText, setCronText, error, onSave, onLoad }) {
  return (
    <div className={styles.fullWidth}>
      <TextArea
        value={cronText}
        onChange={setCronText}
        id="cron-text"
        error={error}
      />
      <div className={styles.buttonGroup}>
        <Button children="Save" onClick={onSave} />
        <Button children="Load" onClick={onLoad} />
      </div>
    </div>
  );
}

export default ScheduleFormFooter;