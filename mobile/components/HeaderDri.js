import { View, Text, StyleSheet, TextInput } from "react-native";
import { memo } from "react";
import { Feather } from "@expo/vector-icons";
import { useSelector } from 'react-redux';
import { colors } from "./theme";

const HeaderDri = ({ navigation}) => {
  const {user} = useSelector((state) => state.Main)
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerMenuContainer}>
        <Feather
          name="menu"
          size={32}
          color='#282534'
          onPress={() => navigation.openDrawer()}
          style={styles.headerMenu}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    position: "absolute",
    zIndex: 1,
    backgroundColor:colors.blue
  },

  headerMenuContainer: {
    position: "absolute",
    top: 10,
    left: 15,
    borderRadius: 50,
    padding: 10,
    backgroundColor: '#fff',
  },
});

export default memo(HeaderDri);
