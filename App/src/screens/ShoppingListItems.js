import {Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useState, useEffect} from "react";
import {RequireJwt} from "../components/RequireJwt";
import { styles } from "../styles/Style";

export default function ShoppingListItems() {
    const [list, setList] = useState(JSON.parse(localStorage.getItem("shoppingList")))

    return (
        <RequireJwt>
            <View>
                <Text style={styles.text}>Name: {list.name}</Text>
                <Text style={styles.text}>ID: {list.listId}</Text>
            </View>
        </RequireJwt>
    );
}
