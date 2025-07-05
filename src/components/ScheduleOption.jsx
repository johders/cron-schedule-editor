import RadioButton from "./ui/RadioButton";
import styles from "../App.module.css";

function ScheduleOption({
  label,
  value,
  currentValue,
  onChange,
  children,
}) {
  return (
    <div className={styles.schedulingOption}>
      <RadioButton
        label={label}
        name="schedulingOption"
        value={value}
        checked={currentValue === value}
        onChange={onChange}
      />
      {currentValue === value && children}
    </div>
  );
}

export default ScheduleOption;