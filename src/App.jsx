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
    <>
      <h1>Harmoi Character Dictionary</h1>

      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Enter a word (try 'yellow')"
      />
      <button onClick={handleSearch}>Search</button>

      {/* Collapsible List of Available SVG Names with Previews */}
      {svgData.length > 0 && (
        <div>
          <button onClick={() => setIsListOpen(!isListOpen)}>
            {isListOpen ? 'Hide List' : 'Show Characters List'}
          </button>

          {isListOpen && (
            <ul>
              {svgData.map(({ name, src }) => (
                <li key={name} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {typeof src === 'string' ? (
                    <img src={src} alt={name} width={50} height={50} />
                  ) : (
                    <src width={50} height={50} />
                  )}
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Render the selected SVG */}
      {selectedSvg &&
        (typeof selectedSvg === 'string' ? (
          <img src={selectedSvg} alt={searchText} width={100} height={100} />
        ) : (
          <selectedSvg width={100} height={100} />
        ))}

      {!selectedSvg && submittedText && <p>{submittedText} does not have a character.</p>}
    </>
  );
}

export default App;
