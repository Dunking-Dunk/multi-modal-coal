import React, { useEffect, useRef,useMemo, useCallback,useState } from "react";
import { Text,View, StyleSheet ,Image, TouchableOpacity} from "react-native";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getAllDriverShipments, getVehicle } from "../store/MainReducer";
import Map from "../components/MapView";
import { ScrollView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import { Marker,Polyline } from "react-native-maps";
import moment from 'moment'

const DriverScreen = ({ navigation }) => {
    const bottomSheetRef = useRef()
    const snapPoints = useMemo(() => ['25%', '70%'], []);
    const { vehicle, user,shipments} = useSelector((state) => state.Main)
    const dispatch = useDispatch()
    const currentShipment = shipments[0]
    const [routes,setRoutes] = useState(null)

    useEffect(() => {
        if (user) { 
            dispatch(getVehicle(user._id)).then((state) => {
              if (!state.error)
               dispatch(getAllDriverShipments(state.payload.vehicle._id))
            })
        }
    }, [user])

  const handleSheetChanges = useCallback((index) => {
        // console.log('handleSheetChanges', index);
      }, []);

    useEffect(() => {
      if (currentShipment) {
        const routes = currentShipment.direction.polyline.map((poly) => ({latitude: poly[0], longitude: poly[1]}) )
        setRoutes(routes)
      }
    }, [shipments])

    return (
        <View style={styles.container}>
            <Header navigation={navigation}/>
            <Map>
              {
                currentShipment && routes && (
                  <>
                  <Marker.Animated coordinate={{latitude: currentShipment.origin.location.coordinate[1], longitude: currentShipment.origin.location.coordinate[0]}} >
                  </Marker.Animated>
                  <Marker.Animated coordinate={{latitude: currentShipment.destination.location.coordinate[1], longitude: currentShipment.destination.location.coordinate[0]}} >
            
                  </Marker.Animated>
  <Polyline 
  coordinates={routes}
  strokeColor="#ffa500" // fallback for when `strokeColors` is not supported by the map-provider
  strokeWidth={4}
  />
                  </>     
                )
              }
            </Map>
            <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        >
          {vehicle && currentShipment ? (
            <View style={styles.contentContainer}>
              <View style={styles.card}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Current Shipment</Text>
                <TouchableOpacity style={styles.row} onPress={() => {
                  navigation.navigate('Shipment')
                }}>
                  <View style={styles.column}>
                  <Text style={{fontSize: 16}}>{currentShipment.origin.place.name}</Text>
                  <Text style={{fontSize: 16}}>{moment(currentShipment.startDate).format('D/MM/YY,h:mma')}</Text>
                  </View>
                  <Text>To</Text>
                  <View style={styles.column}>
                  <Text style={{fontSize: 16}}>{currentShipment.destination.place.name}</Text>
                  <Text style={{fontSize: 16}}>{moment(currentShipment.eta).format('D/MM/YY,h:mma')}</Text>
                  </View>      
                </TouchableOpacity>
              </View>
              {/* <View style={styles.userContainer}>
                <Image src={user.image.url} style={styles.image} />
                <View style={styles.column}>
                  <Text style={styles.text}>{user.name}</Text>
                  <Text style={styles.text}>{user.email}</Text>
                </View>
              </View> */}
               <View style={styles.row}> 
                <Text style={styles.header}>Vehicle Type</Text>
              <Text style={styles.text}>{vehicle.type}</Text>
              </View>
              <View style={styles.row}> 
                <Text style={styles.header}>Vehicle Make</Text>
              <Text style={styles.text}>{vehicle.make}</Text>
              </View>
                         <View style={styles.row}> 
                <Text style={styles.header}>Vehicle Model</Text>
              <Text style={styles.text}>{vehicle.model}</Text>
              </View>
              <View style={styles.row}> 
                <Text style={styles.header}>Vehicle Register Number</Text>
              <Text style={styles.text}>{vehicle.registerNumber}</Text>
              </View>
        </View>
          ): (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text>No Vehicle Found</Text>
            </View>
          )}
      </BottomSheet>
        </View>
       
    )
}

export default DriverScreen


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
      backgroundColor: '#fff',
      color: 'black',
        padding: 10
      },
  row: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 6,
    backgroundColor: '#F6F6F6',
    marginVertical: 4,
    borderRadius: 8
  },
  header: {
    fontSize: 16,
    opacity: 0.6
  },
  text: {
    fontSize: 18
  },
  userContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    width: 50,
    height: 50, 
    borderRadius: 50
  },
  card: {
    width: '100%',
    marginBottom: 10
  },
  column: {
    display: 'flex',
    flexDirection: 'column'
  }
  });
  