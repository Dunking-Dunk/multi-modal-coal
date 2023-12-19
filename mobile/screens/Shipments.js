import React, { useEffect, useState } from "react";
import { View,Text,StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAllDriverShipments } from "../store/MainReducer";
import { getDistanceAndTime } from "../utils/getDistanceAndTime";
import Header from "../components/Header";
import moment from 'moment'

const Shipments = ({navigation}) => {
    const { shipments } = useSelector((state) => state.Main)
    const [refreshing, setRefreshing] = useState(false)
    const dispatch = useDispatch()
   
    const renderShipment = ({item}) => {
        const {totalTimeTaken,totalDistance} = getDistanceAndTime(item.direction.distanceAndDuration)
            return (
                <View style={styles.card} key={item}>
                        <View style={styles.subCard}>
                        <View style={styles.row}>
                                <Text style={styles.cardTitle}>Shipment</Text>
                                <Text style={styles.cardPara}>{item.shipment}</Text>
                        </View>
                        <View style={styles.row}>
                                <Text style={styles.cardTitle}>Status:</Text>
                                <Text style={styles.cardPara}>{item.status}</Text>
                        </View>
                        <View style={styles.row}>
                                <Text style={styles.cardTitle}>Capacity:</Text>
                                <Text style={styles.cardPara}>40</Text>
                        </View>
                        </View>
                       
                        <View style={styles.subCard}>
                            <Text style={styles.cardTitle}>{item.origin.place.name}</Text>
                            <Text style={styles.cardPara}>{item.origin.place.address}</Text>
                            <Text style={styles.cardPara}>{moment(item.startDate).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                        </View>
                        <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', justifyContent: 'center'}}>
                            <Text style={styles.cardTitle}>To</Text>
                            <Text style={styles.cardPara}>{totalDistance}</Text>
                            <Text style={styles.cardPara}>{totalTimeTaken}</Text>
                        </View>
                        <View style={styles.subCard}>
                            <Text style={styles.cardTitle}>{item.destination.place.name}</Text>
                            <Text style={styles.cardPara}>{item.destination.place.address}</Text>
                            <Text style={styles.cardPara}>{moment(item.eta).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                        </View>
                </View>
            )
    }

    return (
        <View style={styles.container}>
            <Header navigation={navigation}/>
            <Text style={styles.title}>Assigned Shipments</Text>
            <View >
            {shipments.length > 0 ? (
            <FlatList
              data={shipments}
              style={styles.shipmentContainer}
              renderItem={renderShipment}
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true)
                dispatch(getAllDriverShipments()).then(() => {
                  setRefreshing(false)
                });
              }}
            />
          ) : (
            <Text style={styles.infoText}>No Shipments found</Text>
          )}
            </View>
        </View>
    )
}

export default Shipments

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'medium'
    },
    shipmentContainer: {
width: '100%',
height: '100%',
paddingVertical: 15,
paddingHorizontal:10, 
    },
    card: {
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
        gap: 12,
        borderRadius: 10,
        backgroundColor: '#c0c2c9',
        marginTop: 2
    },
    subCard: {
        width: '100%'
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    cardPara: {
        fontSize: 14
    },
    row: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    }
  });
  