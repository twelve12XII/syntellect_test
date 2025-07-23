import React from "react";
import { SuggestionItemProps } from "./types";
import { suggestionItemStyles, selectedSuggestionStyle } from "./styles";

export const SuggestionItem: React.FC<SuggestionItemProps> = ({
  suggestion,
  isSelected,
  onClick,
}) => (
  <li
    onClick={onClick}
    style={{
      ...suggestionItemStyles,
      ...(isSelected ? selectedSuggestionStyle : {}),
    }}
  >
    <img
      src={suggestion.flag}
      alt={suggestion.name}
      style={{ width: "20px", height: "15px", objectFit: "cover" }}
    />
    <div>
      <div style={{ fontWeight: "bold" }}>{suggestion.name}</div>
      <div style={{ fontSize: "0.8em", color: "#666" }}>
        {suggestion.fullName}
      </div>
    </div>
  </li>
);
