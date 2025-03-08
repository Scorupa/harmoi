import React from 'react';
import "./SelectedSvgDisplay.css";

const SelectedSvgDisplay = ({ selectedSvg }) => {
  if (selectedSvg.length === 0) return null;

  return (
    <div className="selected-svg-container">
      <h3 className="selected-svg-title">Your input in Harmoi characters:</h3>
      <div className="selected-svg-list">
        {selectedSvg.map(({ name, src }, index) => (
          <div key={index} className="selected-svg-item">
            {src ? (
              typeof src === 'string' ? (
                <img src={src} alt={name} className="selected-svg harmoi-glyph" />
              ) : (
                <src className="selected-svg harmoi-glyph" />
              )
            ) : (
              <div className="no-svg">No character found</div>
            )}
            <p className="selected-svg-name">{name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedSvgDisplay;
