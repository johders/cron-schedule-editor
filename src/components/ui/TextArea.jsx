import styles from "./TextArea.module.css";

function TextArea({ value, onChange }) {
  return (
    <textarea
      className={styles.textarea}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default TextArea;
