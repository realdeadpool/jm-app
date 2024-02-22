import React from 'react';
import { MDBContainer } from "mdb-react-ui-kit";

export default function InstagramFeed() {
  return (
    <MDBContainer className="instagram-feed">
      <div className="instagram-profile">
        <a href="https://www.instagram.com/themarshpit" target="_blank" rel="noopener noreferrer">
          <img src="path/to/your/profile/picture.jpg" alt="Instagram Profile" className="profile-picture" />
          <div className="profile-info">
            <h3>@themarshpit</h3>
            <p>Follow me for more updates</p>
          </div>
        </a>
      </div>
    </MDBContainer>
  );
}



