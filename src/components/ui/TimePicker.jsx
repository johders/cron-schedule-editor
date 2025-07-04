import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./TimePicker.module.css";

function TimePicker({ value, onChange }) {
  return (
    <ReactDatePicker
      selected={value}
      onChange={onChange}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={5}
      timeCaption="Time"
      dateFormat="h:mm aa"
      placeholderText="Select time"
      className={styles.customTimePicker}
      popperPlacement="bottom"
    />
  );
}

export default TimePicker;
