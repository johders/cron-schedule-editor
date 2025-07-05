import styles from "./NumberInput.module.css";
import appStyles from "../../App.module.css";

function NumberInput({ value, placeholder, maxInput, onChange, error, id }) {
  return (
    <div className={styles.wrapper}>
      {error && <div className={appStyles.errorMessage}>{error}</div>}
      <input
        id={id}
        className={`${styles.input} ${error ? appStyles.inputError : ""}`}
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
