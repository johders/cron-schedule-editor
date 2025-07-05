import styles from "./MultiSelect.module.css";
import appStyles from "../../App.module.css";


function MultiSelect({ options, values, onChange, error }) {
  const toggleOption = (option) => {
    const newValues = values.includes(option)
      ? values.filter((val) => val !== option)
      : [...values, option];
    onChange(newValues);
  };

  return (
    <div className={styles.wrapper}>
      {error && <picture className={appStyles.errorMessage}>{error}</picture>}
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
    </div>
  );
}

export default MultiSelect;
