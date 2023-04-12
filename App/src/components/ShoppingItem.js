import {useNavigation} from "@react-navigation/native";
import { CheckBox } from 'react-native-elements'
import axios from "axios";
import {Modal, Text, TextInput, View} from "react-native";
import {Button, Icon} from "react-native-elements";
import React, {useState} from "react";
import { styles } from "../styles/Style";
import useLang from "../../Language";
import { endpoint } from '../../config';
import qs from "qs";
import translations from "../../translations/components/ShoppingItem.json";

export default function ShoppingItem(props) {
    const translations = require("../../translations/components/ShoppingItem.json")
    const {lang} = useLang()

    const [itemName, setItemName] = useState(props.name)
    const [modalVisible, setModalVisible] = useState(false)
    const deleteList = () => {
        var qs = require('qs');
        var data = qs.stringify({
            'itemid': `${props.itemID}`
        });
        var config = {
            method: 'delete',
            url: endpoint + 'shoppingList/item',
            data : data
        };
        axios(config).then((res) => {
            props.update({"elements":[], "update":true})
        }).catch((err) => {
            console.log('catch');
            alert(translations["Error"][lang] + err.message);
            console.log(err);
        });
    };

    const editList = () => {
        var qs = require('qs');
        var data = qs.stringify({
            'name': `${itemName}`,
            'listid': `${props.listId}`
        });
        var config = {
            method: 'patch',
            url: endpoint + 'shoppingList',
            data : data
        };
        axios(config).then((res) => {
            props.update({"elements":[], "update":true})
        }).catch((err) => {
            console.log('catch');
            alert(translations["Error"][lang] + err.message);
            console.log(err);
        });
    };

    return (<>
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
                            onChangeText={setListName}
                            value={listName}
                        />
                        <Button
                            title={translations["ModalButton"][lang]}
                            buttonStyle={styles.primaryButtonStyle}
                            titleStyle={{color:"white", flex:1}}
                            onPress={() => {
                                editList()
                                setModalVisible(false);
                            }}
                        />
                    </View>
                </View>
            </Modal>
            <View style={styles.shoppingList}>
                <CheckBox
                    title={itemName}
                    checked={this.state.checked}
                    checkedColor={"#2E4D44"}
                />
                <View style={{flexDirection: "row"}}>
                    <Icon containerStyle={{marginRight: 15}} name='edit' onPress={() => setModalVisible(true)}/>
                    <Icon name='delete' onPress={deleteList}/>
                </View>
            </View>
        </>
    );
}