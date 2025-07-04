import styles from "./NumberInput.module.css";

function NumberInput({ value, placeholder, maxInput, onChange }) {
  return (
    <input
      className={styles.input}
      type="number"
      min="0"
      max={maxInput}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default NumberInput;
