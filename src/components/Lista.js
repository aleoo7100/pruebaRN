import React,{ useState, useEffect} from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';


export default function Lista(props) {

  const [ isLoading, setIsLoading ] = useState(false)
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    
    loadProducts()

  },[])

  const loadProducts = async()=>{
    setIsLoading(true)
    try {
      let response = await fetch("http://ws4.shareservice.co/TestMobile/rest/GetProductsData", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          mimeType: "application/json"
        }
      });
      let responseJson = await response.json();
      console.log(responseJson)
      setProducts(responseJson)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }


  return (
    <View style={styles.container}>

      <FlatList
        data={products}
        refreshing={isLoading}
        onRefresh={loadProducts}
        style={{ width: '100%', padding: 8,}}
        ListEmptyComponent={<Text style={styles.textEmpty}>No hay productos para mostrar</Text>}
        ListFooterComponent={<View style={{ width: '100%', height: 20 }} />}
        renderItem={({ item }) => (
          <Card
            title={item.Name}
            image={{uri:item.ImageUrl}}>
            <Text style={{marginBottom: 10}}>{item.Description}</Text>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  textEmpty:{ 
    fontSize: 20, 
    color: '#555', 
    textAlign: 'center', 
    marginTop: 8 
  },
  header:{
    width:'100%',
    height:80,
    alignItems: 'center',
    flexDirection:'row',
    paddingHorizontal:16,
    paddingTop:30,
    backgroundColor: '#f26101'
  }
});