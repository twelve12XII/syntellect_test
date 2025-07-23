import React from "react";
import { SuggestionsListProps } from "./types";
import { SuggestionItem } from "./SuggestionItem";
import {
  suggestionsListStyles,
  loadingMessageStyles,
  noResultsMessageStyles,
} from "./styles";

export const SuggestionsList: React.FC<SuggestionsListProps> = ({
  suggestions,
  isLoading,
  inputValue,
  selectedIndex,
  onSuggestionClick,
}) => (
  <ul style={suggestionsListStyles}>
    {isLoading ? (
      <li style={loadingMessageStyles}>Загрузка...</li>
    ) : suggestions.length === 0 ? (
      <li style={noResultsMessageStyles}>
        {inputValue ? "Ничего не найдено" : "Введите название страны"}
      </li>
    ) : (
      suggestions.map((suggestion, index) => (
        <SuggestionItem
          key={`${suggestion.name}-${index}`}
          suggestion={suggestion}
          isSelected={index === selectedIndex}
          onClick={() => onSuggestionClick(suggestion)}
        />
      ))
    )}
  </ul>
);
