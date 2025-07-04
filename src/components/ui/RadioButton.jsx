import styles from "./RadioButton.module.css";


function RadioButton({ label, name, value, checked, onChange }) {
  return (
    <label className={styles.radio}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.value)}
      />
      {label}
    </label>
  );
}

export default RadioButton;
