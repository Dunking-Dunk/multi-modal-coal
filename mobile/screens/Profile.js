import { StyleSheet, Text, View, Image } from 'react-native';
import { useSelector } from 'react-redux';
import Header from '../components/Header'

const ProfileScreen = ({ navigation }) => {
    const {user} = useSelector((state) => state.Main)

    return (
        <View style={styles.container}>
            <View style={styles.image__container} >
                <Header navigation={navigation}/>
                <Image source={{uri:user.image.url}} style={styles.image} />
            </View>
            <View style={styles.detail__container}>
                <View style={styles.row}>
                    <Text style={styles.header}>Name</Text>
                    <Text style={styles.text}>{user.name}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.header}>Role</Text>
                    <Text  style={styles.text}>{user.role}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.header}>Email</Text>
                    <Text  style={styles.text}>{user.email}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.header}>Contact</Text>
                    <Text  style={styles.text}>{user.contact}</Text>
                </View>
            </View>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image__container: {
        height: '20%',
        backgroundColor: '#3887BE',
        position: 'relative',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 50,
        position: 'absolute',
        bottom: '-35%',
        left: '50%',
        transform: [{translateX: -75}]
    },
    detail__container: {
        paddingTop: 75,
        paddingHorizontal: 10
    },  
    row: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 6,
        backgroundColor: '#F6F6F6',
        marginVertical: 4,
        borderRadius: 8
      },
  });
  