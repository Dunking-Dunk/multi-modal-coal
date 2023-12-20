import { Text, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { colors } from '../components/theme'
import CustomButton from '../components/CustomButton'

const SOS  = ({navigation}) =>  {
    return (
      <View style={styles.container}>
        <Text style>SOS</Text>
        <CustomButton label='Emergency' />        
      </View>
    )
  }


export default SOS

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        gap: 10
    },
    title: {
        fontSize: 28,
        textTransform: 'uppercase',
        marginBottom: 20,
        fontWeight: 'bold',
        color : "#F22F2F"
  },

})