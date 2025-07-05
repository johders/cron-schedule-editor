import styles from "./TextArea.module.css";
import appStyles from "../../App.module.css";

function TextArea({ value, onChange, id, error }) {
  return (
    <div className={styles.wrapper}>
      {error && (
        <div className={appStyles.errorMessage}>
          {error}{" "}
          <a
            href="https://github.com/johders/cron-schedule-editor/blob/main/docs/manual.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            Click here for syntax info
          </a>
        </div>
      )}
      <textarea
        id={id}
        className={styles.textarea}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default TextArea;
