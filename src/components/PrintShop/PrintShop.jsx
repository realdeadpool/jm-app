import React, { useCallback, useEffect, useState } from 'react'
import { MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBRow, } from 'mdb-react-ui-kit'
import useCart from '../UseCart/UseCart.jsx'
import './PrintShop.css';
import Lightbox from '../Lightbox/Lightbox.jsx'


export default function PrintShop () {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  const [isOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
      const fetchPhotos = async () => {
        setIsLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_APP_API_URL.replace(/;$/, ''); // Removes any trailing semicolon
      const response = await fetch(`${apiUrl}/api/printshop-photos`);
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

  const handleAddToCart = (photo) => {
    addToCart(photo);
    setFeedbackMessage('Item added to cart');
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="text-center">
        <div className="spinner" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

    return (
      <MDBContainer fluid className="print-shop-gallery">
        <div className="print-shop-header">
          <h2 className="print-shop-title">Print Shop</h2>
        </div>
        <MDBRow>
          {photos.map((photo, index) => (
            <MDBCol lg='4' md='6' sm='12' className='mb-4' key={photo.id}>
              <div className="print-shop-card">
                <img
                  src={photo.url}
                  alt={`Photo ${photo.id}`}
                  className="photo-img mb-4"
                  loading='lazy'
                  onContextMenu={disableRightClick}
                  onClick={() => openLightbox(index)}
                />
                <div className="overlay">
                  <div className="overlay-content">
                    <p className="photo-price">${Number(photo.price/100).toFixed(2)}</p>
                  <MDBBtn className="add-to-cart-btn" onClick={() => handleAddToCart(photo)}>
                    <MDBIcon fas icon = "plus" />
                    <MDBIcon fas icon = "shopping-cart" />
                  </MDBBtn>
                </div>
              </div>
            </div>
            </MDBCol>
          ))}
        </MDBRow>
        {showFeedback && (
          <div className="feedback-message">
            <div className="feedback-content">
              <MDBIcon fas icon="check-circle" className="feedback-icon"/>
              <p>{feedbackMessage}</p>
          </div>
        </div>
        )}
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

const disableRightClick = (e) => {
  e.preventDefault();
};
