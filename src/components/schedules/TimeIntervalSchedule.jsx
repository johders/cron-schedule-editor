import NumberInput from "../ui/NumberInput";

function TimeIntervalSchedule({ minutes, setMinutes, errors }) {
  return (
    <div>
      <span>Every</span>
      <NumberInput value={minutes} maxInput="59" onChange={setMinutes} error={errors.minutes} id="time-interval"/>
      <span>Minutes</span>
    </div>
  );
}

export default TimeIntervalSchedule;
