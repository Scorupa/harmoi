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
    const results = words.map(word => {
      const match = svgData.find(svg => svg.name === word);
      return match ? { name: word, src: match.src } : { name: word, src: null };
    });

    setSubmittedText(searchText);
    setSelectedSvg(results);
  };

  return (
    <div>
      <h1 className="title">Harmoi Character Display</h1>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Enter a word or sentence"
        />
        <button className="search-button" onClick={handleSearch}>
          Translate
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
          <h3 className="selected-svg-title">Your input in Harmoi characters:</h3>
          <div className="selected-svg-list">
            {selectedSvg.map(({ name, src }, index) => (
              <div key={index} className="selected-svg-item">
                {src ? (
                  typeof src === 'string' ? (
                    <img src={src} alt={name} className="selected-svg" />
                  ) : (
                    <src className="selected-svg" />
                  )
                ) : (
                  <div className="no-svg">No character found</div> // Placeholder for missing SVG
                )}
                <p className="selected-svg-name">{name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <DarkModeToggle />
    </div>
  );
}

export default App;
