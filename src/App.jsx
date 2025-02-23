import React, { useState, useEffect } from 'react';
import './App.css';

// Dynamically import SVGs
const svgModules = import.meta.glob('../harmoiGlyphs/*.svg');

function App() {
  const [searchText, setSearchText] = useState('');
  const [submittedText, setSubmittedText] = useState('');
  const [selectedSvg, setSelectedSvg] = useState(null);

  const [isListOpen, setIsListOpen] = useState(false);
  const [svgData, setSvgData] = useState([]);

  useEffect(() => {
    // Load SVG names and their previews
    const loadSVGs = async () => {
      const entries = await Promise.all(
        Object.entries(svgModules).map(async ([path, importer]) => {
          const name = path.split('/').pop().replace('.svg', '');
          const module = await importer();
          return { name, src: module.default || module.ReactComponent };
        })
      );
      setSvgData(entries);
    };

    loadSVGs();
  }, []);

  const handleSearch = () => {
    setSubmittedText(searchText);
    const foundSvg = svgData.find((svg) => svg.name === searchText);
    setSelectedSvg(foundSvg ? foundSvg.src : null);
  };

  return (
    <div>
      <h1 className="title">Harmoi Character Dictionary</h1>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Enter a word (try 'yellow')"
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Collapsible List of Available SVG Names with Previews */}
      {svgData.length > 0 && (
        <div className="list-container">
          <button className="toggle-button" onClick={() => setIsListOpen(!isListOpen)}>
            {isListOpen ? 'Hide List' : 'Show Characters List'}
          </button>

          {isListOpen && (
            <ul className="svg-list">
              {svgData.map(({ name, src }) => (
                <li key={name} className="svg-list-item">
                  {typeof src === 'string' ? (
                    <img src={src} alt={name} className="svg-preview" />
                  ) : (
                    <src className="svg-preview" />
                  )}
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Render the selected SVG */}
      {selectedSvg && (
        <div className="selected-svg-container">
          <h3 className="selected-svg-title">Selected SVG:</h3>
          {typeof selectedSvg === 'string' ? (
            <img src={selectedSvg} alt={searchText} className="selected-svg" />
          ) : (
            <selectedSvg className="selected-svg" />
          )}
        </div>
      )}

      {!selectedSvg && submittedText && <p className="not-found">{submittedText} does not have a character.</p>}
    </div>
  );
}

export default App;
