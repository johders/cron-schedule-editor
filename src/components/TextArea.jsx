function TextArea({ value, onChange}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default TextArea;