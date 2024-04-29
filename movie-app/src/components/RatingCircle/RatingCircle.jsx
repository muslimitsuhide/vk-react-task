import React, { useState, useEffect } from 'react';
import './RatingCircle.css';

const RatingCircle = ({ rating }) => {
  const [circleDashArray, setCircleDashArray] = useState(`0, 100`);

  useEffect(() => {
    const circumference = 2 * Math.PI * 15.9155;
    const strokeDasharray = `${(rating / 10) * circumference}, 100`;
    setCircleDashArray(strokeDasharray);
  }, [rating]);

  let color = '';
  if (rating < 4) {
    color = '#e74c3c';
  } else if (rating >= 4 && rating < 7) {
    color = '#f39c12';
  } else {
    color = '#2ecc71';
  }

  const text = rating.toFixed(1);

  const ratingColor = `var(--rating-color, ${color})`;

  return (
    <div className="rating-circle">
      <svg viewBox="0 0 36 36" className="circular-chart">
        <path
          className="circle-bg"
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className="circle"
          strokeDasharray={circleDashArray}
          style={{ stroke: color, transition: 'stroke-dasharray 0.5s ease-in-out' }}
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <text x="18" y="22.35" className="circle-text" style={{ fill: ratingColor }}>{text}</text>
      </svg>
    </div>
  );
};

export default RatingCircle;
