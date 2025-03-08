import React, { useState } from 'react';
import "./SearchBar.css";

const SearchBar = ({ svgData, setSelectedSvg }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    const words = searchText.toLowerCase().split(/\s+/); // Split input into words
    const results = words.map(word => {
      const match = svgData.find(svg => svg.name === word);
      return match ? { name: word, src: match.src } : { name: word, src: null };
    });

    setSelectedSvg(results);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Enter a word or sentence"
      />
      <button className="search-button" onClick={handleSearch}>Translate</button>
    </div>
  );
};

export default SearchBar;
