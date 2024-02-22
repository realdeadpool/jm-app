import React, { useCallback, useEffect, useState } from 'react'
import {
  MDBRow,
  MDBCol, MDBContainer
} from "mdb-react-ui-kit";
import 'yet-another-react-lightbox/styles.css';
import './Wildlife.css';
import Lightbox from '../Lightbox/Lightbox.jsx'

  const disableRightClick = (e) => {
  e.preventDefault();
};

export default function Wildlife() {
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
      const response = await fetch(`${apiUrl}/api/wildlife-photos`);
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

    const onPrevious = () => {
        setCurrentImage((prevIndex => prevIndex > 0 ? prevIndex - 1 : photos.length - 1))
    };


    const onNext = () => {
        setCurrentImage((prevIndex => prevIndex < photos.length - 1 ? prevIndex + 1 : 0))
    };

    if (error) return <div>Error: {error}</div>;

    if (isLoading) {
      return (
        <div className="text-center">
          <div className="spinner" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }


  return (
    <MDBContainer fluid className='wildlife-gallery-container mb-5'>
      <MDBRow>
        {photos.map((photo, index) => (
          <MDBCol sm="6" className="offset-md-3 pt-4" key={photo.id}>
            <div className='wildlife-grid-item'>
              <img src={photo.url} alt={`Gallery ${photo.id}`}
                   className="img-fluid wildlife-gallery-image"
                   loading={isLoading ? 'lazy' : 'eager'}
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
    };

