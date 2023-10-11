import {Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback } from "react-native";
import React, {useState, useEffect} from "react";
import {FAB, Icon, Button} from "react-native-elements";
import { styles } from "../styles/Style";
import useLang from "../../Language";
import {ScrollView} from "react-native-gesture-handler";
import axios from "axios";
import {endpoint} from "../../config";
import _ from "lodash";
import ShoppingList from "../components/ShoppingList";
import LoadingSpinner from "../components/LoadingSpinner";
import APIRoute from "../../API";


export default function ShoppingOverview() {
    const translations = require("../../translations/screens/ShoppingOverview.json")
    const {lang} = useLang();
    const [listData, setListData] = useState(null)

    const [modalVisible, setModalVisible] = useState(false);
    const [listName,setListName]= useState("");

    useEffect(() => {
        APIRoute(() => axios.get(endpoint + 'shoppingList').then((res) => {
            if (!_.isEqual(res.data, listData)) {
                setListData(res.data);
            }
        }).catch((err) => {
            if (err.response.status === 401)
                throw(err);
            alert(translations["Error"][lang] + err.message);
            console.log(err);
        }));
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
        axios(config).then(() => {
            setListData({elements:[...listData.elements, listName]});
            setListName("")
        }).catch((err) => {
            if (err.response.status === 401)
                throw(err);
            alert(translations["Error"][lang] + err.message);
            console.log(err);
        });
    }

    return (
        <>
            <Modal animationType="fade"
                   transparent={true}
                   visible={modalVisible}
                   onRequestClose={() => {
                       setModalVisible(!modalVisible);
                   }}
                   statusBarTranslucent={true}>
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
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
                </TouchableWithoutFeedback>
            </Modal>
            <View style={StyleSheet.absoluteFillObject}>
                <View style={{alignSelf: 'center', width: '90%', flex: 1}}>
                    {listData === null ? (<LoadingSpinner/>) : (
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
                                {listData.elements.map((product) => <ShoppingList
                                    key={product.listid}
                                    name={product.listname}
                                    list={listData.elements}
                                    element={product}
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
        </>
    );
}
