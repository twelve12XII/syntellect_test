import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { AutocompleteStore } from "./AutocompleteStore";
import { SuggestionsList } from "./SuggestionsList";

interface AutocompleteInputProps {
  maxSuggestions?: number;
}

export const AutocompleteInput = observer(
  ({ maxSuggestions = 3 }: AutocompleteInputProps) => {
    const store = React.useMemo(
      () => new AutocompleteStore(maxSuggestions),
      [maxSuggestions]
    );
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(event.target as Node)
        ) {
          store.toggleSuggestions(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        store.dispose();
      };
    }, [store]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      store.handleKeyDown(e.key);
    };

    return (
      <div ref={wrapperRef} style={{ position: "relative", width: "300px" }}>
        <input
          type="text"
          value={store.inputValue}
          onChange={(e) => store.setInputValue(e.target.value)}
          onFocus={() => store.toggleSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder="Введите название страны"
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "16px",
          }}
        />

        {store.showSuggestions && (
          <SuggestionsList
            suggestions={store.suggestions}
            isLoading={store.isLoading}
            inputValue={store.inputValue}
            selectedIndex={store.selectedIndex}
            onSuggestionClick={(suggestion) =>
              store.selectSuggestion(suggestion)
            }
          />
        )}
      </div>
    );
  }
);
