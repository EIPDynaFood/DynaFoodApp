import { StyleSheet, Dimensions } from 'react-native';

const deviceWidth = Math.round(Dimensions.get('window').width) - 80
export const styles = StyleSheet.create({
    cameraOne:{
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
    },
    cameraTwo: {
        width: "70%",
        aspectRatio: 2 / 1,
        borderColor: "white",
        borderWidth: 2,
        borderStyle: "dashed",
        borderRadius: 10,
    },
    productItem: {
        backgroundColor: '#fff',
        flexDirection: "row",
        marginTop: 10,
        padding: 10,
        borderRadius: 10
    },
    productHistory: {
        flex: 1,
        width: '100%',
        alignSelf: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imagineStyle: {
        height: 100,
        width: deviceWidth,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        opacity: 0.9,
        alignContent: 'center',
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    wrapperStyle: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 30,
        paddingBottom: 90,
        backgroundColor: "#E2E6DB",
        },
    mainContainerStyle: {
        backgroundColor: "#FFFFFF",
        height: "100%",
        flexDirection: "row",
        justifyContent: 'space-between',
        },
    tableHeadStyle: {
        fontSize: 20,
        paddingBottom: 30,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'space-between',
        backgroundColor: "rgba(255,255,255,0.7)",
        height: 50,
        paddingTop: 30,
        },
    tableHeadTextStyle: {
        color: "rgba(0,0,0,0.6)",
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 15,
        fontSize: 30,
        paddingBottom: 20
        },
    nutrimentsTextStyle: {
        padding: 15,
        },
    valuesTextStyle: {
        padding: 15,
        textAlign: "right",
        },
    screen:{
        flex:1,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#00000025',
    },
    text:{
        color:'#000',
        fontWeight:'700',
        fontSize:30
    },
    button:{
        backgroundColor:'#fff',
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    buttonText:{
        color:'#fff',
        fontSize:25
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    input: {
        width: "70%",
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: "lightgrey",
        borderRadius: 5,
    },
    containerRegister: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
    },
    nutriScoreStyle: {
        height: 97.5,
        width: 180,
        marginLeft: 10,
        bottom: 130
      },
      ecoScoreStyle: {
        marginRight: 16,
        bottom: 130,
        width: 180,
        height: 97.5,
      },
      headlineStyle: {
        position: "absolute",
        top: 140,
        left: 16,
        fontSize: 40,
        color: "rgba(255,255,255,1)"
      },
      ingredientStyle: {
        padding: 16,
        color: "rgba(0,0,0,0.6)"
      },
      bottomContainer: {
        flexDirection: "row",
        flex: 1,
      },
      gradientStyle: {
        backgroundColor: "transparent",
        position: "absolute",
        top: 0,
        width: "100%",
        height: 200,
      },
      wrapperStyleInfo: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 16,
        backgroundColor: "#E2E6DB",
      },
      mainContainerStyleInfo: {
        backgroundColor: "#FFFFFF",
        height: "100%",
        top: 200,
        justifyContent: 'space-between',
      },
      imageStyleInfo: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        position: "absolute",
        top: 0,
        resizeMode: "cover",
        width: "100%",
        height: 200,
      },
      wrapperStyleTable: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        backgroundColor: "#E2E6DB",
      },
      tableHeadStyleTable: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'space-between',
        backgroundColor: "rgba(255,255,255,0.7)",
        height: 50,
        flexDirection: "row",
      },
      tableHeadTextStyleTable: {
        color: "rgba(0,0,0,0.6)",
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
      },
})