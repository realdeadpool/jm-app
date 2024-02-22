import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBTypography, MDBBtn } from 'mdb-react-ui-kit';
import './EmptyCart.css';

export default function EmptyCart() {
  return (
    <MDBContainer className="text-center my-5">
      <MDBRow>
        <MDBCol>
          <img src='../../../public/empty-cart.png' alt="Empty Cart" className="img-fluid mb-4" style={{ maxWidth: '200px' }} />
          <MDBTypography tag="h2" className="mb-3">Your Cart is Empty</MDBTypography>
          <MDBTypography tag="p" className="mb-4">Looks like you haven't made your choice yet...</MDBTypography>
          <MDBBtn href="/" className="start-exploring-btn">Start Exploring</MDBBtn> {/* Adjust the href as needed */}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
