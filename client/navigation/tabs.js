import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeSup } from "../screens";
import { COLORS, FONTS, icons } from "../constants";
import { View, Image, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
    tabBarOptions={{
        showLabel: false, 
        style: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: COLORS.white,
          borderTopColor: "transparent",
          height: 100
        }
    }}
    >
      
      <Tab.Screen
        name="Home"
        component={HomeSup}
        options={{ 
          headerShown: false, 
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={icons.home}
                resizeMode="contain"
                style={{
                  width: 30, 
                  height: 30,
                  tintColor: focused ? COLORS.primary : COLORS.black
                }}    
              />
              <Text style={{
                color: focused ? COLORS.primary : COLORS.black, ...FONTS.body5 
              }}>Home</Text>
            </View>
          )
        }} 
      />

      <Tab.Screen
        name="Shipments"
        component={HomeSup}
        options={{ 
          headerShown: false, 
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={icons.shipment1}
                resizeMode="contain"
                style={{
                  width: 30, 
                  height: 30,
                  tintColor: focused ? COLORS.primary : COLORS.black
                }}    
              />
              <Text style={{
                color: focused ? COLORS.primary : COLORS.black, ...FONTS.body5 
              }}>Shipments</Text>
            </View>
          )
        }} 
      />
      
      <Tab.Screen
        name="Message"
        component={HomeSup}
        options={{ 
          headerShown: false, 
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={icons.chat}
                resizeMode="contain"
                style={{
                  width: 30, 
                  height: 30,
                  tintColor: focused ? COLORS.primary : COLORS.black
                }}    
              />
              <Text style={{
                color: focused ? COLORS.primary : COLORS.black, ...FONTS.body5 
              }}>Message</Text>
            </View>
          )
        }} 
      />
      <Tab.Screen
        name="Settings"
        component={HomeSup}
        options={{ 
          headerShown: false, 
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={icons.settings}
                resizeMode="contain"
                style={{
                  width: 30, 
                  height: 30,
                  tintColor: focused ? COLORS.primary : COLORS.black
                }}    
              />
              <Text style={{
                color: focused ? COLORS.primary : COLORS.black, ...FONTS.body5 
              }}>Settings</Text>
            </View>
          )
        }} 
      />
    </Tab.Navigator>
  );
};

export default Tabs;
