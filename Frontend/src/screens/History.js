import {Button, StyleSheet, Text, View, Image, ToastAndroid} from "react-native";
import React, {useState, useEffect} from "react";
import {FAB} from 'react-native-elements';
import {Icon} from 'react-native-elements';
import {useNavigation} from "@react-navigation/native";
import {RequireJwt} from "../components/RequireJwt";
import SearchBar from "react-native-elements/dist/searchbar/SearchBar-ios";
import { ScrollView } from "react-native-gesture-handler";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const axios = require('axios');

function TrendBar() {
  const navigation = useNavigation();
  // to change later...
  let trendingProducts = [
    {
      name: 'Coca Cola',
      barcode: '5449000214911',
      img: 'https://images.openfoodfacts.org/images/products/544/900/021/4911/front_en.119.200.jpg'
    },
    {
      name: 'Sauce Ketchup',
      barcode: '87157215',
      img: 'https://images.openfoodfacts.org/images/products/87157215/front_en.73.200.jpg'
    },
    {
      name: 'Ja! Rewe, Apfel Schorle',
      barcode: '4388810057831',
      img: 'https://images.openfoodfacts.org/images/products/438/881/005/7831/front_de.19.200.jpg'
    },
    {
      name: 'Sprite Lemon Lime',
      barcode: '5449000012203',
      img: 'https://images.openfoodfacts.org/images/products/544/900/001/2203/front_fr.70.200.jpg'
    },
    {
      name: 'Natürliches Mineral Wasser',
      barcode: '4311596435982',
      img: 'https://images.openfoodfacts.org/images/products/431/159/643/5982/front_en.11.200.jpg'
    }
  ];
  return (
    <ScrollView horizontal>
      {trendingProducts.map((item, index) => (
        <TouchableWithoutFeedback key={index} style={{flex: 1}} onPress={() => {
          localStorage.setItem('productCode', item.barcode);
          navigation.navigate('Product');
        }}>
          <View style={{flex: 1, width: 85, padding: 5}}>
            <Image source={{uri: item.img}} style={styles.itemImage}/>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={{fontSize: 13, textAlign: 'center'}}>{item.name}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </ScrollView>
  )
}

function ProductItem(itemData) {
  const navigation = useNavigation();

  const deleteHistoryItem = () => {
    axios.delete('https://dynafood.herokuapp.com/history/' + itemData.historyId).then((res) => {
      console.log(res.status);
      alert('Item successfully deleted');
    }).catch((err) => {
      console.log('catch');
      alert("something went wrong deleting history data: " + err.message);
      console.log(err);
    });
  };

  return (
    <View style={styles.productItem}>
      <TouchableWithoutFeedback onPress={() => {
        localStorage.setItem('productCode', itemData.barcode);
        navigation.navigate('Product');
      }}>
        <View style={{flexDirection: "row"}}>
          <Image
            style={{width: 60, height: 60}}
            source={{uri: itemData.img}}/>
          <View style={{marginLeft: 10, width: '60%'}}>
            <Text
              numberOfLines={1}
              style={{fontSize: 21, fontWeight: 'bold'}}>{itemData.name}</Text>
            <Text
              numberOfLines={1}
              style={{fontSize: 13}}>Barcode: {itemData.barcode}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={{flex: 1, flexDirection: 'row-reverse', alignItems: 'center'}}>
        <Icon name='delete' onPress={deleteHistoryItem}/>
      </View>
    </View>
  );
}

function ProductHistory() {
  const [historyData, setHistoryData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      ToastAndroid.show('You can not go back to login. If you want to logout, go to the settings.', ToastAndroid.SHORT);
    });

    axios.get('https://dynafood.herokuapp.com/history').then((res) => {
      setHistoryData(res.data);
    }).catch((err) => {
      console.log('catch');
      alert("something went wrong getting history data: " + err.message);
      console.log(err);
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      {historyData === null ? (<FAB color="grey" size="small" loading/>) : (
        (historyData.elements.length === 0) ? (
          <View style={styles.productHistory}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Scanner')}>
              <View style={styles.productItem}>
                <View style={{marginLeft: 10, width: '60%'}}>
                  <Text
                    numberOfLines={1}
                    style={{fontSize: 21, fontWeight: 'bold'}}>Add a new product</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row-reverse', alignItems: 'center'}}>
                  <Icon name='reorder' iconStyle={{transform: [{rotate: '90deg'}]}}/>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        ) : (
        <ScrollView style={styles.productHistory}>
          {historyData.elements.map((product) => <ProductItem
            key={product.historyid}
            name={product.productname}
            img={product.picturelink}
            barcode={product.barcode}
            historyId={product.historyid}/>)}
        </ScrollView>
      ))}
    </View>
  );
}

export default function History() {
  const navigation = useNavigation();

  const [search, setSearch] = useState(null);

  return (
      <RequireJwt>
        <View style={StyleSheet.absoluteFillObject}>
          <SearchBar
            inputContainerStyle={styles.searchBar}
            value={search}
            placeholder="Search a product"/>
          <View style={styles.trendBar}>
            <Text style={{fontSize: 21, fontWeight: "bold"}}>
              Trending
            </Text>
            <TrendBar/>
          </View>
          <View style={{alignSelf: 'center', width: '90%', flex: 1}}>
            <Text style={{fontSize: 21, fontWeight: 'bold'}}>
              Your products
            </Text>
            <ProductHistory/>
          </View>
          <FAB
              color="black"
              icon={{name: 'reorder', color: 'white', transform: [{rotate: '90deg'}]}}
              style={{position: "absolute", bottom: 16, right: 16}}
              onPress={() => {
                navigation.navigate('Scanner')
              }}
          />
        </View>
      </RequireJwt>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    alignSelf: 'center',
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  trendBar: {
    alignSelf: 'center',
    width: '90%',
    height: 170,
  },
  itemImage: {
    height: 70,
    width: 70,
    borderRadius: 50
  },
  productHistory: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
  },
  productItem: {
    backgroundColor: '#fff',
    flexDirection: "row",
    marginTop: 10,
    padding: 10,
    borderRadius: 10
  }
});
