import React, { useEffect } from "react";
import { View,Text,StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAllDriverShipments } from "../store/MainReducer";
import Header from "../components/Header";

const Shipments = ({navigation}) => {
    const { shipments, vehicle } = useSelector((state) => state.Main)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllDriverShipments(vehicle._id))
    }, [])
    return (
        <View style={styles.container}>
            <Header navigation={navigation}/>
            <Text style={styles.title}>Assigned Shipments</Text>
            <View>
                {shipments.map(shipment => <Text>{shipment.quantity}</Text>)}
            </View>
        </View>
    )
}

export default Shipments

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: 'black'
    },
    title: {
        marginTop: 25,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'medium'
    }
  });
  