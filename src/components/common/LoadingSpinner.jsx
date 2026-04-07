import React from 'react';
import '../../styles/globals.css';

const LoadingSpinner = ({ count = 6, type = 'grid' }) => {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  if (type === 'horizontal') {
    return (
      <div>
        {skeletons.map((i) => (
          <div
            key={i}
            className="skeleton-card"
            style={{
              display: 'flex',
              marginBottom: '15px',
              overflow: 'hidden',
            }}
          >
            <div
              className="skeleton skeleton-image"
              style={{
                width: '200px',
                minWidth: '200px',
                paddingTop: '0',
                height: '130px',
              }}
            />
            <div style={{ flex: 1, padding: '10px' }}>
              <div className="skeleton skeleton-text" />
              <div className="skeleton skeleton-text" />
              <div className="skeleton skeleton-text short" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="row g-3">
      {skeletons.map((i) => (
        <div key={i} className="col-md-4">
          <div className="skeleton-card">
            <div className="skeleton skeleton-image" />
            <div className="skeleton skeleton-text" />
            <div className="skeleton skeleton-text" />
            <div className="skeleton skeleton-text short" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSpinner;
