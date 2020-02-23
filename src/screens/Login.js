import React, { Component, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Login(props) {

  const [ isLoading, setIsLoading ] = useState(false)
  const [ email, setEmail] = useState('')
  const [ isEmailValid, setIsEmailValid] = useState(true)
  const [ password, setPassword] = useState('')
  const [ isPasswordValid, setIsPasswordValid] = useState(true)
  
  let emailInput;
  let passwordInput;


  const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const login = async () => {
    
    if(validateEmail(email)) setIsEmailValid(true)
    else return setIsEmailValid(false);
    if(password.length >= 6) setIsPasswordValid(true)
    else return setIsPasswordValid(false)
    
    setIsLoading(true)

    try {
      let response = await fetch("http://ws4.shareservice.co/TestMobile/rest/Login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      });
      let responseJson = await response.json();
      console.log(responseJson)
      await AsyncStorage.setItem("session", responseJson.ExpirationDate?.toString());
      setIsLoading(false)
      sendNotifiToMe()
      props.navigation.replace('Home')

    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  const sendNotifiToMe= async ()=>{
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    try {
      let response = await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'key=AIzaSyA3is-XLaVpOri8l1ScjKBs53EqXxoHaC0'
        },
        body: JSON.stringify({
          "registration_ids":
            [fcmToken],
          "notification": {
            "title": "Se ha registrado un inicio de session",
            "body": "Esta notificacion es para informarle de un inicio de session ene ste dispositivo",
            "sound": "sound",
          },
          "priority": "high",
          "collapse_key": "inform"
        }),
      });
      let responseJson = await response.json();
      console.log(responseJson);

    } catch (error) {
      console.error(error);
    }
  }



  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />

      <ImageBackground source={require('../img/bg_screen.jpg')} style={styles.bgImage}>
        <View style={{ width: '100%', height: '100%', padding: 16, justifyContent: 'center', }}>
          <KeyboardAvoidingView
            contentContainerStyle={styles.loginContainer}
            behavior="position"
          >
            <View style={styles.formContainer}>
              <Input
                value={email}
                leftIcon={<Icon name="envelope" size={24} color="#f26101" />}
                keyboardAppearance="light"
                autoFocus={false}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                inputStyle={{ marginLeft: 10 }}
                placeholder={'Email'}
                ref={input => (emailInput = input)}
                onSubmitEditing={() => passwordInput.focus()}
                onChangeText={setEmail}
                errorMessage={
                  isEmailValid ? null : 'Por favor ingrese un email valido'
                }
              />
              <Input
                value={password}
                leftIcon={<Icon name="lock" size={32} color="#f26101" />}
                keyboardAppearance="light"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                returnKeyType={'done'}
                blurOnSubmit={true}
                inputStyle={{ marginLeft: 10 }}
                placeholder={'Password'}
                ref={input => (passwordInput = input)}
                onSubmitEditing={login}
                onChangeText={setPassword}
                errorMessage={
                  isPasswordValid ? null : 'Por favor ingrese un password de 6 caracteres o mas'
                }
              />

              <Button
                buttonStyle={styles.loginButton}
                containerStyle={{ marginTop: 32, flex: 0 }}
                activeOpacity={0.8}
                title={'LOGIN'}
                onPress={login}
                titleStyle={styles.loginTextButton}
                loading={isLoading}
                disabled={isLoading}
              />
            </View>
          </KeyboardAvoidingView>

        </View>
      </ImageBackground>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginContainer: {
    width:'100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginTextButton: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#f26101',
    borderRadius: 10,
    height: 50,
    width: 200,
  },
  formContainer: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 10,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: 'center',
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'regular',
  },
});