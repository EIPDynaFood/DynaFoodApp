import {Text, View, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import { endpoint } from '../../config';
import axios from "axios";
import { styles } from "../styles/Style";
import {SearchBar} from "react-native-elements";
import {useNavigation} from "@react-navigation/native";
import APIRoute from "../../API";
import useLang from "../../Language";



export function ProductSearchBar() {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false)

    const translations = require("../../translations/components/ProductSearchBar.json")
    const {lang} = useLang();

    const handleSearch = (text) => {
        setSearchQuery(text);
        if (text.length > 1) {
            setLoading(true)
            APIRoute(() => axios.get(endpoint + `searchProduct?value=${text}&count=5`).then((res) => {
                    if (text !== "")
                        setSearchResults(res.data)
                    else
                        setSearchResults([])

                }
            ).catch((err) => {
                if (err.response.status === 401)
                    throw(err)
                console.log(err)
                alert(translations["ErrorSearch"][lang] + '\n' + err.message);
            }).finally(() => setLoading(false)))
        } else {
            setSearchResults([])
        }
    }

    return (
        <View>
            <SearchBar
            placeholder={"Search..."}
            onChangeText={handleSearch}
            value={searchQuery}
            inputContainerStyle={styles.searchBar}
            containerStyle={styles.searchBarContainer}
            />
            {loading ?
                <View style={styles.productResultsContainer}>
                    <Text style={styles.productResultItemText}>Loading ...</Text>
                </View> : searchResults.length === 0 ? <View style={{marginBottom: 10}}></View> : (<View style={styles.productResultsContainer}>{searchResults.map((item, index) => (
                    <TouchableOpacity style={styles.productResultsItemContainer}
                                      onPress={() => {
                                          localStorage.setItem('productCode', item.barcode);
                                          navigation.navigate('Product');}}
                    key={index}>
                        <Text style={styles.productResultItemText}>{item.name}</Text>
                    </TouchableOpacity>
                ))}</View>)
            }
        </View>

    );
}
