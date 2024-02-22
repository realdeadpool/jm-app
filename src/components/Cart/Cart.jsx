import React, { useEffect, useState } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBTypography,
  MDBBtn,
  MDBCardImage
} from 'mdb-react-ui-kit';
import { Elements } from '@stripe/react-stripe-js';
import './Cart.css';
import CheckoutForm from '../StripePayment/StripePayment.jsx'; // Ensure the path is correct
import useCart from '../UseCart/UseCart.jsx';
import EmptyCart from '../EmptyCart/EmptyCart.jsx';
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(`${import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY}`);
export default function Cart() {
  const [clientSecret, setClientSecret] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const { cartItems, removeFromCart } = useCart();

  useEffect(() => {
    const fetchClientSecretAndTotal = async () => {
      if (cartItems.length > 0) {
        console.log('API URL:', import.meta.env.VITE_APP_API_URL);
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/create-payment-intent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            items: cartItems.map(item => ({
              ...item,
              price: Math.round(item.price)
            }))
          })
        });
        const data = await response.json();
        setClientSecret(data.clientSecret);
        setTotalAmount(data.totalAmount);
      }
    }

    fetchClientSecretAndTotal().catch(error => console.error('Error fetching client secret:', error));
  }, [cartItems]);

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }


  return (
    <MDBContainer fluid className="py-5 cart-container">
      <MDBRow className="justify-content-center">
        <MDBCol lg="10">
          {/* Cart Items List */}
          <MDBCard className="mb-4">
            <MDBCardBody>
              <MDBTypography tag="h2" className="text-center mb-4">Your Digital Prints</MDBTypography>
              {cartItems.map((photo) => (
                  <MDBRow key={photo.id} className="mb-4 d-flex align-items-center cart-item">
                    <MDBCol md="5">
                      <MDBCardImage src={photo.url} alt={photo.title} className="img-fluid rounded cart-image" />
                    </MDBCol>
                    <MDBCol md="7">
                      <MDBTypography tag="h5">{photo.name}</MDBTypography>
                      <MDBTypography tag="h6" className="text-muted">Price: ${parseFloat(photo.price/100).toFixed(2)}</MDBTypography>
                      <MDBBtn className="remove-btn" size="sm" onClick={() => handleRemoveFromCart(photo.id)}>Remove</MDBBtn>
                    </MDBCol>
                  </MDBRow>
                ))}
            </MDBCardBody>
          </MDBCard>
          {/* Order Summary */}
          <MDBCard className="mb-4">
            <MDBCardBody>
              <MDBTypography tag="h3" className="text-center mb-4">Order Summary</MDBTypography>
              <div className="d-flex justify-content-between p-2 mb-2" style={{ backgroundColor: '#e1f5fe' }}>
                <MDBTypography tag="h5" className="fw-bold mb-0">Total:</MDBTypography>
                <MDBTypography tag="h5" className="fw-bold mb-0">${parseFloat(totalAmount/100).toFixed(2)}</MDBTypography>
              </div>
            </MDBCardBody>
          </MDBCard>
          {/* Payment Info */}
          <MDBCard>
            <MDBCardBody>
              {clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm />
                </Elements>
              )}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}