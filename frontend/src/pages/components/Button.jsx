const buttonTypes = {
  danger: "bg-red-500 hover:bg-red-600",
  primary: "bg-sky-500 hover:bg-sky-600",
  success: "bg-emerald-500 hover:bg-emerald-600",
};

function Button({ text, classes, onClick, type = "primary" }) {
  return (
    <>
      <button
        type="button"
        className={`${classes} cursor-pointer rounded-md p-2 text-sm text-white uppercase shadow-md transition-all duration-300 ${buttonTypes[type]}`}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
}

export default Button;
