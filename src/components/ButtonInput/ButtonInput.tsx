import React, { useState } from "react";

interface ButtonConfig {
  text: string; //текст кнопки
  position: "left" | "right"; //позиция кнопки(слева или справа)
  onClick: (currentValue: string) => string | void; //колбэк при нажатии
}

interface ButtonInputProps {
  buttons: ButtonConfig[]; //все кнопки компонента (массив)
  initialValue?: string; //начальное значение инпута
}

export const ButtonInput = ({
  buttons,
  initialValue = "",
}: ButtonInputProps) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleButtonClick = (button: ButtonConfig) => {
    const result = button.onClick(value);
    if (result !== undefined) {
      setValue(result);
    }
  };

  const leftButtons = buttons.filter((btn) => btn.position === "left");
  const rightButtons = buttons.filter((btn) => btn.position === "right");

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        width: "100%",
        maxWidth: "500px",
      }}
    >
      {leftButtons.map((btn, index) => (
        <button key={`left-${index}`} onClick={() => handleButtonClick(btn)}>
          {btn.text}
        </button>
      ))}

      <input
        type="text"
        value={value}
        onChange={handleChange}
        style={{
          padding: "8px 12px",
          flexGrow: 1,
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />

      {rightButtons.map((btn, index) => (
        <button key={`right-${index}`} onClick={() => handleButtonClick(btn)}>
          {btn.text}
        </button>
      ))}
    </div>
  );
};
