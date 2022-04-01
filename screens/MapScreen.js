import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Polyline, Polygon } from 'react-native-maps';
import { useState } from 'react'
export default function MapScreen() {
  const [mapRegion, setmapRegion] = useState({
    latitude: 23.0438564,
    longitude: 72.5086395,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [currentmapRegion, setcurrentmapRegion] = useState({
    currentLatitude: null,
    currentLongitude: null,
  });
  const PlanCoordinates = [
    { latitude: 23.0438564, longitude: 72.5086395 },
    { latitude: 21.291, longitude: -157.821 },
    { latitude: -18.142, longitude: 172.431 },
    { latitude: -27.467, longitude: 153.027 },
  ];
  return (
    <View style={styles.container} >
      <MapView
        style={{ alignSelf: 'stretch', height: '100%' }}
        region={mapRegion}>
        <Marker coordinate={mapRegion} title='Marker' pinColor="blue" />
        <MapView.Circle
          key={(currentmapRegion.currentLatitude + currentmapRegion.currentLongitude).toString()}
          center={mapRegion}
          radius={200}
          strokeWidth={1}
          strokeColor={'#1a66ff'}
          fillColor={'#900'}
        />
        

      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
