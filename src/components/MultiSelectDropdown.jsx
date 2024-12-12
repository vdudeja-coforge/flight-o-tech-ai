import React, { useState, useRef, useEffect } from "react";
import "../styles/MultiSelectDropdown.css";

const MultiSelectDropdown = ({ options, onSelectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const dropdownRef = useRef(null);

  useEffect(()=>{
    setSelectedOptions(options);
    onSelectionChange(options);
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelectOption = (option) => {
    const isSelected = selectedOptions.includes(option);
    const updatedSelection = isSelected
      ? selectedOptions.filter((o) => o !== option)
      : [...selectedOptions, option];

    setSelectedOptions(updatedSelection);
    onSelectionChange(updatedSelection);
  };

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
        handleSelectOption(options[highlightedIndex]);
        event.preventDefault();
        break;
      case "Escape":
        setIsOpen(false);
        break;
      case "Tab":
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
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="combobox"
      aria-expanded={isOpen}
    >
      {/* Dropdown Header */}
      <div className="dropdown-header" onClick={toggleDropdown}>
        <span className="dropdown-placeholder">
          {selectedOptions.length > 0
            ? selectedOptions.join(", ")
            : "Select options"}
        </span>
        <div className="dropdown-arrow">{isOpen ? "▲" : "▼"}</div>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <ul className="dropdown-options" role="listbox">
          {options.map((option, index) => {
            const isSelected = selectedOptions.includes(option);
            const isHighlighted = index === highlightedIndex;

            return (
              <li
                key={option}
                className={`dropdown-option ${
                  isSelected ? "selected" : ""
                } ${isHighlighted ? "highlighted" : ""}`}
                onClick={() => handleSelectOption(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
                role="option"
                aria-selected={isSelected}
              >
                <span className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly
                  />
                  <span className="checkmark">
                    {isSelected && "✔"}
                  </span>
                </span>
                {option}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
