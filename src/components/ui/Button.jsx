import styles from "./Button.module.css";

function Button({ children, onClick, disabled = false, color = "default" }) {
  return (
    <button
      className={`${styles.button} ${styles[color]}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
