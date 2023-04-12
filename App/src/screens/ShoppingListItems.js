import {Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useState, useEffect} from "react";
import {RequireJwt} from "../components/RequireJwt";
import { styles } from "../styles/Style";
import useLang from "../../Language";
import axios from "axios";
import {endpoint} from "../../config";
import _ from "lodash";
import {Button, FAB, Icon} from "react-native-elements";
import {ScrollView} from "react-native-gesture-handler";
import ShoppingItem from "../components/ShoppingItem";

export default function ShoppingListItems() {
    const translations = require("../../translations/screens/ShoppingListItems.json")
    const {lang} = useLang();
    const [list] = useState(JSON.parse(localStorage.getItem("shoppingList")))
    const [listData, setListData] = useState(null)

    const [modalVisible, setModalVisible] = useState(false);
    const [itemName,setItemName]= useState("");

    useEffect(() => {
        console.log(list);
        axios.get(endpoint + 'shoppingList/item?listid=' + list.listId).then((res) => {
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
            'name': `${listName}`,
            'shoppingList': `${list}`,
        });
        var config = {
            method: 'post',
            url: endpoint + 'shoppingList/item',
            data : data
        };
        axios(config).then(() => {
            setListData({"elements":[], "update":true});
            setItemName("")
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
                   }}
                   statusBarTranslucent={true}>
                <View style={styles.centeredView}>
                    <View style={[styles.modalView, {height: "35%"}]}>
                        <Text style={[styles.tableHeadTextStyle, {fontSize: 20, fontWeight: "bold"}]}>{translations["TextHeadline"][lang]}</Text>
                        <TextInput
                            placeholder={translations["TextPlaceholder"][lang]}
                            style={styles.input}
                            onChangeText={setItemName}
                            value={itemName}
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
                                        <Icon name='add' iconStyle={{transform: [{rotate: '90deg'}]}}/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <ScrollView style={styles.productHistory}>
                                {listData.elements.map((product) => <ShoppingItem
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
