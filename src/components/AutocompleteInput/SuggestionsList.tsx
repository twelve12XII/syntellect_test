import React from "react";
import { observer } from "mobx-react-lite";
import { CountryInfo } from "../../api/apiService";

interface SuggestionsListProps {
  suggestions: CountryInfo[];
  isLoading: boolean;
  inputValue: string;
  selectedIndex: number;
  onSuggestionClick: (suggestion: CountryInfo) => void;
}

export const SuggestionsList = observer(
  ({
    suggestions,
    isLoading,
    inputValue,
    selectedIndex,
    onSuggestionClick,
  }: SuggestionsListProps) => (
    <ul
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        maxHeight: "300px",
        overflowY: "auto",
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        borderRadius: "4px",
        marginTop: "4px",
        padding: 0,
        listStyle: "none",
        zIndex: 1000,
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      {isLoading ? (
        <li style={{ padding: "10px", color: "#666" }}>Загрузка...</li>
      ) : suggestions.length === 0 ? (
        <li style={{ padding: "10px", color: "#666" }}>
          {inputValue ? "Ничего не найдено" : "Введите название страны"}
        </li>
      ) : (
        suggestions.map((suggestion, index) => (
          <li
            key={`${suggestion.name}-${index}`}
            onClick={() => onSuggestionClick(suggestion)}
            style={{
              padding: "10px",
              cursor: "pointer",
              backgroundColor: index === selectedIndex ? "#f0f0f0" : "transparent",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              borderBottom: "1px solid #eee",
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
        ))
      )}
    </ul>
  )
);