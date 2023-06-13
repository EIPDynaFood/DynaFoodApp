import {useNavigation} from "@react-navigation/native";
import axios from "axios";
import {Modal, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Button, Icon} from "react-native-elements";
import React, {useState} from "react";
import { styles } from "../styles/Style";
import useLang from "../../Language";
import { endpoint } from '../../config';

export default function ShoppingList(props) {
    const navigation = useNavigation();
    const translations = require("../../translations/components/ShoppingList.json")
    const {lang} = useLang()

    const [listName, setListName] = useState(props.name)
    const [modalVisible, setModalVisible] = useState(false)
    const deleteList = () => {
        axios.delete(endpoint + 'shoppingList?listid=' + props.listId).then(() => {
            const newList = [...props.list]
            newList.splice(props.list.indexOf(props.product), 1);
            props.update({"elements": [...props.list], "update": true})
        }).catch((err) => {
            console.log('catch');
            alert(translations["Error"][lang] + err.message);
            console.log(err);
        });
    };

    const editList = () => {
        var qs = require('qs');
        var data = qs.stringify({
            'name': `${listName}`,
            'listid': `${props.listId}`
        });
        var config = {
            method: 'patch',
            url: endpoint + 'shoppingList',
            data : data
        };
        axios(config).then(() => {
            props.update({"elements":[...props.list], "update":true})
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
                <TouchableOpacity onPress={() => {
                    console.log("Open list: " + props.listId)
                    localStorage.setItem("shoppingList", JSON.stringify(props));
                    navigation.navigate("ShoppingListItems")
                }} style={{flexGrow: 3}}>
                    <View>
                        <Text
                        numberOfLines={1}
                        style={{fontSize: 21, fontWeight: 'bold'}}>{props.name}</Text>
                    </View>
                </TouchableOpacity>
                <View style={{flexDirection: "row"}}>
                <Icon containerStyle={{marginRight: 15}} name='edit' onPress={() => setModalVisible(true)}/>
                <Icon name='delete' onPress={deleteList}/>
                </View>
        </View>
        </>
    );
}