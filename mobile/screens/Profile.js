import { StyleSheet, Text, View } from 'react-native';

const ProfileScreen = ({ navigation, route }) => {
    return (
        <View style={styles.container}>
            <Text>Profile Page please work</Text>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
     
    },
  });
  