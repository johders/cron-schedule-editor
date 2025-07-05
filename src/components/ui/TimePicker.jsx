import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./TimePicker.module.css";
import appStyles from "../../App.module.css";

function TimePicker({ value, onChange, error = ""}) {
  const hasError = !!error;

  return (
    <div className={styles.wrapper}>
      {hasError && <div className={appStyles.errorMessage}>{error}</div>}
    <ReactDatePicker
      selected={value}
      onChange={onChange}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={5}
      timeCaption="Time"
      dateFormat="h:mm aa"
      placeholderText="Select time"
      className={`${styles.customTimePicker} ${hasError ? appStyles.inputError : ""}`}
      popperPlacement="bottom"
    />
    </div>
  );
}

export default TimePicker;
