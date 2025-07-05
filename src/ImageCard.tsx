import React, { useState } from 'react';
import './ImageCard.css';

interface ImageCardProps {
  imageUrl: string;
  text: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ imageUrl, text }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="card-container">
      <img src={imageUrl} alt="Bible scene" className="card-image" />
      <div className={`card-text-wrapper ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="card-toggle-wrapper">
          <div className="card-toggle" onClick={toggleCollapse}>
            {isCollapsed ? '∧' : '∨'}
          </div>
        </div>
        {!isCollapsed && (
          <div className="card-text">{text}</div>
        )}
      </div>
    </div>
  );
};

export default ImageCard;
