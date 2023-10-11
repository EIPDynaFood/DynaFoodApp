import axios from "axios";
import {Modal, Text, TextInput, View} from "react-native";
import {Button, Icon, CheckBox} from "react-native-elements";
import React, {useState} from "react";
import { styles } from "../styles/Style";
import useLang from "../../Language";
import { endpoint } from '../../config';
import APIRoute from "../../API";


export default function ShoppingItem(props) {
    const translations = require("../../translations/components/ShoppingItem.json")
    const {lang} = useLang()

    const [itemName, setItemName] = useState(props.name)
    const [checked, setChecked] = useState(props.checked)
    const [modalVisible, setModalVisible] = useState(false)
    const deleteItem = () => {
        APIRoute(() => axios.delete(endpoint + 'shoppingList/item', {headers: {}, data: {'itemid': `${props.itemId}`}}).then(() => {
            const newItem = [...props.list]
            newItem.splice(props.list.indexOf(props.product), 1);
            props.update({"elements": newItem})
        }).catch((err) => {
            if (err.response.status === 401)
                throw(err)
            alert(translations["Error"][lang] + err.message);
            console.log(err);

        }));
    };

    const editItem = (done) => {
        var qs = require('qs');
        var data = qs.stringify({
            'itemname': `${itemName}`,
            'check': `${done}`,
            'itemid': `${props.itemId}`
        });
        var config = {
            method: 'patch',
            url: endpoint + 'shoppingList/item',
            data : data
        };
        APIRoute(() => axios(config).then(() => {
            props.update({"elements":[...props.list], "update":true});
            setItemName(props.name);
        }).catch((err) => {
            if (err.response.status === 401)
                throw(err)
            alert(translations["Error"][lang] + err.message);
            console.log(err);
        }));
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