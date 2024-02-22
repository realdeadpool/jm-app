import React, { useEffect } from "react";
import './Lightbox.css'

export default function Lightbox({isOpen, photos, currentImage, onClose, onPrevious, onNext}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          onPrevious();
          break;
        case "ArrowRight":
          onNext();
          break;
        default:
          break;
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, onPrevious, onNext]);

  if (!isOpen || !photos || !photos.length || currentImage >= photos.length) {
    return null;
  }

  return (
    <div className="lightbox" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose} aria-label="Close">&times;</button>
        <button className="prev" onClick={onPrevious} aria-label="Previous">&lsaquo;</button>
        <button className="next" onClick={onNext} aria-label="Next">&rsaquo;</button>
        <img src={photos[currentImage].url} alt={`Opened item ${currentImage + 1}`} loading="lazy" />
      </div>
    </div>
  );
}
