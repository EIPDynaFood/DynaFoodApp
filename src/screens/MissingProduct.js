import {Button, StyleSheet, Text, View, Image, TouchableOpacity, FlatList} from "react-native";
import React, {useState, useEffect, useLayoutEffect, useCallback} from "react";
import {FAB} from 'react-native-elements';
import {Icon} from 'react-native-elements';
import {useNavigation} from "@react-navigation/native";
import {RequireJwt} from "../components/RequireJwt";
import { ScrollView } from "react-native-gesture-handler";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { styles } from "../styles/Style";
import * as ImagePicker from 'expo-image-picker';
import { Dimensions } from "react-native";
import { Surface } from "react-native-paper";
import * as DocumentPicker from 'expo-document-picker';
import mime from "mime";


const axios = require('axios');

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

export default function MissingProduct({ navigation }) {
    const [images, setImages ] = useState([]);
    const [doc, setDoc] = useState()
    const formData = new FormData()

    const uploader = async () => {
        // const response = await ImagePicker.launchImageLibraryAsync({mediaTypes: ImagePicker.MediaTypeOptions.All,
        //     allowsEditing: true,
        //     base64: true,
        //     quality: 1,})
        //     if (response.cancelled) {
        //         return;
        //     }
        //     console.log(response.uri)
        //     console.log(response.base64.length)
        try {
            console.log("nice")
            const response = await DocumentPicker.getDocumentAsync({
                type: "*/*",
                copyToCachesDirectory: true,
        multiple: false,
            })
            console.log("not nice")

            console.log(response)
            response.uri =  "file:///" + response.uri.split("file:/").join("");
            const img = {
                uri: response.uri,
                name: response.name,
                type: response.type
            };
            setImages(prevImages => prevImages.concat(img));
            setDoc(response)
            formData.append('image', {
                uri : response.uri,
                type: mime.getType(response.uri),
                name: response.uri.split("/").pop()
               })
            console.log(formData)
            let options = {
                method: 'POST',
                body: formData,
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'multipart/form-data',
                },
              };
            fetch('https://dynafood-server.herokuapp.com/upload', options).catch((err) => {console.log(err)})
        }
        catch (err) {
            console.log(err)
                throw err
        }
    }

    useLayoutEffect(() => {

        navigation.setOptions({
            headerRight: () => <Icon name="settings" onPress={uploader} />
        });
    }, [navigation]);

    return (
        <RequireJwt>
            <TouchableOpacity
            onPress={uploader}
                style={[styles.signIn, {borderColor: '#376D55', borderWidth: 1,
                    marginTop: 5, marginBottom: 9, backgroundColor: '#ffff'}]}
            >
                <Text style={[styles.textSign, { color: '#376D55'}]}>Upload Image</Text>
            </TouchableOpacity>
            <FlatList
            numColumns={2}
            data={images}
            rederItem={({item}) => (
                <Surface style={styles_here.gridItem}>
                    <Image source={{uri: item.uri}} style={styles_here.coverImg}></Image>
                </Surface>
            )}
             />
            <TouchableOpacity
            onPress={uploader}
                style={[styles.signIn, {borderColor: '#376D55', borderWidth: 1,
                    marginTop: 5, marginBottom: 9, backgroundColor: '#ffff'}]}
            >
                <Text style={[styles.textSign, { color: '#376D55'}]}>Send</Text>
            </TouchableOpacity>
        </RequireJwt>
  );
}

const styles_here = StyleSheet.create({
    coverImg: {
        width: '100%',
        height: 200,
        resizeMode: 'contain'
    },
    gridItem: {
        width: Dimensions.get('window').width / 2,
        height: 200
    }
})