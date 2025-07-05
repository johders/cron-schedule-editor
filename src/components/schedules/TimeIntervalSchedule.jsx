import NumberInput from "../ui/NumberInput";

function TimeIntervalSchedule({ minutes, setMinutes, error }) {
  return (
    <div>
      <span>Every</span>
      <NumberInput value={minutes} maxInput="59" onChange={setMinutes} error={error} id="time-interval"/>
      <span>Minutes</span>
    </div>
  );
}

export default TimeIntervalSchedule;
