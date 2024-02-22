import React, { useCallback, useEffect, useState } from 'react'
import {
  MDBRow,
  MDBCol, MDBContainer
} from "mdb-react-ui-kit";
import 'yet-another-react-lightbox/styles.css';
import './Landscapes.css'
import Lightbox from '../Lightbox/Lightbox.jsx'

  const disableRightClick = (e) => {
  e.preventDefault();
};
export default function Landscapes() {
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
          const response = await fetch(`${apiUrl}/api/landscape-photos`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setPhotos(data);
        } catch (error) {
          console.error('There has been a problem with your fetch operation:', error);
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchPhotos().catch();
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
        <MDBContainer fluid className='landscapes-gallery-container'>
          <MDBRow>
            {photos.map((photo, index) => (
              <MDBCol lg="4" md="6" className="mb-3 pe-1" key={photo.id}>
                <div className='landscapes-grid-item'>
                  <img src={photo.url} alt={`Gallery ${photo.id}`}
                      className="img-fluid landscapes-gallery-image"
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



