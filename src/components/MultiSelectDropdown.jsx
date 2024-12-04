import React, { useState, useRef, useEffect } from "react";
import "../styles/MultiSelectDropdown.css";

const MultiSelectDropdown = ({ options, onSelectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const dropdownRef = useRef(null);

  // Handle closing the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Handle selection of an option
  const handleSelectOption = (option) => {
    const isSelected = selectedOptions.some((o) => o.id === option.id);
    const updatedSelection = isSelected
      ? selectedOptions.filter((o) => o.id !== option.id)
      : [...selectedOptions, option];

    setSelectedOptions(updatedSelection);
    onSelectionChange(updatedSelection);
  };

  // Handle key navigation
  const handleKeyDown = (event) => {
    if (!isOpen) {
      if (event.key === "Enter" || event.key === " ") {
        setIsOpen(true);
        event.preventDefault();
      }
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        setHighlightedIndex((prev) => (prev + 1) % options.length);
        event.preventDefault();
        break;
      case "ArrowUp":
        setHighlightedIndex((prev) => (prev - 1 + options.length) % options.length);
        event.preventDefault();
        break;
      case "Enter":
      case " ":
        if (highlightedIndex >= 0) {
          handleSelectOption(options[highlightedIndex]);
        }
        event.preventDefault();
        break;
      case "Tab":
        setIsOpen(false);
        break;
      case "Escape":
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div
      className="multi-select-dropdown"
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-expanded={isOpen}
      role="combobox"
    >
      {/* Selected Options Display */}
      <div className="dropdown-header" onClick={toggleDropdown}>
        <div className="selected-items">
          {selectedOptions.map((option) => (
            <span key={option.id} className="selected-item">
              {option.label}
            </span>
          ))}
        </div>
        <div className="dropdown-arrow">{isOpen ? "▲" : "▼"}</div>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <ul className="dropdown-options" role="listbox">
          {options.map((option, index) => {
            const isSelected = selectedOptions.some((o) => o.id === option.id);
            const isHighlighted = index === highlightedIndex;

            return (
              <li
                key={option.id}
                className={`dropdown-option ${isSelected ? "selected" : ""} ${
                  isHighlighted ? "highlighted" : ""
                }`}
                onClick={() => handleSelectOption(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
                role="option"
                aria-selected={isSelected}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
