import { CSSProperties } from "react";

export const suggestionsListStyles: CSSProperties = {
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  maxHeight: "300px",
  overflowY: "auto" as const, // Явное указание типа
  backgroundColor: "#fff",
  border: "1px solid #ccc",
  borderRadius: "4px",
  marginTop: "4px",
  padding: 0,
  listStyle: "none" as const,
  zIndex: 1000,
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

export const suggestionItemStyles: CSSProperties = {
  padding: "10px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  borderBottom: "1px solid #eee",
};

export const selectedSuggestionStyle: CSSProperties = {
  backgroundColor: "#f0f0f0",
};

export const loadingMessageStyles: CSSProperties = {
  padding: "10px",
  color: "#666",
};

export const noResultsMessageStyles: CSSProperties = {
  padding: "10px",
  color: "#666",
};

export const inputStyles = {
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "16px",
};
