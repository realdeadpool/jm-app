import React, { useCallback, useEffect, useState } from 'react'
import {
  MDBRow,
  MDBCol, MDBContainer
} from "mdb-react-ui-kit";
import 'yet-another-react-lightbox/styles.css';
import './Street.css';
import Lightbox from '../Lightbox/Lightbox.jsx'

export default function Street() {
    const [photos, setPhotos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isOpen, setLightboxOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);

   const disableRightClick = (e) => {
     e.preventDefault();
   };

  useEffect(() => {
      const fetchPhotos = async () => {
        setIsLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_APP_API_URL.replace(/;$/, ''); // Removes any trailing semicolon
      const response = await fetch(`${apiUrl}/api/street-photos`);
      if (!response.ok)
        throw new Error('Network response was not ok');
      const data = await response.json();
      setPhotos(data);
    } catch (error) {
      console.error('Fetch operation error:', error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

      fetchPhotos().catch(console.error);
    }, []);


    const openLightbox = useCallback((index) => {
        setCurrentImage(index);
        setLightboxOpen(true);
    }, []);

    const onPrevious = useCallback(() => {
    setCurrentImage(prevIndex => (prevIndex > 0 ? prevIndex - 1 : photos.length - 1));
  }, [photos.length]);

  const onNext = useCallback(() => {
    setCurrentImage(prevIndex => (prevIndex < photos.length - 1 ? prevIndex + 1 : 0));
  }, [photos.length]);

    if (isLoading) {
      return (
        <div className="text-center">
          <div className="spinner" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }
    if (error) return <div>Error: {error}</div>;


  return (
    <MDBContainer fluid className='street-gallery-container mb-5'>
      <MDBRow>
        {photos.map((photo, index) => (
          <MDBCol lg="4" md="6" className="mb-3 pe-1" key={photo.id}>
            <div className='street-grid-item'>
              <img src={photo.url} alt={`Gallery ${photo.id}`}
                   className="img-fluid street-gallery-image"

                   onClick={() => openLightbox(index)}
                   onError={(e) => {
                     e.target.onerror = null
                     e.target.src = 'https://via.placeholder.com/300x200'
                   }}
                   onContextMenu={disableRightClick}
                   draggable={false}
                   loading="lazy" />
            </div>
          </MDBCol>
        ))}
      </MDBRow>
                <Lightbox
            photos={photos}
            isOpen={isOpen}
            currentImage={currentImage}
            onClose={() => setLightboxOpen(false)}
            onPrevious={onPrevious}
            onNext={onNext}
          />
        </MDBContainer>
      );
    }




