import React, { useState, useEffect } from "react";
import HarmoiKeySvg from "../00 key.svg";
import "./HarmoiKey.css";

const HarmoiKey = () => {
  const [showHarmoiKeySvg, setShowHarmoiKeySvg] = useState(false);

  return (
    <div className="harmoi-key">
      <button onClick={() => setShowHarmoiKeySvg(!showHarmoiKeySvg)}>
        {showHarmoiKeySvg ? "Hide Key" : "Show Key"}
      </button>

      {showHarmoiKeySvg && (
        <div className="key-svg-container">
          <img src={HarmoiKeySvg} alt="Key" className="key-svg harmoi-glyph" />
        </div>
      )}
    </div>
  );
};

export default HarmoiKey;
