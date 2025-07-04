import styles from "./MultiSelect.module.css";

function MultiSelect({ options, values, onChange }) {
  const toggleOption = (option) => {
    const newValues = values.includes(option)
      ? values.filter((val) => val !== option)
      : [...values, option];
    onChange(newValues);
  };

  return (
    <div className={styles.tileContainer}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={`${styles.tile} ${
            values.includes(option) ? styles.selected : ""
          }`}
          onClick={() => toggleOption(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default MultiSelect;