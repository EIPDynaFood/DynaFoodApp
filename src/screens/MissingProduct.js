import {TextInput, StyleSheet, Text, View, Image, TouchableOpacity} from "react-native";
import React, {useState, useLayoutEffect, Component} from "react";
import {Icon} from 'react-native-elements';
import {RequireJwt} from "../components/RequireJwt";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from "../styles/Style";
import * as ImagePicker from 'expo-image-picker';
import { Dimensions } from "react-native";
import mime from "mime";
import MissingProductImages from '../components/MissingProductImages'


const axios = require('axios');

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
}); 

class FlatListItem extends Component {
    render() {
        return (
            <View style={{
                flex:1,
                flexDirection: "row",
            }}>
                <Image source={{uri: this.props.item.imageUrl}} style={{width: 100, height: 100, margin: 5}}></Image>
                <View style={{
                flex:1,
                flexDirection: "column"
                }}>
                    </View><Text style={{color: "white", padding:10, fontSize:16}}>{this.props.item.name}</Text>
            </View>
        )
    }
}

export default function MissingProduct({ navigation }) {
    const [images, setImages ] = useState([]);
    const [barcode, onChangeBarcode] = useState(localStorage.getItem("productCode"));
    const [productName, onChangeProductName] = useState("");
    const [size, onChangeSize] = useState("");
    const [company, onChangeCompany] = useState("");
    
    const formData = new FormData()

    const onRemove = uri => e => {
        setImages(images.filter(image => image.uri !== uri));
      };

    const sendData = async () => {
        try {
            if (!barcode || !productName || !company || !size || !images) {
                alert("Please fill 'Barcode', 'Product Name', 'Company', 'Size' and upload at least one picture to send information about a missing product.")
                return
            }
            for (const image of images) {
                formData.append(mime.getType(image.uri).split("/")[0], {
                    uri : image.uri,
                    type: mime.getType(image.uri),
                    name: image.uri.split("/").pop(),
                    base64: image.base64
                })                
            }
            // console.log(formData)
            // let options = {
            //     method: 'POST',
            //     body: formData,
            //     headers: {
            //     Accept: 'application/json',
            //     'Content-Type': 'application/x-www-form-urlencoded',
            //     },
            // };
            let options = {
                method: 'POST',
                body: formData,
                headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                },
            };
            fetch('https://dynafood-server.herokuapp.com/upload', options).then(() => {
                alert(`Missing Product information about '${productName} ${size}' by '${company}' (barcode: '${barcode}') sended. Thanks for your help!`);
                setImages([])
                onChangeBarcode("")
                onChangeProductName("")
                onChangeCompany("")
                onChangeSize("")
                navigation.navigate('Scanner')
            }).catch((err) => {console.log(err)})
            
        }
        catch (err) {
            console.log(err)
            throw(err)
        }
    }

    const uploaderCam = async () => {
        try {
            const response = await ImagePicker.launchCameraAsync({quality: 1, mediaTypes: ImagePicker.MediaTypeOptions.All, allowsEditing: true, base64: true})
            if (response.cancelled) {
                return;
            }
            const img = {
                uri: response.uri,
                name: response.uri.split('/').pop(),
                type: response.type,
                base64: response.base64
            };
            setImages(prevImages => prevImages.concat(img));
            
        }
        catch (err) {
            console.log(err)
                throw err
        }
    }

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
        //     const response = await DocumentPicker.getDocumentAsync({
        //         type: "*/*",
        //         copyToCachesDirectory: true,
        // multiple: false,
        //     })
        const response = await ImagePicker.launchImageLibraryAsync({mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            base64: true,
            quality: 1,})
            if (response.cancelled) {
                return;
            }
            const img = {
                uri: response.uri,
                name: response.uri.split('/').pop(),
                type: response.type,
                base64: response.base64
            };
            setImages(prevImages => prevImages.concat(img));
            // setDoc(response)
            
        }
        catch (err) {
            console.log(err)
                throw err
        }
    }

    return (
        <RequireJwt>
            <View style={{alignItems: "center"}}>
            <TextInput
                    placeholder="Barcode..."
                    style={[styles.input, {width: "85%"}]}
                    onChangeText={onChangeBarcode}
                    value={barcode}
                    keyboardType="decimal-pad"
                    />
                <TextInput
                placeholder="Product Name..."
                style={[styles.input, {width: "85%"}]}
                onChangeText={onChangeProductName}
                value={productName}
                />
                <TextInput
                    placeholder="Company..."
                    style={[styles.input, {width: "85%"}]}
                    onChangeText={onChangeCompany}
                    value={company}
                    />
                <TextInput
                    placeholder="Size... ex. (100g, 400ml)"
                    style={[styles.input, {width: "85%"}]}
                    onChangeText={onChangeSize}
                    value={size}
                    />
                </View>
                <TouchableOpacity
            onPress={uploaderCam}
                style={[styles.signIn, {borderColor: '#376D55', borderWidth: 1,
                    marginTop: 5, marginBottom: 9, backgroundColor: '#ffff'}]}
            >
                <Text style={[styles.textSign, { color: '#376D55'}]}>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={uploader}
                style={[styles.signIn, {borderColor: '#376D55', borderWidth: 1,
                    marginTop: 5, marginBottom: 9, backgroundColor: '#ffff'}]}
            >
                <Text style={[styles.textSign, { color: '#376D55'}]}>Upload Image</Text>
            </TouchableOpacity>
            <MissingProductImages onRemove={onRemove} images={images}></MissingProductImages>
            <TouchableOpacity
            onPress={sendData}
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
    },
    container: {
        flex: 1,
        flexDirection: "column",
    }
})