import styles from "./TextArea.module.css";
import appStyles from "../../App.module.css";

function TextArea({ value, onChange, id, error, readOnly = false }) {
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
            Help
          </a>
        </div>
      )}
      <textarea
        id={id}
        className={`${styles.textarea} ${readOnly ? styles.readOnly : ""}`}
        value={value}
        onChange={(e) => !readOnly && onChange(e.target.value)}
        readOnly={readOnly}
      />
    </div>
  );
}

export default TextArea;
