import React, { useEffect, useState } from 'react';

const InteractiveScene = ({ className = '' }) => {
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    // A-Frameの初期化
    if (typeof window !== 'undefined') {
      require('aframe');
    }
  }, []);

  return (
    <div className={className}>
      <a-scene embedded vr-mode-ui="enabled: false">
        {/* カメラ */}
        <a-entity
          camera
          look-controls
          wasd-controls
          position="0 1.6 0"
        />

        {/* インタラクティブな立方体 */}
        <a-box
          id="interactiveBox"
          position="0 0.5 -3"
          rotation="0 0 0"
          color="#4CC3D9"
          animation="property: rotation; to: 0 360 0; loop: true; dur: 3000"
          event-set__click="
            _event: click;
            material.color: #FF6B6B;
            animation.dur: 1000;"
        />

        {/* カウンター表示 */}
        <a-text
          value={`Clicks: ${clickCount}`}
          position="0 2 -3"
          align="center"
          color="#333"
          scale="1 1 1"
        />

        {/* 地面 */}
        <a-plane
          position="0 0 -4"
          rotation="-90 0 0"
          width="6"
          height="6"
          color="#7BC8A4"
        />

        {/* 空 */}
        <a-sky color="#87CEEB" />
      </a-scene>
    </div>
  );
};

export default InteractiveScene; 