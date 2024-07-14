import React from "react";

export default function Button({
  children,
  isDisabled,
  size = "fullwidth",
  variant = "contained",
  btnType = "submit",
}) {
  const getBackground = () => {
    if (variant === "contained") {
      return isDisabled
        ? "bg-green-100 cursor-not-allowed text-white"
        : "bg-green-500 cursor-pointer text-white";
    } else if (variant === "outlined") {
      return isDisabled
        ? "border-[2px] border-green-100 cursor-not-allowed text-green-500"
        : "border-[2px] border-green-500 cursor-pointer text-green-500";
    }
  };

  return (
    <button
      disabled={isDisabled}
      className={`${getBackground()} rounded py-2 mt-2  capitalize
      ${
        size === "fullwidth"
          ? "w-full"
          : size === "medium"
          ? "w-1/2"
          : size === "small"
          ? "px-6"
          : ""
      } `}
      type={btnType}
    >
      {children}
    </button>
  );
}
