function MinuteInput({ value, onChange }) {
  return (
    <input
      type="number"
      min="0"
      placeholder="Enter minutes"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default MinuteInput;
