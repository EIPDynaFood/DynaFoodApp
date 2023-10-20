import {TextInput, Text, View, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import { styles } from "../styles/Style";
import * as ImagePicker from 'expo-image-picker';
import mime from "mime";
import MissingProductImages from '../components/MissingProductImages'
import { endpoint } from '../../config';
import APIRoute from "../../API";
import useLang from "../../Language";


export default function MissingProduct({ navigation }) {
    const [images, setImages ] = useState([]);
    const [barcode, onChangeBarcode] = useState(localStorage.getItem("productCode"));
    const [productName, onChangeProductName] = useState("");
    const [size, onChangeSize] = useState("");
    const [company, onChangeCompany] = useState("");

    const formData = new FormData()

    const translations = require("../../translations/screens/MissingProduct.json")
    const {lang} = useLang()

    const onRemove = uri => e => {
        setImages(images.filter(image => image.uri !== uri));
    };

    const sendData = async () => {
        try {
            if (!barcode || !productName || !company || !size || !images) {
                alert(translations["AlertFailure"][lang])
                return
            }
            for (const image of images) {
                formData.append('files', {
                    uri : image.uri,
                    type: mime.getType(image.uri),
                    name: image.uri.split("/").pop(),
                    base64: image.base64
                })
            }
            formData.append('barcode', barcode)
            formData.append('size', size)
            formData.append('company', company)
            formData.append('productname', productName)
            let options = {
                method: 'POST',
                body: formData
            };
            await APIRoute(fetch(endpoint + 'upload', options).then(() => {
                alert(translations["AlertSuccess"][lang]);
                setImages([])
                onChangeBarcode("")
                onChangeProductName("")
                onChangeCompany("")
                onChangeSize("")
                navigation.navigate('Scanner')
            }).catch((err) => {
                if (err.response.status === 401)
                    throw(err);
                console.log(err);
            }))

        }
        catch (err) {
            console.log(err)
            if (err.response.status === 401)
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
        try {
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
        }
        catch (err) {
            console.log(err)
            throw err
        }
    }

    return (
        <>
            <View style={{alignItems: "center"}}>
                <TextInput
                    placeholder={translations["Barcode"][lang]}
                    style={[styles.input, {width: "85%"}]}
                    onChangeText={onChangeBarcode}
                    value={barcode}
                    keyboardType="decimal-pad"
                />
                <TextInput
                    placeholder={translations["ProductName"][lang]}
                    style={[styles.input, {width: "85%"}]}
                    onChangeText={onChangeProductName}
                    value={productName}
                />
                <TextInput
                    placeholder={translations["Company"][lang]}
                    style={[styles.input, {width: "85%"}]}
                    onChangeText={onChangeCompany}
                    value={company}
                />
                <TextInput
                    placeholder={translations["Size"][lang]}
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
                <Text style={[styles.textSign, { color: '#376D55'}]}>{translations["OpenCamera"][lang]}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={uploader}
                style={[styles.signIn, {borderColor: '#376D55', borderWidth: 1,
                    marginTop: 5, marginBottom: 9, backgroundColor: '#ffff'}]}
            >
                <Text style={[styles.textSign, { color: '#376D55'}]}>{translations["UploadPicture"][lang]}</Text>
            </TouchableOpacity>
            <MissingProductImages onRemove={onRemove} images={images}></MissingProductImages>
            <TouchableOpacity
                onPress={sendData}
                style={[styles.signIn, {borderColor: '#376D55', borderWidth: 1,
                    marginTop: 5, marginBottom: 9, backgroundColor: '#ffff'}]}
            >
                <Text style={[styles.textSign, { color: '#376D55'}]}>{translations["Submit"][lang]}</Text>
            </TouchableOpacity>
        </>
    );
}