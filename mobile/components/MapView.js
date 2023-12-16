import { useEffect, useRef, useState } from "react";
import {
    Dimensions,
    StyleSheet,
    View,
    Text,
    Platform, TouchableOpacity
  } from "react-native";
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import mapStyle, {darkMap} from '../utils/mapStyle'
import { useSelector } from "react-redux";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Map = ({places}) => {
    const mapRef = useRef();
    const markerRef = useRef()
    const userPosition = useSelector((state) => state.auth.location) 

    useEffect(() => {
      if (userPosition) {
        const { latitude, longitude } = userPosition;
        animate(latitude, longitude);
      }
    }, [userPosition]);

    const animate = (latitude, longitude) => {
      const newCoordinate = { latitude, longitude };
      if (Platform.OS == "android") {
        if (markerRef.current) {
          markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
        }
      } else {
        state.coordinate?.timing(newCoordinate).start();
      }
    };

   const onCenter = () => {
    mapRef.current.animateToRegion({
      latitude: userPosition.latitude,
      longitude: userPosition.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  };
  

    return (
        <View style={{flex: 1}}>
            <MapView  style={{ ...mapStyle, ...styles.map }}
          initialRegion={{
            latitude: 13.0167605,
            longitude: 80.0017434,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
          customMapStyle={darkMap}
          >
            {userPosition && (
                <Marker.Animated 
            ref={markerRef}
            coordinate={{latitude: userPosition.latitude, longitude: userPosition.longitude}}
            tracksViewChanges={false}
          >
            <FontAwesome name="circle-o" size={18} color='#fff' />
          </Marker.Animated>
            )}

            {places && places.map((place, idx) => {
              return (
                <Marker coordinate={place.coordinate} key={idx}>
                  <Callout>
                    <Text>{place.placeName}</Text>
                    <Text>{place.vicinity}</Text>
                  </Callout>
                </Marker>
              )
            })}
   
            </MapView>
            {userPosition && (
                <TouchableOpacity
                style={{
                  position: "absolute",
                  bottom: 250,
                  right: 20,
                  zIndex: 2,
                }}
                onPress={onCenter}
              >
                <MaterialIcons name="gps-fixed" size={34} color='#fff' />
              </TouchableOpacity>
            )}
          
        </View>
    )
}

export default Map

const styles = StyleSheet.create({
    map: {
      ...StyleSheet.absoluteFillObject,
    //   marginBottom: Dimensions.get("screen").height / 5.5,
    },
  });
  