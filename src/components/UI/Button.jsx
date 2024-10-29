export function PrimaryButton({ children, classes = "", onClick, ...props }) {
  return (
    <button className={`btn-primary ${classes}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

export function SecondaryButton({ children, classes = "", onClick, ...props }) {
  return (
    <button className={`btn-secondary ${classes}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

export function OutlineButton({ children, classes = "", onClick, ...props }) {
  return (
    <button className={`btn-outline ${classes}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
