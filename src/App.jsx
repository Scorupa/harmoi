import React, { useState, useEffect } from 'react';

// Dynamically import SVGs using import.meta.glob()
const svgModules = import.meta.glob('../harmoiGlyphs/*.svg');

function SvgSelector() {
  const [svgNames, setSvgNames] = useState([]);
  const [selectedSvg, setSelectedSvg] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [submittedText, setSubmittedText] = useState('');

  useEffect(() => {
    // Extract file names from the paths of SVGs to show as options
    setSvgNames(Object.keys(svgModules).map((path) => path.replace('../harmoiGlyphs/', '').replace('.svg', '')));
  }, []);

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    setSubmittedText(searchText);
    const svgPath = `../harmoiGlyphs/${searchText}.svg`;

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

  return (
    <div>
      <h1>SVG Selector</h1>

      {/* Input field for user to choose an SVG */}
      <input
        type="text"
        value={searchText}
        onChange={handleInputChange}
        placeholder="Enter SVG name (e.g., 'icon1')"
      />
      <button onClick={handleSearch}>Submit</button>

      {/* Display available SVG names as options */}
      {svgNames.length > 0 && (
        <div>
          <h3>Available SVGs:</h3>
          <ul>
            {svgNames.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Render the selected SVG */}
      {selectedSvg &&
        (typeof selectedSvg === 'string' ? (
          <div>
            <h3>Selected SVG:</h3>
            <img src={selectedSvg} alt={searchText} width={100} height={100} />
          </div>
        ) : (
          <div>
            <h3>Selected SVG:</h3>
            <selectedSvg width={100} height={100} />
          </div>
        ))}

      {/* Show message if no matching SVG is found */}
      {!selectedSvg && submittedText && <p>{submittedText} does not have a character.</p>}
    </div>
  );
}

export default SvgSelector;
