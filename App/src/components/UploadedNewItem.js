import {Image, Text, View} from "react-native";
import {Icon} from "react-native-elements";
import React from "react";
import { styles } from "../styles/Style";

export default function UploadedNewItem(itemData) {

  return (
      <View style={styles.productItem}>
          <View style={{flexDirection: "row"}}>
            <Image
                style={{width: 60, height: 60}}
                source={{uri: itemData.uri}}/>
            <View style={{marginLeft: 10, width: '60%'}}>
              <Text
                  numberOfLines={1}
                  style={{fontSize: 21, fontWeight: 'bold'}}>{itemData.type}</Text>
              <Text
                  numberOfLines={1}
                  style={{fontSize: 13}}>name: {itemData.name}</Text>
            </View>
          </View>
        <View style={{flex: 1, flexDirection: 'row-reverse', alignItems: 'center'}}>
          <Icon name='delete' onPress={itemData.onRemove(itemData.uri)}/>
        </View>
      </View>
  );
}