import NumberInput from "../ui/NumberInput";

function TimeIntervalSchedule({ minutes, setMinutes }) {
  return (
    <fieldset>
      <legend>Set time interval</legend>
      <span>Every</span>
      <NumberInput
        value={minutes}
        maxInput="59"
        onChange={setMinutes}
      />
      <span>Minutes</span>
    </fieldset>
  );
}

export default TimeIntervalSchedule;
