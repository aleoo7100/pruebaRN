import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function Contactos(props) {
  return (
    <View style={styles.container}>

      <View style={styles.infoContainer}>
        <Text style={styles.name}>Nombre de la empresa</Text>
        <TouchableOpacity
        onPress={()=>{Linking.openURL('https://www.google.com').catch((err) => console.error('An error occurred', err));}}
        activeOpacity={1} 
        style={styles.itemCont}>
          <Icon name="internet-explorer" size={24} color="#f26101" />
          <Text style={styles.textDescription}>www.Google.com</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>{Linking.openURL('mailto://empresa@dominio.com').catch((err) => console.error('An error occurred', err));}}
        activeOpacity={1} 
        style={styles.itemCont}>
          <Icon name="envelope" size={24} color="#f26101" />
          <Text style={styles.textDescription}>empresa@dominio.com</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={()=>{Linking.openURL('tel:3001234567').catch((err) => console.error('An error occurred', err));}}
        activeOpacity={1} 
        style={styles.itemCont}>
          <Icon name="phone" size={24} color="#f26101" />
          <Text style={styles.textDescription}>300 1234567</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        activeOpacity={1} 
        style={styles.itemCont}>
          <Icon name="map-marker" size={24} color="#f26101" />
          <Text style={styles.textDescription}>Bogotá</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.mapContainer}>

        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 4.710437,
            longitude: -74.072141,
            latitudeDelta: 0.0092,
            longitudeDelta: 0.0091,
          }}
        >
          <Marker
              coordinate={{
                latitude: 4.710437,
                longitude: -74.072141,
              }}
              title="Estamos aqui"
              description="Esta es la cede de nuestra empresa"
            />
        </MapView>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    width:'100%', 
    height:'100%',
    paddingTop:24, 
    alignItems: 'center'
  },
  infoContainer:{
    width:'100%',
    marginBottom:32,
    paddingHorizontal:32
  },
  name:{
    fontSize:24,
    textAlign:'center',
    marginBottom:8
  },
  itemCont:{
    marginVertical:8,
    alignItems: 'center',
    flexDirection:'row'
  },
  textDescription:{
    marginLeft:12,
    fontSize:18,
  },
  mapContainer:{
    width:'100%',
    height:250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    height: '100%',
    width: '90%',
  },
});