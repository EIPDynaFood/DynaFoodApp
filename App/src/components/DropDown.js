import React, { useState, useRef } from 'react';
import { styles } from "../styles/Style";
import { Text, TouchableOpacity, Modal, View, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';

//  this is not 100% working, if you wnat ot use it, you have to improve it

export const Dropdown = ({ label, data, onSelect }) => {
    const [visible, setVisible] = useState(false);
    const DropdownButton = useRef();
    const [dropdownTop, setDropdownTop] = useState(0);
    const [selected, setSelected] = useState(undefined);

    const toggleDropdown = () => {
      visible ? setVisible(false) : openDropdown();
    };

    const openDropdown = () => {
        DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
          setDropdownTop(py + h);
        });
        setVisible(true);
      };
    
    const renderItem = ({ item }) => { return (
    <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
        <Text>{item.label}</Text>
    </TouchableOpacity>
    );
    }

    const onItemPress = (item) => {
        setSelected(item);
        onSelect(item);
        setVisible(false);
    };
    
    const renderDropdown = () => {
        return (
          <Modal visible={visible} transparent animationType="none">
            <TouchableOpacity
              style={styles.overlay}
              onPress={() => setVisible(false)}
            >
              <View style={[styles.dropdown, { top: dropdownTop }]}>
                <FlatList
                  data={data}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </TouchableOpacity>
          </Modal>
        );
      };
  
    return (
      <TouchableOpacity
      ref={DropdownButton}
        style={styles.button}
        onPress={toggleDropdown}
      >
        {renderDropdown()}
        <Text style={styles.buttonText}>{label}</Text>
        <Icon type='font-awesome' name='chevron-down'/>
      </TouchableOpacity>
    );
  }