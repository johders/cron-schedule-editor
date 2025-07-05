import styles from "./NumberInput.module.css";

function NumberInput({ value, placeholder, maxInput, onChange, error }) {
  return (
    <div className={styles.wrapper}>
      {error && <div className={styles.errorMessage}>{error}</div>}
      <input
        className={`${styles.input} ${error ? styles.inputError : ""}`}
        type="number"
        min="0"
        max={maxInput}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default NumberInput;
