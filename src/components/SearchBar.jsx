import { useState, useRef } from "react";

const SearchBar = ({ onSelectedCity }) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);

  // Debounced search for suggestions
  const fetchSuggestions = async (searchQuery) => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          searchQuery
        )}&count=5&language=en&format=json`
      );
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      
      if (data && data.results && data.results.length > 0) {
        setSuggestions(data.results);
        setShowSuggestions(true);
        setSelectedIndex(-1);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (err) {
      console.error('Error fetching suggestions:', err);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setError("");
    
    // Fetch suggestions with a small delay
    setTimeout(() => fetchSuggestions(value), 300);
  };

  const handleSearch = async (searchQuery = query) => {
    setError("");
    setIsLoading(true);
    setShowSuggestions(false);

    const trimmedQuery = searchQuery.trim();
    
    if (!trimmedQuery) {
      setError("Please enter a city name.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          trimmedQuery
        )}&count=1&language=en&format=json`
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data && data.results && data.results.length > 0) {
        const { latitude, longitude, name, country, admin1 } = data.results[0];
        onSelectedCity({ 
          latitude, 
          longitude, 
          name, 
          country,
          admin1: admin1 || '' 
        });
        setQuery(`${name}${admin1 ? `, ${admin1}` : ''}, ${country}`);
      } else {
        setError("City not found. Please try a different search term.");
      }
    } catch (err) {
      setError("Unable to search at the moment. Please try again.");
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Close suggestions immediately when Enter is pressed
    closeSuggestions();
    
    // If a suggestion is selected, use it
    if (selectedIndex >= 0 && suggestions[selectedIndex]) {
      const selected = suggestions[selectedIndex];
      const { latitude, longitude, name, country, admin1 } = selected;
      onSelectedCity({ latitude, longitude, name, country, admin1: admin1 || '' });
      setQuery(`${name}${admin1 ? `, ${admin1}` : ''}, ${country}`);
    } else {
      // Otherwise perform regular search
      handleSearch();
    }
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) {
      // Handle Enter key even when no suggestions
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit(e);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Tab':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          const selected = suggestions[selectedIndex];
          setQuery(`${selected.name}${selected.admin1 ? `, ${selected.admin1}` : ''}, ${selected.country}`);
          closeSuggestions(); // Use the new function
        } else if (suggestions.length > 0) {
          // Tab to first suggestion if none selected
          const first = suggestions[0];
          setQuery(`${first.name}${first.admin1 ? `, ${first.admin1}` : ''}, ${first.country}`);
          closeSuggestions(); // Use the new function
        }
        break;
      case 'Enter':
        e.preventDefault();
        handleSubmit(e);
        break;
      case 'Escape':
        closeSuggestions(); // Use the new function
        inputRef.current?.blur();
        break;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const { latitude, longitude, name, country, admin1 } = suggestion;
    onSelectedCity({ latitude, longitude, name, country, admin1: admin1 || '' });
    setQuery(`${name}${admin1 ? `, ${admin1}` : ''}, ${country}`);
    closeSuggestions(); // Use the new function
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow clicks
    setTimeout(() => {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }, 200);
  };

  // Function to manually close suggestions
  const closeSuggestions = () => {
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  const handleInputFocus = () => {
    if (suggestions.length > 0 && query.length >= 2) {
      setShowSuggestions(true);
    }
  };

  const handleSearchClick = () => {
    handleSearch();
  };

  return (
    <div className="w-full flex flex-col items-center gap-5 mt-6">
      <h1 className="text-neutral-0 text-4xl mt-10 font-bold text-center px-4">
        How's the sky looking today?
      </h1>
      
      <div className="relative w-full max-w-2xl px-4">
        <div className="w-full bg-neutral-0/20 backdrop-blur-lg rounded-2xl border border-neutral-0/20 shadow-lg overflow-hidden">
          <div className="flex items-center p-2 gap-3">
            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-300">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </div>
              <input
                ref={inputRef}
                placeholder="Search for a city..."
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                disabled={isLoading}
                className="w-full bg-neutral-900/50 text-neutral-0 placeholder-neutral-300 pl-12 pr-4 py-3 rounded-xl border border-neutral-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Search for a city"
                aria-expanded={showSuggestions}
                aria-haspopup="listbox"
                role="combobox"
              />
            </div>

            <button
              type="button"
              onClick={handleSearchClick}
              disabled={isLoading || !query.trim()}
              className="bg-blue-500 hover:bg-blue-700 disabled:bg-neutral-600 disabled:cursor-not-allowed text-neutral-0 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 min-w-[100px] justify-center"
              aria-label="Search"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-neutral-0 border-t-transparent"></div>
                  <span>Searching...</span>
                </>
              ) : (
                'Search'
              )}
            </button>
          </div>

          {error && (
            <div className="px-4 pb-3">
              <p className="text-orange-500 text-sm flex items-center gap-2" role="alert">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                {error}
              </p>
            </div>
          )}
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-4 right-4 mt-2 bg-neutral-900/95 backdrop-blur-lg border border-neutral-600/50 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto">
            <div className="py-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={`${suggestion.latitude}-${suggestion.longitude}`}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`w-full text-left px-4 py-3 hover:bg-neutral-700/50 transition-colors duration-150 flex items-center justify-between ${
                    selectedIndex === index ? 'bg-blue-500/30 text-blue-500' : 'text-neutral-0'
                  }`}
                  role="option"
                  aria-selected={selectedIndex === index}
                >
                  <div>
                    <div className="font-medium">
                      {suggestion.name}
                      {suggestion.admin1 && `, ${suggestion.admin1}`}
                    </div>
                    <div className="text-sm text-neutral-300">{suggestion.country}</div>
                  </div>
                  {selectedIndex === index && (
                    <div className="text-blue-500 text-xs">Press Tab or Enter</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Help text */}
      <p className="text-neutral-300 text-sm text-center px-4 max-w-md">
        Start typing a city name, use ↑↓ to navigate suggestions, Tab to select, Enter to search
      </p>
    </div>
  );
};

export default SearchBar;