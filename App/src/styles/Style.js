import { StyleSheet, Dimensions } from 'react-native';

const deviceWidth = Math.round(Dimensions.get('window').width) - 80
export const styles = StyleSheet.create({
  alertIcon:{
    marginTop: 15,
    marginLeft: "45%",
    marginRight: "40%"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  androidBackdrop: {
    backgroundColor: "#232f34",
    opacity: 0.4
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  alertBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  androidAlertBox: {
    maxWidth: 280,
    width: '100%',
    margin: 48,
    elevation: 24,
    borderRadius: 8,
  },
  androidTitle: {
    margin: 24,
  },
  androidMessage: {
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24,
  },
  androidButtonGroup: {
    marginTop: 0,
    marginLeft:"40%",
    marginRight: "40%",
    marginBottom: 8,

  },
  androidButton: {
    marginTop: 12,
    marginRight: 8,
  },
  androidButtonInner: {
    padding: 10,

  },
    cameraOne:{
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
    },
    secondaryButtonStyle: {
        width:"50%",
        borderRadius:10,
        backgroundColor:"#FFF",
        borderWidth:3,
        borderColor:"#2E4D44",
    },
    primaryButtonStyle: {
        marginTop:10,
        width:"50%",
        borderRadius:10,
        backgroundColor:"#2E4D44",
    },
    loginAsGuest: {
        width:"50%",
        borderRadius:10,
        backgroundColor:"#2E4D44",
        borderColor:"#2E4D44",
        left: 170,
    },
    registerLoginLogo: {
        width: 270,
        height: 150,
        marginBottom:50
    },
    cameraTwo: {
        width: "70%",
        aspectRatio: 2,
        borderColor: "white",
        borderWidth: 2,
        borderStyle: "dashed",
        borderRadius: 10,
    },
    productItem: {
        backgroundColor: '#fff',
        flexDirection: "row",
        padding: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10
    },
    shoppingList: {
        backgroundColor: '#fff',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
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
        justifyContent: 'center',
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
        // flexDirection: "row",
        // justifyContent: 'space-between',
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
        paddingBottom: 20,
        textAlign: "center",
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
    textInfo:{
        color:'#696969',
        fontWeight:'500',
        fontSize:24,
        maxWidth: '80%'
    },
    forgotpwd:{
        color:"#2E4D44",
        fontWeight:'300',
        fontSize:10,
        paddingLeft: 130
    },
    forgotpwdtxt:{
        color:"#2E4D44",
        fontWeight:'600',
        fontSize:20,
        paddingHorizontal: 30
    },
    alertButton:{
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
    passwordView: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center",
    },
    inputPassword: {
        width: "60%",
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
      },
      ecoScoreStyle: {
        marginRight: 16,
        width: 180,
        height: 97.5,
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
        top: 0,
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
      headlineStyle: {
        fontSize: 21,
        fontWeight: 'bold',
        padding: 5,
      },
      trendBar: {
        paddingLeft: "5%",
        width: 'auto',
        height: 170,
      },
    searchBarContainer: {
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        borderWidth: 0,
        paddingBottom: 0,
    },
      searchBar: {
        alignSelf: 'center',
          paddingLeft: 10,
          width:"90%",
          height:40,
          backgroundColor:"#FFF",
          borderRadius: 25,
          borderWidth:3,
          borderBottomColor:"#2E4D44",
          borderBottomWidth:3,
          borderColor:"#2E4D44",
          marginBottom: 0
    },
    productResultsContainer: {
        alignSelf: 'center',
        width: '78%',
        height: 'auto',
        backgroundColor: 'white',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 10,
    },
    productResultsItemContainer: {
        padding: 10,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    productResultItemText: {
        fontSize: 16,
    },
    FABStyle: {
        position: "absolute",
        bottom: 16,
        right: 16
    },
    multilineInput: {
        width: "90%",
        height: 400,
        margin: 12,
        borderWidth: 1,
        borderColor: "lightgrey",
        borderRadius: 5,
        textAlign: "left",
        textAlignVertical: "top",
        padding: 20,
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: "auto",
        width: "80%"
      },
      buttonModal: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonClose: {
        backgroundColor: '#376D55',
        alignSelf: "flex-end"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      dropdown: {
        position: 'absolute',
        backgroundColor: '#fff',
        width: '100%',
        shadowColor: '#000000',
        shadowRadius: 4,
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.5,
      },
      radioButton: {
        alignItems: "center",
        marginBottom: 50
      },
      radioButtonText: {
        padding: 10,
        fontSize: 20,
      },
    sliderContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sliderLabel: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    slider: {
        width: '80%',
    },
    allergenSelectedContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        marginTop: 12,
    },
    allergenSelectedWordContainer: {
        backgroundColor: '#376D55',
        borderRadius: 10,
        padding: 5,
        margin: 5,
        flexDirection: "row",
    },
    allergenSelectedWord: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white'
    }
})