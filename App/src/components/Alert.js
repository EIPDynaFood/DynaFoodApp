import React from "react";
import { styles } from "../styles/Style";
import {Modal, Text, View} from "react-native";
import {Button} from "react-native-elements";
import {MaterialIcons} from "@expo/vector-icons";
import useLang from "../../Language";

export function Alert(props) {
    const translations = require("../../translations/components/Alert.json")
    const {lang} = useLang();

  return (
      <Modal animationType="fade"
             transparent={true}
             visible={props.visible}
             onRequestClose={() => {
                 props.setModalVisible(false);
             }}
             statusBarTranslucent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
              <MaterialIcons name="warning" size={32} color="#DB3A34" />
              <Text style={[styles.tableHeadTextStyle, {fontSize: 20, fontWeight: "bold"}]}>{translations["Warning"][lang]}</Text>
            <Text>{props.message}</Text>
              <Button
                  title={translations["Button"][lang]}
                  buttonStyle={styles.primaryButtonStyle}
                  titleStyle={{color:"white", flex:1}}
                  onPress={() => {
                      props.setModalVisible(false);
                  }}
              />
          </View>
        </View>
      </Modal>
  );
}
