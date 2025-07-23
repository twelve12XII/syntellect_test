import React from "react";
import "./App.css";
import { ButtonInput } from "./components/ButtonInput";
import { AutocompleteInput } from "./components/AutocompleteInput";

function App() {
  return (
    <>
      <div style={{ padding: "24px" }}>
        <h2>Контрол с 2 кнопками справа</h2>
        <ButtonInput
          buttons={[
            {
              text: "Очистить",
              position: "right",
              onClick: () => "",
            },
            {
              text: "Hello World",
              position: "right",
              onClick: () => "Hello world!",
            },
          ]}
        />

        <h2 style={{ marginTop: "24px" }}>Контрол с кнопками слева и справа</h2>
        <ButtonInput
          buttons={[
            {
              text: "Проверить число",
              position: "left",
              onClick: (value) => {
                if (/^-?\d+\.?\d*$/.test(value.trim())) {
                  // проверка на value - число (включая отрицательные и дробные)
                  alert(`Введено число: ${value}`);
                }
                return undefined;
              },
            },
            {
              text: "Alert текста",
              position: "right",
              onClick: (value) => alert(value),
            },
          ]}
        />
      </div>
      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <h2>Автокомплит (максимум 3 подсказки)</h2>
        <AutocompleteInput maxSuggestions={3} />

        <h2 style={{ marginTop: "30px" }}>
          Автокомплит (максимум 10 подсказок)
        </h2>
        <AutocompleteInput maxSuggestions={10} />
      </div>
    </>
  );
}

export default App;
