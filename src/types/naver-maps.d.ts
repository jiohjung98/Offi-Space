/* eslint-disable no-unused-vars */
declare namespace naver.maps {
    class Map {
      panTo: any;
      constructor(element: HTMLElement | string, options: MapOptions);
      setCenter(latlng: LatLng): void;
      setZoom(zoom: number): void;
    }
  
    class LatLng {
      constructor(lat: number, lng: number);
    }
  
    class Marker {
      constructor(options: MarkerOptions);
      setMap(map: Map | null): void;
      setPosition(latlng: LatLng): void;
    }
  
    interface MapOptions {
      center: LatLng;
      zoom: number;
    }
  
    interface MarkerOptions {
      position: LatLng;
      map: Map;
    }
  }
  