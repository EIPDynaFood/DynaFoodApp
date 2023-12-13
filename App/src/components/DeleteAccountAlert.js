import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import useLang from "../../Language";

const DeleteAccountAlert = ({ visible, onCancel, onConfirm }) => {
    const {lang} = useLang()
    const translations = require("../../translations/components/DeleteAccountAlert.json")


  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.container}>
        <View style={styles.alert}>
          <Text style={styles.title}>{translations["Title"][lang]}</Text>
          <Text style={styles.message}>{translations["Question"][lang]}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onCancel}>
              <Text style={styles.buttonTextCancel}>{translations["Cancel"][lang]}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onConfirm}>
              <Text style={styles.buttonTextConfirm}>{translations["Confirm"][lang]}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alert: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    marginLeft: 10,
    paddingVertical: 10,
  },
  buttonTextConfirm: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DB3A34',
  },
  buttonTextCancel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#376D55',
  },
});

export default DeleteAccountAlert;
