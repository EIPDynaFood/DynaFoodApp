import {useNavigation} from "@react-navigation/native";
import axios from "axios";
import {Modal, Text, TextInput, View} from "react-native";
import {Button, Icon, CheckBox} from "react-native-elements";
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
    const [checked, setChecked] = useState(props.checked)
    const [modalVisible, setModalVisible] = useState(false)
    const deleteItem = () => {
        axios.delete(endpoint + 'shoppingList/item', {headers: {}, data: {'itemid': `${props.itemId}`}}).then((res) => {
            props.update({"elements":[], "update":true})
        }).catch((err) => {
            console.log('catch');
            alert(translations["Error"][lang] + err.message);
            console.log(err);
        });
    };

    const editItem = (done) => {
        var qs = require('qs');
        var data = qs.stringify({
            'itemname': `${itemName}`,
            'check': `${done}`,
            'itemid': `${props.itemId}`
        });
        console.log(itemName);
        console.log(checked);
        console.log(props.itemId);
        var config = {
            method: 'patch',
            url: endpoint + 'shoppingList/item',
            data : data
        };
        axios(config).then((res) => {
            props.update({"elements":[], "update":true});
            setItemName(props.name);
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
                            onChangeText={setItemName}
                            value={itemName}
                        />
                        <Button
                            title={translations["ModalButton"][lang]}
                            buttonStyle={styles.primaryButtonStyle}
                            titleStyle={{color:"white", flex:1}}
                            onPress={() => {
                                editItem(checked)
                                setModalVisible(false);
                            }}
                        />
                    </View>
                </View>
            </Modal>
            <View style={styles.shoppingList}>
                <CheckBox
                    checked={checked}
                    onPress={() => {setChecked(!checked); editItem(!checked)}}
                    checkedColor={"#2E4D44"}
                    containerStyle={{padding: 0}}
                />
                {checked ?
                    <Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontSize: 21, fontWeight: 'bold'}}>
                        {props.name}
                    </Text>
                    : <Text
                    numberOfLines={1}
                    style={{fontSize: 21, fontWeight: 'bold'}}>{props.name}</Text>}
                <View style={{flexDirection: "row"}}>
                    <Icon containerStyle={{marginRight: 15}} name='edit' onPress={() => setModalVisible(true)}/>
                    <Icon name='delete' onPress={deleteItem}/>
                </View>
            </View>
        </>
    );
}