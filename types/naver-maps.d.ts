/* eslint-disable no-unused-vars */
declare namespace naver.maps {
    class Map {
      constructor(element: HTMLElement | string, options: MapOptions);
    }
  
    class LatLng {
      constructor(lat: number, lng: number);
    }
  
    interface MapOptions {
      center: LatLng;
      zoom: number;
    }
  }
  