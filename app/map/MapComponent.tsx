'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import L, { LatLngTuple } from 'leaflet';
import { useMap } from 'react-leaflet';
import styles from './map.module.css';

// 動態導入 React Leaflet 組件
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

// 自定義圖標樣式
const customIcon = L.icon({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// 強制刷新地圖尺寸 (解決拼圖錯位)
function ResizeFixer() {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    map.invalidateSize();

    const timeout1 = setTimeout(() => map.invalidateSize(), 300);
    const timeout2 = setTimeout(() => map.invalidateSize(), 600); // 保險再觸發一次
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [map]);

  return null;
}


// 地圖控制組件
function MapController({ center }: { center: LatLngTuple }) {
  const map = useMap();
  useEffect(() => {
    if (map && center) {
      map.flyTo(center, 16, {
        duration: 1.5
      });
    }
  }, [center, map]);
  return null;
}

export interface Location {
  name: string;
  address: string;
  lat: number;
  lng: number;
}

interface MapComponentProps {
  locations: Location[];
  selectedLocation: Location | null;
}

export default function MapComponent({ locations, selectedLocation }: MapComponentProps) {
  const defaultCenter: LatLngTuple = [25.04357, 121.53716];
  const center = selectedLocation
    ? [selectedLocation.lat, selectedLocation.lng] as LatLngTuple
    : defaultCenter;

  return (
    <div className={styles.mapOuter}>
  <div className={styles.mapWrapper}>
    <MapContainer
      center={defaultCenter}
      zoom={15}
      scrollWheelZoom={true}
      className={styles.mapContainer}
    >
      <ResizeFixer />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((location, index) => (
        <Marker
          key={index}
          position={[location.lat, location.lng]}
          icon={customIcon}
        >
          <Popup>
            <div className={styles.popup}>
              <h3>{location.name}</h3>
              <p>{location.address}</p>
            </div>
          </Popup>
        </Marker>
      ))}
      <MapController center={center} />
    </MapContainer>
  </div>
</div>
  );
}
