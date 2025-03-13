import React, { useState, useRef, useEffect } from 'react';
import "./SvgList.css";

const SvgList = ({ svgData }) => {
  const [isListOpen, setIsListOpen] = useState(false);
  const [maxItemWidth, setMaxItemWidth] = useState(0);
  const listRef = useRef(null);

  useEffect(() => {
    if (maxItemWidth !== 0) return;

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

    const timeout = setTimeout(calculateWidth, 100);
    return () => clearTimeout(timeout);
  }, [svgData]);

  return (
    <div className="list-container">
      <button className="toggle-button" onClick={() => setIsListOpen(!isListOpen)}>
        {isListOpen ? 'Hide List' : 'Show Characters List'}
      </button>

      <ul
        className={`svg-list ${isListOpen ? '' : 'hidden-list'}`}
        ref={listRef}
        style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${maxItemWidth}px, 1fr))` }}>
        {svgData.map(({ name, src }) => (
          <li key={name} className="svg-list-item">
            <div className="svg-preview-container">
              {typeof src === 'string' ?
                <img src={src} alt={name} className="svg-preview harmoi-glyph" />:
                <src className="svg-preview harmoi-glyph" />}
            </div>
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SvgList;
