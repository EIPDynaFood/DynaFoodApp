import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { styles } from "../styles/Style";
import axios from "axios";
import {endpoint} from "../../config";
import useLang from "../../Language";
import {Icon} from "react-native-elements";
import APIRoute from "../../API";

export default function AllergenSearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const translations = require("../../translations/components/AllergenSearchBar.json")
    const {lang} = useLang()
    let _ = require("lodash")


    useEffect(() => {
        const config = {
            method: 'get',
            url: endpoint + 'settings'
        };
        APIRoute(() => axios(config)
            .then(function (response) {
                if (response.status === 204) {
                    setSelectedItems([])
                } else {
                    if (!_.isEqual(response.data, selectedItems))
                        setSelectedItems(response.data)
                }
            })
            .catch(function (error) {
                if (error.response.status === 401)
                    throw(error)
                alert(translations["ErrorAllergen"][lang] + '\n' + error.response.data.Error);
                console.log(error);

            }));
    }, [selectedItems]);


    const handleSearch = (text) => {
        setSearchQuery(text);
        APIRoute(() => axios.get(endpoint + `searchAllergen?name=${text.toLowerCase()}&language=${lang}`).then((res) => {
            setSearchResults(res.data)
        }).catch((error) => {
            if (error.response.status === 401)
                throw(error)
            alert(translations["ErrorAllergen"][lang] + '\n' + error.response.data.Error);
        }))
    };

    const handleFocus = () => {
        APIRoute(() => axios.get(endpoint + `searchAllergen?name=&language=${lang}`).then((res) => {
            setSearchResults(res.data)
        }).catch((error) => {
            if (error.response.status === 401)
                throw(error)
            alert(translations["ErrorAllergen"][lang] + '\n' + error.response.data.Error);
        }))
    };

    const handleSelectItem = (item) => {
        const index = selectedItems.findIndex((i) => i.restrictionname === item);
        if (index === -1) {
            let qs = require('qs')
            let data = qs.stringify({
                'alertActivation': `${true}`,
                'restrictionName': `${item}`,
                'strongness': `${2}`
            })
            const config = {
                method: 'post',
                url: endpoint + 'settings',
                data: data,
            };
            APIRoute(() => axios(config)
                .then(function (response) {
                    setSelectedItems([...selectedItems, item]);
                    setSearchQuery("");
                    setSearchResults([]);
                })
                .catch(function (error) {
                    if (error.response.status === 401)
                        throw(error)
                    alert(translations["ErrorSet"][lang] + '\n' + error.response.data.Error);
                    console.log(error);
                }));
        } else {
            APIRoute(() => axios.delete(endpoint + "settings", {headers: {}, data: {'restrictionName': `${item}`}})
                .then(function (response) {
                    const newSelectedItems = [...selectedItems];
                    newSelectedItems.splice(index, 1);
                    setSelectedItems(newSelectedItems);
                    setSearchQuery("");
                    setSearchResults([]);
                })
                .catch(function (error) {
                    if (error.response.status === 401)
                        throw(error)
                    alert(translations["ErrorSet"][lang] + '\n' + error.response.data.Error);
                    console.log(error);
                }));
        }
    };

    return (
        <View style={[styles.searchBarContainer, {width: "100%"}]}>
            <TextInput
                style={[styles.searchBar, {width: "100%"}]}
                placeholder="Search..."
                value={searchQuery}
                onChangeText={handleSearch}
                onFocus={handleFocus}
            />
            <TouchableOpacity style={{position: "absolute", top: 8, right: 25}} onPress={() => {setSearchQuery(""); setSearchResults([])}}>
                <Icon name={"close"}/>
            </TouchableOpacity>
            {searchResults.length === 0 ? <></> : <View style={styles.productResultsContainer}>{searchResults.map((result) => (
                <TouchableOpacity key={result}
                                  style={[styles.productResultsItemContainer]}
                                  onPress={() => handleSelectItem(result)}
                >
                    <Text style={styles.productResultItemText}>{result.charAt(0).toUpperCase() + result.slice(1)}</Text>
                </TouchableOpacity>))}</View>}
            <View style={styles.allergenSelectedContainer}>
                {selectedItems.filter((result) => {return ["vegan", "vegetarian"].includes(result.restrictionname) == false}).map((item, index) => (
                    <TouchableOpacity key={index.toString()} style={styles.allergenSelectedWordContainer} onPress={() => handleSelectItem(item.restrictionname)}>
                        <Text style={styles.allergenSelectedWord}>{item.restrictionname}</Text>
                        <Icon name="close" type="material" color="white" size={12} style={{paddingTop: 2}}/>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}
