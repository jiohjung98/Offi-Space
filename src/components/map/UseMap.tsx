import React, { useEffect, useRef } from 'react';

const UseMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initMap = () => {
      if (mapRef.current) {
        const mapOptions: naver.maps.MapOptions = {
          center: new naver.maps.LatLng(37.5665, 126.9780),
          zoom: 10,
        };
        new naver.maps.Map(mapRef.current, mapOptions);
      }
    };

    if (typeof window !== 'undefined' && window.naver) {
      initMap();
    } else {
      window.addEventListener('load', initMap);
      return () => window.removeEventListener('load', initMap);
    }
  }, []);

  return <div ref={mapRef} className="w-[90%] h-[100%] mx-auto my-auto" />;
};

export default UseMap;
