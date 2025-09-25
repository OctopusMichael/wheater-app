import { useState, useRef, useEffect } from "react";

const DaysDropdown = ({ selectedDay, onDaySelect, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle day selection
  const handleDayClick = (day) => {
    onDaySelect?.(day);
    setIsOpen(false);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="flex items-center justify-between gap-3 px-4 py-2 bg-neutral-600 hover:bg-neutral-700 text-neutral-0 rounded-lg transition-colors duration-200 min-w-[140px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select day"
      >
        <span className="font-medium">{selectedDay || "what"}</span>

        {/* Dropdown Arrow */}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-neutral-800 border border-neutral-600 rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="py-1" role="listbox">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => handleDayClick(day)}
                className={`w-full text-left px-4 py-3 text-sm transition-colors duration-150 hover:bg-neutral-700 focus:outline-none focus:bg-neutral-700 ${
                  selectedDay === day
                    ? "bg-blue-500 text-neutral-0"
                    : "text-neutral-0"
                }`}
                role="option"
                aria-selected={selectedDay === day}
                tabIndex={-1}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Example usage component
const DaysDropdownExample = () => {
  const [selectedDay, setSelectedDay] = useState("Tuesday");

  return (
    <div className="min-h-screen bg-neutral-900 p-8">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-neutral-0 mb-6">
          Days Dropdown Example
        </h1>

        {/* Basic Usage */}
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">
            Select a day:
          </label>
          <DaysDropdown
            selectedDay={selectedDay}
            onDaySelect={setSelectedDay}
          />
        </div>

        {/* Show selected day */}
        <div className="bg-neutral-800 rounded-lg p-4">
          <p className="text-neutral-0">
            <span className="text-neutral-300">Selected day:</span>{" "}
            <span className="font-medium text-blue-500">
              {selectedDay || "None"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DaysDropdown;
