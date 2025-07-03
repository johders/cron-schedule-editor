import "./Button.css";

function Button({ children, onClick, disabled = false }) {
  return (
    <button
      class="btn"
      type="button"
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;