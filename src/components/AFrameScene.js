import React, { useEffect, useRef } from 'react';

const AFrameScene = ({ className = '' }) => {
  const sceneRef = useRef(null);

  useEffect(() => {
    // A-Frameの初期化
    if (typeof window !== 'undefined') {
      require('aframe');
    }
  }, []);

  return (
    <div ref={sceneRef} className={className}>
      <a-scene embedded vr-mode-ui="enabled: false">
        {/* カメラ */}
        <a-entity
          camera
          look-controls
          wasd-controls
          position="0 1.6 0"
        />

        {/* 回転する立方体 */}
        <a-box
          id="myBox"
          position="-1 0.5 -3"
          rotation="0 45 0"
          color="#4CC3D9"
          animation="property: rotation; to: 0 360 0; loop: true; dur: 5000"
        />

        {/* クリック可能な球体 */}
        <a-sphere
          position="0 1.25 -5"
          radius="1.25"
          color="#EF2D5E"
          event-set__click="
            _event: click;
            material.color: #FFC65D;
            _target: #myBox;
            animation.to: 0 90 0;"
        />

        {/* 地面 */}
        <a-plane
          position="0 0 -4"
          rotation="-90 0 0"
          width="4"
          height="4"
          color="#7BC8A4"
        />

        {/* 空 */}
        <a-sky color="#ECECEC" />
      </a-scene>
    </div>
  );
};

export default AFrameScene; 