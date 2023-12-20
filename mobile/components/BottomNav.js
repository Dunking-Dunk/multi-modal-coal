import { View, Text, Platform } from "react-native";
import React from "react";
import {
  SimpleLineIcons,
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
  Ionicons
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from '../screens/Profile.js';
import DriverScreen from '../screens/Driver.js'
import SupervisorScreen from '../screens/Supervisor.js';
import ShipmentsScreen from '../screens/Shipments.js';
import Settings from '../screens/Settings.js';


const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarHideOnKeyboard: true,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    backgroundColor: "#fff",
  },
};
const BottomTabNav = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
       {user.role === 'driver' ?
            <Tab.Screen
            name="Home"
            component={DriverScreen}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <SimpleLineIcons
                    name="home"
                    size={24}
                    color={focused ? "#023430" : "#000000"}
                  />
                );
              },
            }}
          /> :
          <Tab.Screen
          name="Home"
          component={SupervisorScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <SimpleLineIcons
                  name="home"
                  size={24}
                  color={focused ? "#023430" : "#000000"}
                />
              );
            },
          }}
        />
          }
      

      <Tab.Screen
        name="Shipments"
        component={Shipments}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
                <Ionicons name="train-outline"
                size={24}
                color={focused ? "#023430" : "#000000"}
              />
            );
          },
        }}
      />

      {/* <Tab.Screen
        name="Create"
        component={Create}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: COLORS.primary,
                  height: Platform.OS == "ios" ? 50 : 60,
                  width: Platform.OS == "ios" ? 50 : 60,
                  top: Platform.OS == "ios" ? -10 : -20,
                  borderRadius: Platform.OS == "ios" ? 25 : 30,
                  borderWidth: 2,
                  borderColor: COLORS.white,
                }}
              >
                <Fontisto name="plus-a" size={24} color={COLORS.white} />
              </View>
            );
          },
        }}
      /> */}

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name="settings"
                size={24}
                color={focused ? "#023430" : "#000000"}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name="person-outline"
                size={24}
                color={focused ? "#023430" : "#000000"}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;