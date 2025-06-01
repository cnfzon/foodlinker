'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './map.module.css';
import type { Location } from './MapComponent';

// 動態導入地圖組件
const MapComponent = dynamic(
  () => import('./MapComponent'),
  { 
    ssr: false,
    loading: () => (
      <div className={styles.loading}>
        <p>地圖載入中...</p>
      </div>
    )
  }
);

// 預設地點數據
const LOCATIONS: Location[] = [
  {
    name: '北科東宿舍',
    address: '台北市大安區忠孝東路三段1號',
    lat: 25.04357,
    lng: 121.53716
  },
  {
    name: '台北科技大學',
    address: '台北市大安區忠孝東路三段1號',
    lat: 25.04327,
    lng: 121.53715
  },
  {
    name: '台北市立圖書館總館',
    address: '台北市大安區建國南路二段125號',
    lat: 25.0383,
    lng: 121.5437
  },
  {
    name: '台北市立大安高工',
    address: '台北市大安區復興南路二段52號',
    lat: 25.0335,
    lng: 121.5435
  },
  {
    name: '台北市立大安國中',
    address: '台北市大安區大安路二段63號',
    lat: 25.0330,
    lng: 121.5440
  }
];

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>FoodLinker 地圖</h1>
        <p>探索台北市的美食地點</p>
      </div>

      <div className={styles.content}>
        <div className={styles.mapWrapper}>
          <MapComponent 
            locations={LOCATIONS}
            selectedLocation={selectedLocation}
          />
        </div>

        <div className={styles.locationList}>
          <h2>地點列表</h2>
          <ul>
            {LOCATIONS.map((location, index) => (
              <li 
                key={index}
                className={`${styles.locationItem} ${
                  selectedLocation?.name === location.name ? styles.selected : ''
                }`}
                onClick={() => setSelectedLocation(location)}
              >
                <h3>{location.name}</h3>
                <p>{location.address}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 