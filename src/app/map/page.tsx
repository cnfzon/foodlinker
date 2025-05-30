'use client';

import { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import styles from './map.module.css';

// 地圖容器樣式
const containerStyle = {
  width: '100%',
  height: '600px',
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
};

// 預設中心點（北科東宿舍）
const defaultCenter = {
  lat: 25.04354,
  lng: 121.53780
};

// 地點類型定義
interface Location {
  id: string;
  name: string;
  address: string;
  position: {
    lat: number;
    lng: number;
  };
}

// 預設地點數據
const defaultLocations: Location[] = [
  {
    id: '1',
    name: '北科東宿舍',
    address: '台北市大安區忠孝東路三段1號',
    position: {
      lat: 25.04354,
      lng: 121.53780
    }
  },
  {
    id: '2',
    name: '台北科技大學',
    address: '台北市大安區忠孝東路三段1號',
    position: {
      lat: 25.04200,
      lng: 121.53500
    }
  },
  {
    id: '3',
    name: '台北市立圖書館總館',
    address: '台北市大安區建國南路二段125號',
    position: {
      lat: 25.02600,
      lng: 121.53700
    }
  },
  {
    id: '4',
    name: '台北市立大安高工',
    address: '台北市大安區復興南路二段52號',
    position: {
      lat: 25.03300,
      lng: 121.54300
    }
  },
  {
    id: '5',
    name: '台北市立大安國中',
    address: '台北市大安區大安路二段63號',
    position: {
      lat: 25.03500,
      lng: 121.54500
    }
  }
  /*{
    id: '6',
    name: '台北101大樓',
    address: '台北市信義區信義路五段7號',
    position: {
      lat: 25.0330,
      lng: 121.5654
    }
  }*/
];

export default function MapPage() {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [locations, setLocations] = useState<Location[]>(defaultLocations);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [searchResults, setSearchResults] = useState<Location[]>([]);

  // 載入 Google Maps API
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places']
  });

  // 地圖載入完成後的回調
  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  // 地圖卸載時的回調
  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // 搜索地點
  const handleSearch = async () => {
    if (!map || !searchQuery) return;

    const geocoder = new google.maps.Geocoder();
    try {
      const response = await geocoder.geocode({ address: searchQuery });
      if (response.results[0]) {
        const { location } = response.results[0].geometry;
        map.panTo(location);
        map.setZoom(15);

        // 添加搜索結果到列表
        const newLocation: Location = {
          id: Date.now().toString(),
          name: searchQuery,
          address: response.results[0].formatted_address,
          position: {
            lat: location.lat(),
            lng: location.lng()
          }
        };
        setLocations(prev => [...prev, newLocation]);
        setSearchResults([newLocation]);
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }
  };

  // 選擇地點
  const handleSelectLocation = (location: Location) => {
    setSelectedLocation(location);
    if (map) {
      map.panTo(location.position);
      map.setZoom(15);
    }
  };

  if (!isLoaded) {
    return <div className={styles.loading}>載入地圖中...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="輸入地點名稱..."
          className={styles.searchInput}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch} className={styles.searchButton}>
          搜尋
        </button>
      </div>

      <div className={styles.mapContainer}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={defaultCenter}
          zoom={15}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            styles: [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
              },
              {
                featureType: 'administrative',
                elementType: 'geometry',
                stylers: [{ visibility: 'off' }]
              },
              {
                featureType: 'road',
                elementType: 'labels.icon',
                stylers: [{ visibility: 'off' }]
              }
            ],
            mapTypeControl: false,
            fullscreenControl: false,
            streetViewControl: false
          }}
        >
          {locations.map((location) => (
            <Marker
              key={location.id}
              position={location.position}
              onClick={() => handleSelectLocation(location)}
              animation={selectedLocation?.id === location.id ? google.maps.Animation.BOUNCE : undefined}
              icon={{
                url: '/marker.png',
                scaledSize: new google.maps.Size(32, 32)
              }}
            />
          ))}

          {selectedLocation && (
            <InfoWindow
              position={selectedLocation.position}
              onCloseClick={() => setSelectedLocation(null)}
            >
              <div className={styles.infoWindow}>
                <h3>{selectedLocation.name}</h3>
                <p>{selectedLocation.address}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>

      <div className={styles.locationList}>
        <h2>地點列表</h2>
        {locations.map((location) => (
          <div
            key={location.id}
            className={`${styles.locationItem} ${selectedLocation?.id === location.id ? styles.selected : ''}`}
            onClick={() => handleSelectLocation(location)}
          >
            <h3>{location.name}</h3>
            <p>{location.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 