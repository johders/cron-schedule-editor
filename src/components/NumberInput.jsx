function NumberInput({ value, placeholder, maxInput, onChange }) {
  return (
    <input
      type="number"
      min="0"
      max={maxInput}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default NumberInput;
