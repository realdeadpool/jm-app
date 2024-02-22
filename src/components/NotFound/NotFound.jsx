import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'; // Assuming you'll create a corresponding CSS file for styling

export default function NotFound ()  {
  return (
    <div className="NotFound">
      <h1>Oops! Page Not Found 🕵️‍♂️</h1>
      <p>The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
      <Link to="/" className="NotFound-Link">Take Me Home 🏠</Link>
    </div>
  );
}
