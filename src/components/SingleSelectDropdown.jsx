import React, { useState, useRef, useEffect } from "react";
import "../styles/SingleSelectDropdown.css";

const Dropdown = ({ options, onSelectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options ? options[0] : null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const dropdownRef = useRef(null);

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
    setSelectedOption(option);
    onSelectionChange(option);
    setIsOpen(false);
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
      className="dropdown"
      ref={dropdownRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="combobox"
      aria-expanded={isOpen}
    >
      {/* Dropdown Header */}
      <div className="dropdown-header" onClick={toggleDropdown}>
        <span className="dropdown-selected">
          {selectedOption || "Select an option"}
        </span>
        <span className="dropdown-arrow">{isOpen ? "▲" : "▼"}</span>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <ul className="dropdown-options" role="listbox">
          {options.map((option, index) => {
            const isHighlighted = index === highlightedIndex;
            const isSelected = selectedOption === option;

            return (
              <li
                key={option}
                className={`dropdown-option ${
                  isHighlighted ? "highlighted" : ""
                }`}
                onClick={() => handleSelectOption(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
                role="option"
                aria-selected={isSelected}
              >
                <span className="dropdown-tick">
                  {isSelected && "✔"}
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

export default Dropdown;
