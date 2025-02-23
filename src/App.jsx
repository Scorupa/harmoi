import React, { useState, useEffect } from 'react';
import './App.css';

// Dynamically import SVGs using import.meta.glob()
const svgFolderPath = '../harmoiGlyphs/';
const svgModules = import.meta.glob('../harmoiGlyphs/*.svg');

function App() {
  // ---- State variables and setters ------------------------------------
  const [searchText, setSearchText] = useState('');
  const [submittedText, setSubmittedText] = useState('');

  const [SelectedSvg, setSelectedSvg] = useState(null);

  const [isListOpen, setIsListOpen] = useState(false);
  const [svgNames, setSvgNames] = useState([]);

  // ---- functions ------------------------------------------------------

  useEffect(() => {
    // Extract file names from the paths of SVGs to show as options
    setSvgNames(Object.keys(svgModules).map((path) =>
      path.replace(svgFolderPath, '')
          .replace('.svg', '')));
  }, []);

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    setSubmittedText(searchText);
    const svgPath = `${svgFolderPath}${searchText}.svg`;

    if (svgModules[svgPath]) {
      svgModules[svgPath]().then((module) => {
        if (module.ReactComponent) {
          // If the SVG is an inline component
          setSelectedSvg(() => module.ReactComponent);
        } else if (module.default) {
          // If the SVG is an image URL
          setSelectedSvg(module.default);
        } else {
          setSelectedSvg(null);
        }
      });
    } else {
      setSelectedSvg(null);
    }
  };

  // ---- html ------------------------------------------------------

  return (
    <>
      <h1>Harmoi Character Dictionary</h1>

      {/* Input field for user to choose a Harmoi character */}
      <input
        type="text"
        value={searchText}
        onChange={handleInputChange}
        placeholder="Enter a word (try 'yellow')"
      />
      <button onClick={handleSearch}>Search</button>

      {/* Collapsible List of Available SVG Names */}
      {svgNames.length > 0 && (
        <div>
          <button onClick={() => setIsListOpen(!isListOpen)}>
            {isListOpen ? 'Hide List' : 'Show Characters List'}
          </button>

          {isListOpen && (
            <div>
              <h3>Available Harmoi Characters:</h3>
              <ul>
                {svgNames.map((word) => (
                  <li key={word}>{word}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Render the selected SVG */}
      {SelectedSvg &&
        (typeof SelectedSvg === 'string' ? (
          <div>
            <h3>Selected SVG:</h3>
            <img src={SelectedSvg} alt={searchText} width={100} height={100} />
          </div>
        ) : (
          <div>
            <h3>Selected SVG:</h3>
            <SelectedSvg width={100} height={100} />
          </div>
        ))}

      {/* Show message if no matching SVG is found */}
      {!SelectedSvg && submittedText && <p>{submittedText} does not have a character.</p>}
    </>
  );
}

export default App;
