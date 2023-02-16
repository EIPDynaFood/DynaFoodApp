import {Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useState, useEffect} from "react";
import {FAB, Icon, Button} from "react-native-elements";
import {RequireJwt} from "../components/RequireJwt";
import { styles } from "../styles/Style";
import useLang from "../../Language";
import {ScrollView} from "react-native-gesture-handler";
import ProductItem from "../components/ProductItem";
import axios from "axios";
import {endpoint} from "../../config";
import _ from "lodash";
import translations from "../../translations/screens/Login.json";
import qs from "qs";
import ShoppingList from "../components/ShoppingList";

export default function ShoppingOverview({ navigation, route }) {
    const translations = require("../../translations/screens/ShoppingOverview.json")
    const {lang} = useLang();
    const [listData, setListData] = useState(null)

    const [modalVisible, setModalVisible] = useState(false);
    const [listName,setListName]= useState("");

    useEffect(() => {
        axios.get(endpoint + 'shoppingList').then((res) => {
            if (!_.isEqual(res.data, listData)) {
                setListData(res.data);
            }
        }).catch((err) => {
            console.log('catch');
            alert(translations["Error"][lang] + err.message);
            console.log(err);
        });
    }, [listData]);

    function createList() {
        var qs = require('qs');
        var data = qs.stringify({
            'name': `${listName}`
        });
        var config = {
            method: 'post',
            url: endpoint + 'shoppingList',
            data : data
        };
        axios(config).then((res) => {
            setListData({"elements":[], "update":true});
            setListName("")
        }).catch((err) => {
            console.log('catch');
            alert(translations["Error"][lang] + err.message);
            console.log(err);
        });
    }

    return (
        <RequireJwt>
            <Modal animationType="slide"
                   transparent={true}
                   visible={modalVisible}
                   onRequestClose={() => {
                       setModalVisible(!modalVisible);
                   }}>
                <View style={styles.centeredView}>
                    <View style={[styles.modalView, {height: "35%"}]}>
                        <Text style={[styles.tableHeadTextStyle, {fontSize: 20, fontWeight: "bold"}]}>{translations["TextHeadline"][lang]}</Text>
                        <TextInput
                            placeholder={translations["TextPlaceholder"][lang]}
                            style={styles.input}
                            onChangeText={setListName}
                            value={listName}
                        />
                        <Button
                            title={translations["ModalButton"][lang]}
                            buttonStyle={styles.primaryButtonStyle}
                            titleStyle={{color:"white", flex:1}}
                            onPress={() => {
                                createList()
                                setModalVisible(false);
                            }}
                        />
                    </View>
                </View>
            </Modal>
            <View style={StyleSheet.absoluteFillObject}>
                <View style={{flex: 1}}>
                    {listData === null ? (<FAB color="grey" size="small" loading/>) : (
                        (listData.elements.length === 0) ? (
                            <View style={styles.productHistory}>
                                <TouchableOpacity style={styles.productItem} onPress={() => {setModalVisible(true)}}>
                                    <View style={{marginLeft: 10, width: '60%'}}>
                                        <Text
                                            numberOfLines={1}
                                            style={{fontSize: 21, fontWeight: 'bold'}}>{translations["New"][lang] }</Text>
                                    </View>
                                    <View style={{flex: 1, flexDirection: 'row-reverse', alignItems: 'center'}}>
                                        <Icon name='reorder' iconStyle={{transform: [{rotate: '90deg'}]}}/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <ScrollView style={styles.productHistory}>
                                {listData.elements.map((product) => <ShoppingList
                                    key={product.listid}
                                    name={product.listname}
                                    listId={product.listid}
                                    update={setListData}
                                />)}
                            </ScrollView>
                        ))}
                </View>
                <FAB
                    color="black"
                    icon={{name: 'add', color: 'white'}}
                    style={styles.FABStyle}
                    onPress={() => {
                        setModalVisible(true)
                    }}
                />
            </View>
        </RequireJwt>
    );
}
