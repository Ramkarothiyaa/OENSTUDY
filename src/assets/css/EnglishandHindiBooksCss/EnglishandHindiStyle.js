import {StyleSheet, Dimensions} from 'react-native';
import { Colors } from '../../config/Colors';
import { FontFamily } from '../../fonts/FontFamily';
import { FontSize } from '../../fonts/Fonts';
const {width,height} = Dimensions.get('window');

const styles = StyleSheet.create({
  bg: {flex: 1},
  container: {
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop:5
  },

  Contanier:{
    width: width * 0.92,
    margin: 4,
    padding: 15,
    alignItems: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: '#E9E9E9',
    borderWidth: 0.5,
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  Img:{
    width:width * 0.2, height:height*0.1 
  },
  MT5:{
    marginTop: 10
  },
  head:{
    fontSize:  FontSize.labelText3,
    fontStyle:FontFamily.PopinsRegular,
    fontWeight:'700'
  },
  txt:{
    fontSize:  FontSize.labelText3,
    fontStyle:FontFamily.PopinsRegular,
  },


  contentContainerStyle:{
    width:width*0.944, justifyContent:"flex-start", 
  },
  adsContainer: {
    width:width *0.95,
    justifyContent:"center",
    alignSelf:"center",
    borderRadius:10
  },
  MT10:{
    marginTop: 10
  },
  touchview: {
    // width: width,
    position: 'absolute',
    bottom: 0,
    height: 60,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    backgroundColor: 'transparent'
  },

  mainView: {
    margin: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: 50,
    borderWidth: 1
  },
 
  
});

export {styles};
