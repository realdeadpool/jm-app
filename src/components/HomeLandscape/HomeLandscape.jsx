import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
// import required modules
import { EffectFade, Navigation } from 'swiper/modules';
import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit'
import './HomeLandscape.css';

export default function HomeLandscape() {
  const [landImages, setLandImages] = useState([]);
  const [streetImages, setStreetImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
        const fetchImages = async (endpoint, setter) => {
            try {
              const apiUrl = import.meta.env.VITE_APP_API_URL.replace(/;$/, ''); // Removes any trailing semicolon
              const Response = await fetch(`${apiUrl}/api/${endpoint}`);
                if (!Response.ok) {
                  throw new Error('Error fetching photos');
                }
                const data = await Response.json();
                setter(data);
            } catch (err) {
              setError(err.message);
            }
        };
        setIsLoading(true);
        Promise.all([fetchImages('landscape-photos', setLandImages), fetchImages('street-photos', setStreetImages)
        ]).finally(() => setIsLoading(false));
    }, []);


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
    <MDBContainer fluid className={'pb-5'}>
      <MDBRow className="card-row">
        <MDBCol lg={'6'} md={'12'} className={'card-style'}>
          <h2 className="gallery-header">STREET</h2>
          <Swiper
            loop={true}
            effect={'fade'}
            navigation={true}
            simulateTouch={true}
            modules={[EffectFade, Navigation]}
            className="landscape-swiper">
            {streetImages.map((photo) => (
              <SwiperSlide key={photo.id}>
                <img
                  src={photo.url}
                  alt={`Photo ${photo.title}`}
                  className="swiper-image"
                  loading="lazy"
                  onContextMenu={disableRightClick}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </MDBCol>
        <MDBCol lg={'6'} md={'12'} className={'card-style'}>
          <h2 className="gallery-header">LANDSCAPES</h2>
          <Swiper
            loop={true}
            effect={'fade'}
            navigation={true}
            simulateTouch={true}
            modules={[EffectFade, Navigation]}
            className="landscape-swiper">
            {landImages.map((photo) => (
              <SwiperSlide key={photo.id}>
                <img
                  src={photo.url}
                  alt={`Photo ${photo.title}`}
                  className="swiper-image"
                  loading="lazy"
                   onContextMenu={disableRightClick}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

const disableRightClick = (e) => {
  e.preventDefault();
};