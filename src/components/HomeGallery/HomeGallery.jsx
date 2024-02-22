import React, { useCallback, useEffect, useState } from 'react'
import {
  MDBRow,
  MDBCol, MDBContainer
} from "mdb-react-ui-kit";
import Lightbox from "../Lightbox/Lightbox.jsx";
import './HomeGallery.css';

export default function HomeGallery() {
  const [photos, setPhotos] = useState([]);
  const [isOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchPhotos = async () => {
        setIsLoading(true);
        try {
          const apiUrl = import.meta.env.VITE_APP_API_URL.replace(/;$/, ''); // Removes any trailing semicolon
          const response = await fetch(`${apiUrl}/api/photos`);
          if (!response.ok)
            throw new Error('Network response was not ok');
          const data = await response.json();
          setPhotos(data);
        } catch (error) {
          console.error('Fetch operation error:', error);
          setError(error);
        }
      };

      fetchPhotos().catch(console.error);
  }, []);

  const openLightbox = useCallback((index) => {
    setCurrentImage(index);
    setLightboxOpen(true);
  }, []);

  const onPrevious = () => {
    setCurrentImage((prevIndex => prevIndex > 0 ? prevIndex - 1 : photos.length - 1))
  };

  const onNext = () => {
    setCurrentImage((prevIndex => prevIndex < photos.length - 1 ? prevIndex + 1 : 0))
  };

  if (error) {
    return (
      <div className="text-center">
        <h2>Oops! Something went wrong.</h2>
        <p className="text-danger">{error.message}</p>
      </div>
    );
  }

  return (
    <MDBContainer fluid className='home-gallery-container'>
      <MDBRow>
        {photos.map((photo, index) => (
          <MDBCol lg="3" md='6' sm='6' xs='12' className="md-3 pe-1" key={photo.id}>
            <div className="home-grid-item mb-3">
              <img src={photo.url} alt={`Photo ${photo.title}`}
                   className="img-fluid home-gallery-image"
                   onClick={() => openLightbox(index)}
                   onError={(e) => {
                     e.target.onerror = null
                     e.target.src = 'https://via.placeholder.com/300x200'
                   }}
                   onContextMenu={disableRightClick}
                   draggable={false}
              />
            </div>
          </MDBCol>
        ))}
      </MDBRow>
      {isOpen && (
      <Lightbox
        photos={photos}
         isOpen={isOpen}
         currentImage={currentImage}
         onClose={() => setLightboxOpen(false)}
         onPrevious={onPrevious}
         onNext={onNext}
      />
      )}
    </MDBContainer>
  );
};
// Disable right click on images
const disableRightClick = (e) => {
  e.preventDefault();
};