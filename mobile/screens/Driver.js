import React, { useEffect, useRef,useMemo, useCallback } from "react";
import { Text,View, StyleSheet ,Image} from "react-native";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getVehicle } from "../store/MainReducer";
import Map from "../components/MapView";
import { ScrollView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';

const DriverScreen = ({ navigation }) => {
    const bottomSheetRef = useRef()
    const snapPoints = useMemo(() => ['25%', '70%'], []);
    const { vehicle, user} = useSelector((state) => state.Main)
    const dispatch = useDispatch()

    useEffect(() => {
        if (user) {
            dispatch(getVehicle(user._id))
        }
    }, [user])

  const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
      }, []);

    return (
        <View style={styles.container}>
            <Header navigation={navigation}/>
            <Map />
            <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        >
          {vehicle && (
            <View style={styles.contentContainer}>
              <View style={styles.userContainer}>
                <Image src={user.image.url} style={styles.image} />
                <View style={styles.column}>
                  <Text style={styles.text}>{user.name}</Text>
                  <Text style={styles.text}>{user.email}</Text>
                </View>
              </View>
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
  }
  });
  