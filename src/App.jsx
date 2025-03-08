import React, { useState, useEffect } from 'react';
import { loadSVGs } from "./utils/loadSVGs";

import HarmoiKey from "./components/HarmoiKey";
import SvgList from "./components/SvgList";
import SearchBar from "./components/SearchBar";
import SelectedSvgDisplay from "./components/SelectedSvgDisplay";
import DarkModeToggle from "./components/DarkModeToggle";

import './App.css';

function App() {
  const [selectedSvg, setSelectedSvg] = useState([]);
  // map of all SVG elements
  const [svgData, setSvgData] = useState([]);

  useEffect(() => {
    loadSVGs().then(setSvgData);
  }, []);

  return (
    <div>
      <h1 className="title">Harmoi Character Display</h1>

      <SearchBar svgData={svgData} setSelectedSvg={setSelectedSvg} />

      <HarmoiKey />

      <SvgList svgData={svgData} />

      <SelectedSvgDisplay selectedSvg={selectedSvg} />

      <DarkModeToggle />
    </div>
  );
}

export default App;
