import {Image, Text, View, ScrollView} from "react-native";
import {Icon} from "react-native-elements";
import React from "react";
import { styles } from "../styles/Style";
import UploadedNewItem from "./UploadedNewItem";


export default function MissingProductImages({images, onRemove}) {

    return (
    <ScrollView style={styles.productHistory} onRemove>
                  {images.map((product) =><UploadedNewItem
                      key={product.uri}
                      name={product.name}
                      uri={product.uri}
                      type={product.type}
                      onRemove={onRemove}/>)}
                </ScrollView>);
}