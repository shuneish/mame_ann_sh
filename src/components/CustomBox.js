import React, { useEffect } from 'react';

const CustomBox = ({ position, color, size = "1 1 1" }) => {
  useEffect(() => {
    // A-Frameの初期化
    if (typeof window !== 'undefined') {
      require('aframe');
    }
  }, []);

  return (
    <a-box
      position={position}
      color={color}
      scale={size}
      animation="property: rotation; to: 0 360 0; loop: true; dur: 3000"
    />
  );
};

export default CustomBox; 