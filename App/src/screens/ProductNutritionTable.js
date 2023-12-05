import {Text, View, FlatList} from "react-native";
import React from "react";
import { Divider } from "react-native-elements";
import { styles } from "../styles/Style";
import useLang from "../../Language";


export default function ProductNutritionTable({route}) {
  const {productData} = route.params;

  const translations = require("../../translations/screens/ProductNutritionTable.json")
  const {lang} = useLang();

  let arr = Object.entries(productData["nutriments_g_pro_100g"])

  const getColor = (color) => {
      switch (color) {
          case 0:
              return "#D93636";
          case 1:
              return "#E6B82F";
          case 2:
              return "#3E8D6F";
              default:
                  return "#000000";

      }
    }

    return (
        <View style={styles.wrapperStyleTable}>
          <View style={styles.tableHeadStyleTable}>
            <Text style={styles.tableHeadTextStyleTable}>{translations["Nutriments"][lang]}</Text>
            <Text style={styles.tableHeadTextStyleTable}>{translations["Unit"][lang]}</Text>
          </View>
          <View style={styles.mainContainerStyle}>
            <FlatList data={arr}
                      keyExtractor={item => item[0]}
                      renderItem={(({item}) =>
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                          <Text style={styles.nutrimentsTextStyle}>{item[1]["name"]}</Text>
                          <Text style={[
                              styles.valuesTextStyle,
                              { color: item[1]["color"] ? getColor(item[1]["color"]) : "#000000" },
                          ]}>{item[1]["score"]}</Text>
                        </View>)}
                      ItemSeparatorComponent={(() => <Divider/>)}/>
          </View>
        </View>
  );
}
