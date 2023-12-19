import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { useEffect, useState } from 'react'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'

import api from '../api/axios.js'
import CustomButton from '../components/CustomButton'
import InputField from '../components/InputField'
import { setUser } from '../store/MainReducer.js'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginScreen = ({navigation}) => {
  const [state, setState] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
    const dispatch = useDispatch()

  const handleSubmit = async () => {
    try {
        const res = await api.post('/users/login', state)
     
        if (res.data.user.role === 'supervisor' || res.data.user.role === 'driver') {
          await AsyncStorage.setItem('userToken', res.data.token)
          dispatch(setUser(res.data.user))
          navigation.navigate('main')
        } else {
          setError('only drivers and supervisor can login')
        }
    
    } catch (err) {
      console.log(err)
      }
    
  }
  
  useEffect(() => {
    setTimeout(() => {
      setError('')
    }, 3000);
  }, [error])

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
    <InputField
      label={'Email ID'}
      setText={(e) => {
        setState((state) => ({...state, email: e}))
      }}
      icon={
        <MaterialIcons
          name="alternate-email"
          size={20}
          color="#666"
          style={{marginRight: 5}}
        />
      }
      keyboardType="email-address"
    />

    <InputField
      label={'Password'}
      setText={(e) => {
        setState((state) => ({...state, password: e}))
      }}
      icon={
        <Ionicons
          name="ios-lock-closed-outline"
          size={20}
          color="#666"
          style={{marginRight: 5}}
        />
      }
      inputType="password"
    />
    <CustomButton onPress={() => {
        handleSubmit()
        }} label='Login' />
        <Text style={styles.errorText}>{error}</Text>
    </View>
    )
}

export default LoginScreen

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
        marginBottom: 20
  },
  errorText: {
      color: 'red'
    }
})