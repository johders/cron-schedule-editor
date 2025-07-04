import NumberInput from "../ui/NumberInput";

function TimeIntervalSchedule({ minutes, setMinutes }) {
  return (
    <div>
      <span>Every</span>
      <NumberInput value={minutes} maxInput="59" onChange={setMinutes} />
      <span>Minutes</span>
    </div>
  );
}

export default TimeIntervalSchedule;
