import React, { Component, useEffect } from 'react';
import { View, Text, StatusBar, ImageBackground } from 'react-native';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

export default function Splash (props){
 
  const getToken = async() => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
          await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  const checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      getToken();
    } else {
      requestPermission();
    }
  }

  const requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      getToken();
    } catch (error) {
      console.log('permission rejected');
    }
  }


  const createNotificationListeners = async () => {
    firebase.notifications().onNotification(notification => {
      notification.android.setChannelId('insider').setSound('default')
      firebase.notifications().displayNotification(notification)
    });
  }

  useEffect(()=>{
    const channel = new firebase.notifications.Android.Channel('insider', 'insider channel', firebase.notifications.Android.Importance.Max)
    firebase.notifications().android.createChannel(channel);
    checkPermission();
    createNotificationListeners();

    setTimeout( async () => {
      const session = await AsyncStorage.getItem('session')
      if(session){
        props.navigation.replace('Home')
      }else{
        props.navigation.replace('Login')
      }
    }, 1000);

  },[])

  

  return (
    <ImageBackground source={require('../img/bg_screen.jpg')} style={{width:'100%',height:'100%'}}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
    </ImageBackground>
  );
}
