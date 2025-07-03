function Button({ children, onClick, disabled = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;