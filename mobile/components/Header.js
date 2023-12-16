import { View, Text, StyleSheet, TextInput } from "react-native";
import { memo } from "react";
import { Feather } from "@expo/vector-icons";

const Header = ({ navigation}) => {

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

export default memo(Header);
