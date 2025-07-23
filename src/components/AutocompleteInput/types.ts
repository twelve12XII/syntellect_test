import { CountryInfo } from "../../api/apiService";

export interface AutocompleteInputProps {
  maxSuggestions?: number;
}

export interface SuggestionsListProps {
  suggestions: CountryInfo[];
  isLoading: boolean;
  inputValue: string;
  selectedIndex: number;
  onSuggestionClick: (suggestion: CountryInfo) => void;
}

export interface SuggestionItemProps {
  suggestion: CountryInfo;
  isSelected: boolean;
  onClick: () => void;
}
