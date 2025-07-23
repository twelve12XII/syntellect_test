import { makeAutoObservable, runInAction } from "mobx";
import { getCountryByName, CountryInfo } from "../../api/apiService";

export class AutocompleteStore {
  inputValue = "";
  suggestions: CountryInfo[] = [];
  isLoading = false;
  showSuggestions = false;
  selectedIndex = -1;
  maxSuggestions: number;

  constructor(maxSuggestions = 3) {
    makeAutoObservable(this);
    this.maxSuggestions = maxSuggestions;
  }

  async fetchSuggestions(value: string) {
    if (value.trim() === "") {
      runInAction(() => {
        this.suggestions = [];
      });
      return;
    }

    this.isLoading = true;
    try {
      const data = await getCountryByName(value);
      runInAction(() => {
        this.suggestions = data.slice(0, this.maxSuggestions);
      });
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      runInAction(() => {
        this.suggestions = [];
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  setInputValue(value: string) {
    this.inputValue = value;
    this.selectedIndex = -1;
    this.debouncedFetch(value);
  }

  selectSuggestion(suggestion: CountryInfo) {
    this.inputValue = suggestion.name;
    this.showSuggestions = false;
  }

  toggleSuggestions(show: boolean) {
    this.showSuggestions = show;
  }

  handleKeyDown(key: string) {
    if (this.suggestions.length === 0) return;

    switch (key) {
      case "ArrowDown":
        this.selectedIndex = Math.min(
          this.selectedIndex + 1,
          this.suggestions.length - 1
        );
        break;
      case "ArrowUp":
        this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
        break;
      case "Enter":
        if (this.selectedIndex >= 0) {
          this.selectSuggestion(this.suggestions[this.selectedIndex]);
        }
        break;
      case "Escape":
        this.toggleSuggestions(false);
        break;
    }
  }

  private debounceTimer: NodeJS.Timeout | null = null;
  private debouncedFetch(value: string) {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    this.debounceTimer = setTimeout(() => {
      this.fetchSuggestions(value);
    }, 300);
  }

  dispose() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
  }
}
