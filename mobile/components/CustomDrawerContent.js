import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setUser } from "../store/MainReducer";
import { useDispatch } from "react-redux";
import axios from "../api/axios";

export default function CustomDrawerContent(props) {
  const dispatch = useDispatch()

  return (
    <DrawerContentScrollView {...props}>
      <Text
        style={{
          color:'#282534',
          marginVertical: 20,
          fontSize: 25,
          fontWeight: '900',
          paddingHorizontal:15
        }}
      >
       TravelFizz
      </Text>
      <DrawerItemList {...props} />
      <TouchableOpacity style={{padding: 20}}  onPress={async() => {
        await axios.post('/users/logout')
        dispatch(setUser(null))
        AsyncStorage.removeItem('userToken')
      }}>
        <Text style={{color: 'red'}}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}
