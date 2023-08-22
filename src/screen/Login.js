import React, { Component, useState, useEffect } from 'react'
import { View, TextInput, ActivityIndicator, Modal, Button, StyleSheet, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Login({ navigation }) {
  const transparent = 'rgba(0,0,0,0.5)'
  const { control, handleSubmit, formState: { errors } } = useForm();
  
  const [isFocus, setIsFocus] = useState(false)

  const onSubmit = (data) => {
    setIsFocus(true)
    if (data?.email == 'Admin@gmail.com' && data?.password == 'Admin@123') {
      setTimeout(() => {
        storeData(data?.email)
        setIsFocus(false)
        Toast.show("User login successfully.")
        navigation.replace("Home")
      }, 3000)
      console.log(data);
    }
    else {
      setTimeout(() => {
        setIsFocus(false)
        Toast.show("Please enter valid credentials.")
      }, 3000)
    }
  };

  const storeData = async (email) => {
    // const getEmail = await AsyncStorage.getItem('key');
    console.log("storeemail===>", email)
    await AsyncStorage.setItem('key', email);
  }

  const modalRender = () => {
    return (
      <View>
        <Modal visible={isFocus} animationType="slide" transparent={true} >
          <View style={{ flex: 1, backgroundColor: transparent, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color='white' size="large" />
          </View>
        </Modal>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.topView}>
          <Text style={styles.txt}>Welcome to Login !</Text>
        </View>
        <View style={{ padding: 30 }}>
          <Controller
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={{ marginBottom: 30 }}>
                <Text style={{ fontSize: 15, marginBottom: 2 }}>Email </Text>
                <TextInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Email"
                  style={styles.viewBox}
                />
                {errors.email && <Text style={{ color: 'red', marginTop: 3 }}>{errors.email.message} *</Text>}
              </View>
            )}
            name="email"
            defaultValue=""
          />

          <Controller
            control={control}
            rules={{ required: 'Password is required' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={{ marginBottom: 40 }}>
                <Text style={{ fontSize: 15, marginBottom: 2 }}>Password</Text>
                <TextInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Password"
                  secureTextEntry
                  style={styles.viewBox}
                />
                {errors.password && <Text style={{ color: 'red' }}>{errors.password.message} *</Text>}
              </View>
            )}
            name="password"
            defaultValue=""
          />
          <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.loginbtn}>
            <Text style={styles.txt} >Login</Text>
          </TouchableOpacity>
          {/* <Button title="Submit" style={{color:''}} onPress={handleSubmit(onSubmit)} /> */}
        </View>
        {modalRender()}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  viewBox: {
    // backgroundColor:'pink',,
    flexDirection: 'row',
    padding: 15,
    width: "100%",
    borderRadius: 10,
    justifyContent: 'space-between',
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 5,
    backgroundColor: "white",
    shadowRadius: 10,
    shadowOffset: { width: 50, height: 100 },
    // borderRadius: 5,
  },
  topView: {
    height: '30%',
    backgroundColor: "purple",
    width: '100%',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginbtn: {
    backgroundColor: "purple",
    padding: 15,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  txt: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white'
  }
})