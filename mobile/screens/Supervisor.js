import React, { useEffect } from "react";
import { Text,View } from "react-native";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlaceshipments, getPlaces } from "../store/MainReducer";

const SupervisorScreen = ({ navigation }) => {
    const { places,user,shipments } = useSelector((state) => state.Main)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPlaces(user._id)).then((state) => {
            dispatch(getAllPlaceshipments(places._id))
        })
    }, [])
    console.log(places,shipments)
    return (
        <View>
            <Header navigation={navigation}/>
  <Text>supervisor</Text>
        </View>
      
    )
}

export default SupervisorScreen