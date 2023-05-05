import {Text} from "react-native";
import React, {useState} from "react";

export function AdjustLabel(props) {
  const [currentFontSize, setCurrentFontSize] = useState(props.fontSize);
  return (
      <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={[props.style, {fontSize: currentFontSize}]}
          onTextLayout={(e) => {
            const {lines} = e.nativeEvent;
            if (lines.length > 1) {
              setCurrentFontSize(currentFontSize - 1);
            }
          }}
      >
        {props.text}
      </Text>
  );
}
