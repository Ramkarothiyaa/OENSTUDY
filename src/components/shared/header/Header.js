import React, { useEffect, useState } from 'react';
import {
  Image,
  StatusBar,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { MyThemeClass } from '../../Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import CIcon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../../../assets/css/HeaderCss/HeaderStyle'
import { store } from '../../../../App';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { getAppLogoAsync } from '../../../repository/CommonRepository';
import { getProfileInfo } from '../../../repository/ProfileRepository/EditProfileRepo';


const { width } = Dimensions.get('screen');

export default function Header(props) {
  const navigation = useNavigation();
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const [appLogoAsync, setAppLogoAsync] = useState('');
  const [data, setData] = useState({});

  useEffect(() => {
    async function temp() {
      try {
        var userData = await getAppLogoAsync();

        if (userData == null || userData == '' || userData == undefined) {
          setAppLogoAsync('')
        } else {

          setAppLogoAsync(userData);
        }
      } catch (e) {
        setAppLogoAsync('')
      }
    }
    temp()
    handleUserData();
  }, [props]);




  const handleUserData = async () => {
    try {
      var res = await getProfileInfo();
      if (res.status === true) {
        setData(res.data[0])
      }
      else {
        toast.show(res.message, {
          type: 'warning',
          placement: 'bottom',
          duration: 1000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
    } catch (e) {
    }
  };



  return (
    <View
      style={{
        ...styles.mainView,
        backgroundColor: themecolor.LOGINTHEMECOLOR1,
        borderBottomColor: themecolor.BOXBORDERCOLOR1,
      }}>

      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={themecolor.STATUSEBARCONTENT}
      />

      <View style={{ ...styles.mainViewContainer, }}>
        <View
          style={{ ...styles.headerInnerView }}>

          <View style={{ ...styles.iconViewCont }}>
            {props.backIcon ? (
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.toggle}
                onPress={props.onPressBack}
              >
                <CIcon
                  name="keyboard-backspace"
                  size={26}
                  color={themecolor.TXTWHITE}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              >
                {/* <Icon name="menu-sharp" size={26} color={themecolor.TXTWHITE} /> */}
                <Image
                  style={{ width: 22, height: 22, resizeMode: 'contain', }}
                  source={require('../../../assets/images/icondrawer.png')}
                />
              </TouchableOpacity>
            )}
          </View>

          {props.title == 'Home' ? (
            <>
              <View style={{ ...styles.iconTitle1, }}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                  {/* <Image
                    source={{uri: appLogoAsync}}
                    style={{ width: 50, height: 50, resizeMode: 'contain',  }}
                  /> */}

                  <Text
                    allowFontScaling={false}
                    style={{
                      color: themecolor.DeepSkyBlue,
                    }}>
                    {/* Hi, {data.name} */}
                  </Text>

                  <Image
                  style={{ width: 180, height: 60, resizeMode: 'contain', }}
                  source={require('../../../assets/images/logo.png')}
                />
                </View>
              </View>
              <TouchableOpacity activeOpacity={0.5}
                onPress={() => navigation.navigate('MemberShip')} style={{ ...styles.iconViewCont }}>
                {/* <MCI name="card-account-details-star-outline" size={23} color={themecolor.TXTWHITE} /> */}
                <Image
                  style={{ width: 30, height: 30, resizeMode: 'contain', }}
                  source={require('../../../assets/images/membership.png')}
                />
                
              </TouchableOpacity>
            </>
          ) : (
            <View style={{ ...styles.iconTitle, }}>
              <Text
                allowFontScaling={false}
                style={{ ...styles.toolbarTitle, color: themecolor.TXTWHITE, right: 20 }}
                numberOfLines={1}>
                {props.title}
              </Text>
            </View>
          )}



        </View>
      </View>
    </View>
  );
}
