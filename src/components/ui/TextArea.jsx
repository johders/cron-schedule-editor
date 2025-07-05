import styles from "./TextArea.module.css";

function TextArea({ value, onChange, id }) {
  return (
    <textarea
      id={id}
      className={styles.textarea}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default TextArea;
