import React from "react";
import { Text,View } from "react-native";
import Header from "../components/Header";
import { useSelector } from "react-redux";

const DriverScreen = ({ navigation }) => {
    const { driver } = useSelector((state) => state.Main)
    console.log(driver)
    return (
        <View>
            <Header navigation={navigation}/>
 <Text>Driver</Text>
        </View>
       
    )
}

export default DriverScreen