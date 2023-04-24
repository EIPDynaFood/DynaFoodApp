import {Text, View, FlatList, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import { endpoint } from '../../config';
import axios from "axios";
import { styles } from "../styles/Style";
import {SearchBar} from "react-native-elements";
import {useNavigation} from "@react-navigation/native";

export function ProductSearchBar() {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false)

    const handleSearch = (text) => {
        setSearchQuery(text);
        console.log('"' + text + '"')
        if (text.length > 1) {
            setLoading(true)
            console.log("fetch")
            axios.get(endpoint + `searchProduct?value=${text}&count=5`).then((res) => {
                    if (text !== "")
                        setSearchResults(res.data)
                    else
                        setSearchResults([])

                }
            ).catch((err) =>
                console.log(err)
            ).finally(() => setLoading(false))
        } else {
            console.log("clear")
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
                </View> : searchResults.length === 0 ? <></> : <FlatList
                style={styles.productResultsContainer}
                data={searchResults}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.productResultsItemContainer}
                                      onPress={() => {
                                          localStorage.setItem('productCode', item.barcode);
                                          navigation.navigate('Product');}}>
                        <Text style={styles.productResultItemText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.barcode}
            />}
        </View>

    );
}
