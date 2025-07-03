function RadioButton({ label, name, value, checked, onChange }) {
  return (
    <label>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.value)}
      />
      {label}
    </label>
  );
}

export default RadioButton;
