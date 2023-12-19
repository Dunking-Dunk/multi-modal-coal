import {  useEffect, useRef, useState } from "react";
import {
    Dimensions,
    StyleSheet,
    View,
    Text,
    Image,
    Platform, TouchableOpacity
  } from "react-native";
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import mapStyle, {darkMap} from '../utils/mapStyle'
import { useSelector } from "react-redux";
import TruckImg from '../assets/Truck.png'

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Map = ({children}) => {
    const mapRef = useRef();
    const markerRef = useRef()
    const {userPosition, vehicle, shipments} = useSelector((state) => state.Main) 

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
      latitude: vehicle.location.coordinate[1],
      longitude: vehicle.location.coordinate[0],
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

{vehicle && (
                <Marker.Animated 
            ref={markerRef}
            coordinate={{latitude: vehicle.location.coordinate[1], longitude: vehicle.location.coordinate[0]}}
            tracksViewChanges={false}
          >
            {/* <Image src={TruckImg}/> */}
            <FontAwesome name="truck" size={22} color='#fff' />
          </Marker.Animated>
            )}  
            {children}
            </MapView>
            {vehicle && (
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
  