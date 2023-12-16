import React from "react";
import { Text,View } from "react-native";
import Header from "../components/Header";
import { useSelector } from "react-redux";

const SupervisorScreen = ({ navigation }) => {
    const { places } = useSelector((state) => state.Main)
    
    return (
        <View>
            <Header navigation={navigation}/>
  <Text>supervisor</Text>
        </View>
      
    )
}

export default SupervisorScreen