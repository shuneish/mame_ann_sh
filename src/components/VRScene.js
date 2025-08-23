import React, { useEffect } from 'react';

const VRScene = ({ className = '' }) => {
  useEffect(() => {
    // A-Frameの初期化
    if (typeof window !== 'undefined') {
      require('aframe');
    }
  }, []);

  return (
    <div className={className}>
      <a-scene embedded vr-mode-ui="enabled: true">
        {/* カメラ */}
        <a-entity
          camera
          look-controls
          wasd-controls
          position="0 1.6 0"
        />

        {/* VR用の立方体 */}
        <a-box
          position="0 0.5 -3"
          rotation="0 45 0"
          color="#4CC3D9"
          animation="property: rotation; to: 0 360 0; loop: true; dur: 5000"
        />

        {/* VR用の球体 */}
        <a-sphere
          position="2 1.25 -5"
          radius="1.25"
          color="#EF2D5E"
        />

        {/* VR用の円柱 */}
        <a-cylinder
          position="-2 1 -5"
          radius="0.5"
          height="2"
          color="#FFC65D"
        />

        {/* 地面 */}
        <a-plane
          position="0 0 -4"
          rotation="-90 0 0"
          width="8"
          height="8"
          color="#7BC8A4"
        />

        {/* 空 */}
        <a-sky color="#87CEEB" />

        {/* ライティング */}
        <a-light type="ambient" color="#404040" />
        <a-light type="directional" position="0 1 0" color="#ffffff" intensity="0.5" />
      </a-scene>
    </div>
  );
};

export default VRScene; 