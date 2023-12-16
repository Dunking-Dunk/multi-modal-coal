import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRef, useMemo, useCallback, useEffect } from 'react';
import Map from '../components/MapView';
import BottomSheet from '@gorhom/bottom-sheet';
import Header from '../components/Header.js';
import { useSelector } from 'react-redux';
import axios from 'axios'
import { ScrollView } from 'react-native-gesture-handler';

const HomeScreen = ({ navigation, route }) => {
  const userLocation = useSelector((state) => state.auth.location)
  const [places, setPlaces] = useState([])

    return (
        <View style={styles.container}>
            <Header navigation={navigation}/>
            <Map places={places}/>
 
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
      },
      cardContainer: {
        marginVertical: 10,
        width: '90%',
      }
  });
  