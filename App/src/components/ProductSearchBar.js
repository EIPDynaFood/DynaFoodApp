import {Text, View, FlatList, TextInput, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import { endpoint } from '../../config';
import axios from "axios";
import { styles } from "../styles/Style";
import {SearchBar} from "react-native-elements";

export function ProductSearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (text) => {
        setSearchQuery(text);
        if (text !== "") {
            axios.get(endpoint + `searchProduct?value=${text}&count=5`).then((res) => {
                    console.log(res.data)
                    setSearchResults(res.data)
                }
            ).catch((err) =>
                console.log(err)
            )
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
            <FlatList
                data={searchResults}
                renderItem={({ item }) => (
                    <TouchableOpacity>
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.barcode}
            />
        </View>

    );
}
