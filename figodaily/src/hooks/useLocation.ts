import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export default function useLocation() {
  const [address, setAddress] = useState('Fetching location...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setAddress('Permission denied');
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let geo = await Location.reverseGeocodeAsync(location.coords);

      if (geo.length > 0) {
        const place = geo[0];
        const formatted = `${place.name || ''}, ${place.street || ''}, ${place.city || ''}`;
        setAddress(formatted);
      }
    } catch (error) {
      console.log(error);
      setAddress('Unable to fetch location');
    } finally {
      setLoading(false);
    }
  };

  return { address, loading };
}