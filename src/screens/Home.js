import React, { useState } from 'react';
import { 
  View,
  Text,
  Image,
  StatusBar,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Lista from '../components/Lista';
import Contactenos from '../components/Contactenos';
import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions } from '@react-navigation/native'


const initialLayout = { width: Dimensions.get('window').width };

export default function Home(props) {
  const [index, setIndex] = useState(0);
  const routes = [
    { key: 'Lista', title: 'Nuestros produtos' },
    { key: 'Contactenos', title: 'Contactenos' },
  ];

  const renderScene = SceneMap({
    Lista: Lista,
    Contactenos: Contactenos,
  });

  const colseSession= async () =>{
    await AsyncStorage.removeItem('session');
    props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'Login' },
        ],
      })
    );
  }

  return (
    <View style={{width:'100%',height:'100%'}}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />

      <View style={styles.head}>
        <View style={styles.headTittleCont}>
          <Text style={{fontSize:20,color:'#fff'}}>Prueba RN</Text>
          <TouchableOpacity 
          onPress={colseSession}
          style={{padding: 2,}}>
            <Image source={require('../img/closeIcon.png')} resizeMode='contain' style={{width:34,height:34}} />
          </TouchableOpacity>
        </View>
      </View>

      <TabView
        renderTabBar={props => <TabBar {...props} indicatorStyle={{backgroundColor: '#fff',height:3,borderBottomWidth:0.3,borderColor:'#f26101'}} style = {{backgroundColor :  '#f26101' }}/>}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  head:{
    width:'100%',
    justifyContent: 'flex-end',
    height:64,
    paddingTop:40,
    backgroundColor: '#f26101',
  },
  headTittleCont:{
    flexDirection:'row',
    paddingHorizontal:16,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
});

