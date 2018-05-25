import React from 'react';

const Dot = (props) => {
  const { className, color = 'green' } = props;
  return (
    <svg className={className} viewBox="0 0 20 20" preserveAspectRatio="none">
      <circle cx="10" cy="10" r="10" fill={color} />
    </svg>
  );
};

export default Dot;
