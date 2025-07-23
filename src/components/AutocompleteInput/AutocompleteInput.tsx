import React, { useState, useEffect, useRef } from "react";
import { CountryInfo, getCountryByName } from "../../api/apiService";
import { SuggestionsList } from "./SuggestionsList";
import { AutocompleteInputProps } from "./types";
import { inputStyles } from "./styles";

export const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  maxSuggestions = 3,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<CountryInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputValue.trim() === "") {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setIsLoading(true);
      try {
        const data = await getCountryByName(inputValue);
        setSuggestions(data.slice(0, maxSuggestions));
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [inputValue, maxSuggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSelectedIndex(-1);
  };

  const handleSuggestionClick = (suggestion: CountryInfo) => {
    setInputValue(suggestion.name);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (suggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} style={{ position: "relative", width: "300px" }}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
        onKeyDown={handleKeyDown}
        placeholder="Введите название страны"
        style={inputStyles}
      />

      {showSuggestions && (
        <SuggestionsList
          suggestions={suggestions}
          isLoading={isLoading}
          inputValue={inputValue}
          selectedIndex={selectedIndex}
          onSuggestionClick={handleSuggestionClick}
        />
      )}
    </div>
  );
};
