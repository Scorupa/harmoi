import React, { useState, useEffect, useRef } from 'react';
import DarkModeToggle from "./DarkModeToggle";
import './App.css';

// Dynamically import SVGs
const svgModules = import.meta.glob('../harmoiGlyphs/*.svg');

function App() {
  const [searchText, setSearchText] = useState('');
  const [submittedText, setSubmittedText] = useState('');
  const [selectedSvg, setSelectedSvg] = useState([]);

  const [isListOpen, setIsListOpen] = useState(false);
  const [svgData, setSvgData] = useState([]);

  const [maxItemWidth, setMaxItemWidth] = useState(0);
  const listRef = useRef(null);

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

  useEffect(() => {
    if (!isListOpen || maxItemWidth !== 0) return;

    const calculateWidth = () => {
      if (listRef.current) {
        let maxWidth = 0;
        const items = listRef.current.querySelectorAll('.svg-list-item');

        items.forEach(item => {
          const img = item.querySelector('.svg-preview');
          const text = item.querySelector('span');

          if (img && text) {
            const totalWidth = img.offsetWidth + text.offsetWidth;
            if (totalWidth > maxWidth) {
              maxWidth = totalWidth;
            }
          }
        });

        setMaxItemWidth(maxWidth);
      }
    };

    // Delay measurement to ensure elements are fully rendered
    const timeout = setTimeout(calculateWidth, 50);

    return () => clearTimeout(timeout); // Cleanup timeout if component unmounts
  }, [isListOpen]);


  const handleSearch = () => {
    const words = searchText.toLowerCase().split(/\s+/); // Split input into words
    const foundSvgs = words
      .map(word => svgData.find(svg => svg.name === word))
      .filter(Boolean); // Remove any unmatched words

    setSubmittedText(searchText);
    setSelectedSvg(foundSvgs.map(svg => svg.src));
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
            <ul className="svg-list" ref={listRef} style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${maxItemWidth}px, 1fr))` }}>
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
      {selectedSvg.length > 0 && (
        <div className="selected-svg-container">
          <h3 className="selected-svg-title">Selected SVGs:</h3>
          <div className="selected-svg-list">
            {selectedSvg.map((src, index) => (
              typeof src === 'string' ? (
                <img key={index} src={src} alt={`SVG ${index}`} className="selected-svg" />
              ) : (
                <src key={index} className="selected-svg" />
              )
            ))}
          </div>
        </div>
      )}

      {selectedSvg.length === 0 && submittedText && <p className="not-found">"{submittedText}" does not have a character.</p>}

      <DarkModeToggle />
    </div>
  );
}

export default App;
