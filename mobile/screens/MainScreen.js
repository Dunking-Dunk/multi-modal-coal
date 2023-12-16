import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawerContent from '../components/CustomDrawerContent.js'
import HomeScreen from './Home.js';
import ProfileScreen from './Profile.js';
import DriverScreen from './Driver.js'
import SupervisorScreen from './Supervisor.js';

import { useSelector } from 'react-redux';

const Drawer = createDrawerNavigator()

const MainScreen = () => {
  const { user } = useSelector((state) => state.Main)

    return(
      <View style={styles.container}>
<Drawer.Navigator initialRouteName='main'  drawerContent={(props) => (
        <CustomDrawerContent
          {...props}
        />
      )}
      screenOptions={{
        drawerActiveBackgroundColor: '#0F0F0F',
        drawerActiveTintColor: '#fff',
        drawerStatusBarAnimation: "fade",
        swipeEnabled: true,
        headerShown: false,
        drawerInactiveTintColor: '#282534',
      }}>
          {user.role === 'driver' ?
            <Drawer.Screen name='Vehicle' component={DriverScreen} /> :
            <Drawer.Screen name='Place' component={SupervisorScreen} />
        }
          <Drawer.Screen name='profile' component={ProfileScreen}/>
      </Drawer.Navigator>
      </View>
    )
}

export default MainScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#282534'
    },
  });
  