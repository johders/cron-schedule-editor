import { useState } from "react";
import "./App.css";
import SelectBox from "./components/SelectBox";
import RadioButton from "./components/RadioButton";
import TimePicker from "./components/TimePicker";
import MinuteInput from "./components/MinuteInput";
import TextArea from "./components/TextArea";
import Button from "./components/Button";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const weekly = "Weekly";
const daily = "Daily";
const monthly = "Monthly";
const custom = "Custom";

function App() {
  const [selectedSchedulingOption, setSelectedSchedulingOption] =
    useState(weekly);
  const [selectedDay, setSelectedDay] = useState("");
  const [dateTime, setDateTime] = useState(null);
  const [minutes, setMinutes] = useState("");
  const [text, setText] = useState("Nothing scheduled");

  return (
    <div>
      <RadioButton
        label={weekly}
        name="scheduling-option"
        value={weekly}
        checked={selectedSchedulingOption === "Weekly"}
        onChange={setSelectedSchedulingOption}
      />

      <SelectBox options={days} value={selectedDay} onChange={setSelectedDay} />

      <TimePicker value={dateTime} onChange={setDateTime} />

      <RadioButton
        label={daily}
        name="scheduling-option"
        value={daily}
        checked={selectedSchedulingOption === "Daily"}
        onChange={setSelectedSchedulingOption}
      />

      <MinuteInput value={minutes} onChange={setMinutes} />

      <RadioButton
        label={monthly}
        name="scheduling-option"
        value={monthly}
        checked={selectedSchedulingOption === "Monthly"}
        onChange={setSelectedSchedulingOption}
      />

      <RadioButton
        label={custom}
        name="scheduling-option"
        value={custom}
        checked={selectedSchedulingOption === "Custom"}
        onChange={setSelectedSchedulingOption}
      />

      <TextArea value={text} onChange={setText}/>

      <Button children={"Save"}></Button>
      <Button children={"Load"}></Button>
    </div>
  );
}

export default App;
