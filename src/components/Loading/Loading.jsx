import React from 'react';
import './Loading.css'; // Assuming you'll create a corresponding CSS file for styling

const Loading = () => {
  return (
    <div className="text-center">
        <div className="spinner" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
    </div>
  );
}

export default Loading;
