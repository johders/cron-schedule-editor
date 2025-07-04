import styles from "./Button.module.css";

function Button({ children, onClick, disabled = false }) {
  return (
    <button
      className={styles.button}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
