import { View } from "native-base";
import React from "react";
import AwesomeAlert from "react-native-awesome-alerts";

const Alert = (props) => {
    return(
        <View>
            <AwesomeAlert
                show={props.isAlert}
                showProgress={false}
                title={props.title}
                message={props.message}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                confirmButtonColor="FF0000"
                confirmText={props.confText}
                />
        </View>
    );
}

export default Alert;