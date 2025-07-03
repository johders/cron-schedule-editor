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
    <div class="container">
      <div class="schedulingOption">
        <RadioButton
          label={weekly}
          name="scheduling-option"
          value={weekly}
          checked={selectedSchedulingOption === "Weekly"}
          onChange={setSelectedSchedulingOption}
        />

        <div className={"weeklyControls"}>
          <SelectBox
            options={days}
            value={selectedDay}
            onChange={setSelectedDay}
          />

          <TimePicker value={dateTime} onChange={setDateTime} />
        </div>
      </div>

      <div class="schedulingOption">
        <RadioButton
          label={daily}
          name="scheduling-option"
          value={daily}
          checked={selectedSchedulingOption === "Daily"}
          onChange={setSelectedSchedulingOption}
        />

        <MinuteInput value={minutes} onChange={setMinutes} />
      </div>

      <div class="schedulingOption">
        <RadioButton
          label={monthly}
          name="scheduling-option"
          value={monthly}
          checked={selectedSchedulingOption === "Monthly"}
          onChange={setSelectedSchedulingOption}
        />
      </div>
      <div class="schedulingOption"></div>
      <RadioButton
        label={custom}
        name="scheduling-option"
        value={custom}
        checked={selectedSchedulingOption === "Custom"}
        onChange={setSelectedSchedulingOption}
      />

      <div className={"fullWidth"}>
      <TextArea value={text} onChange={setText} />
      <div className={"buttonGroup"}>
        <Button children={"Save"}></Button>
        <Button children={"Load"}></Button>
      </div>
      </div>
    </div>
  );
}

export default App;
