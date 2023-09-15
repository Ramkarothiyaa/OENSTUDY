import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { MainNavigatorstyle } from '../../assets/css/MainNavigatorstyle';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { DrawerActions, useNavigation, useFocusEffect } from '@react-navigation/native';
import { Image as ImageR } from 'react-native';
import { navigate } from '../NavigationDrw/NavigationService';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import AD from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FA from 'react-native-vector-icons/FontAwesome';
import Ii from 'react-native-vector-icons/Ionicons';
import { useToast } from 'react-native-toast-notifications';
import { removeDatafromAsync } from '../../repository/AsyncStorageServices';
import { postSignOut } from '../../repository/AuthRepository/SignOutRepository';
import { getProfileInfo } from '../../repository/ProfileRepository/EditProfileRepo';
import RatingModel from '../../components/shared/Model/RatingModel';
import { getRatingReview, postRatingUs } from '../../repository/RateUsRepository/RateUsRepo';

const { width } = Dimensions.get('window');

export default function DrawerContent(props) {
  const toast = useToast();
  const navigation = useNavigation();

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const [data, setData] = useState([]);

  const [showmodal, setShowmodal] = useState(false);
  const [startRating, setStarRating] = useState('');
  const [startRating1, setStarRating1] = useState('');
  const [commentRating, setCommentRating] = useState('');
  const [commentRating1, setCommentRating1] = useState('');

  const handleUserData = async () => {
    try {
      var res = await getProfileInfo();
      if (res.status === true) {
        setData(res.data)
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

  const handleRatingReview = async () => {
    try {
      var res = await getRatingReview();
      if (res.status === true) {
        setStarRating(res.data[0].no_of_rating);
        setStarRating1(res.data[0].no_of_rating);
        setCommentRating(res.data[0].remark)
        setCommentRating1(res.data[0].remark)
      }
    } catch (e) {
      console.log('errrror in..getRatingReview page-->', e);
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 1000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };


  useEffect(() => {
    handleUserData();
    handleRatingReview();
  }, []);


  const handleConfirmLogout = () => {
    Alert.alert(
      'Logout Confirmation',
      'Are you sure you want to Logout?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => handleLogout() },
      ],
    );
  };


  const handleLogout = async () => {
    try {
      var res = await postSignOut()

      if (res.status == true) {
        await removeDatafromAsync('@UserData');
        await removeDatafromAsync('@Token');
        navigation.reset({
          index: 0,
          routes: [{ name: 'SignIn' }],
        });
      }
      else {
        toast.show(res.msg, {
          type: 'warning',
          placement: 'bottom',
          duration: 1000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
    } catch (e) {
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 1000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  const HandleRatingUs = async () => {
    if (startRating == '') {
      toast.show('Fill Stars is required!', {
        type: 'warning',
        placement: 'bottom',
        duration: 1000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else if (commentRating == '') {
      toast.show('Comment is required!', {
        type: 'warning',
        placement: 'bottom',
        duration: 1000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else {
      try {
        let formdata = new FormData();
        formdata.append('no_of_rating', startRating);
        formdata.append('remark', commentRating);

        const res = await postRatingUs(formdata);
        if (res.status == true) {
          setShowmodal(!showmodal)
        }
      } catch (e) {
        console.log('catch in ....login page', e);
        toast.show('Something went wrong!, Try again later.', {
          type: 'danger',
          placement: 'bottom',
          duration: 1000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
    }
  }



  return (
    <DrawerContentScrollView
      showsVerticalScrollIndicator={false}
      style={{
        ...MainNavigatorstyle.DrawerContentSView,
        backgroundColor: themecolor.THEMECOLOR1,
        borderColor: themecolor.BOXBORDERCOLOR1,
      }}>
      <View style={MainNavigatorstyle.userinfo1}>
        <View style={{justifyContent:"center",alignItems:"center",backgroundColor:"#effbff"}}>
          <ImageR
            source={require('../../assets/images/logo.png')}
            resizeMode="contain"
            style={{
              width: "50%",
              height: 55,
              // tintColor:  '#fff',
            }}
          />
        </View>

        {data.length > 0 ?
          <View style={{ ...MainNavigatorstyle.ImageRView }}>
            <ImageR
              style={{ ...MainNavigatorstyle.userimg }}
              // source={require('../../assets/images/newlog.png')}
              source={{ uri: data[0].profile_photo }}
            />
            <View style={{ marginTop: 7 }} />
            <Text
              allowFontScaling={false}
              style={{
                ...MainNavigatorstyle.labelstylecss1,
                color: themecolor.DeepSkyBlue,
                marginVertical: 17

              }}>
              Hi, {data[0].name}
            </Text>
          </View>
          : <></>}



        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              ...MainNavigatorstyle.Borderline,
              borderWidth: 0.6,
              borderColor: themecolor.BOXBORDERCOLOR1,
            }}
          />

          <TouchableOpacity
            onPress={() => navigate('Dashboard')}
            style={MainNavigatorstyle.viewstyle1}>
            <AD name="home" size={23} color={themecolor.DeepSkyBlue} />
            <Text
              allowFontScaling={false}
              style={{
                ...MainNavigatorstyle.labelstylecss,
                color: themecolor.DeepSkyBlue,
              }}>
              Home
            </Text>
          </TouchableOpacity>

          <View
            style={{
              ...MainNavigatorstyle.Borderline,
              borderWidth: 0.6,
              borderColor: themecolor.BOXBORDERCOLOR1,
            }}
          />


          <TouchableOpacity
            onPress={() => navigate('Profile')}
            style={MainNavigatorstyle.viewstyle1}>
            <FA name="user-o" size={23} color={themecolor.DeepSkyBlue} />
            <Text
              allowFontScaling={false}
              style={{
                ...MainNavigatorstyle.labelstylecss,
                color: themecolor.DeepSkyBlue,
              }}>
              Profile
            </Text>
          </TouchableOpacity>

          <View
            style={{
              ...MainNavigatorstyle.Borderline,
              borderWidth: 0.6,
              borderColor: themecolor.BOXBORDERCOLOR1,
            }}
          />


          <TouchableOpacity
            onPress={() => Linking.openURL('https://www.google.com/')}
            style={MainNavigatorstyle.viewstyle1}>
            <Ii name="ios-chatbubble-ellipses-outline" size={23} color={themecolor.DeepSkyBlue} />
            <Text
              allowFontScaling={false}
              style={{
                ...MainNavigatorstyle.labelstylecss,
                color: themecolor.DeepSkyBlue,
              }}>
              Help & support
            </Text>
          </TouchableOpacity>
          <View
            style={{
              ...MainNavigatorstyle.Borderline,
              borderWidth: 0.6,
              borderColor: themecolor.BOXBORDERCOLOR1,
            }}
          />

          <TouchableOpacity
            onPress={() => { setShowmodal(!showmodal); navigation.dispatch(DrawerActions.closeDrawer()) }}
            style={MainNavigatorstyle.viewstyle1}>
            <FA name="star-o" size={23} color={themecolor.DeepSkyBlue} />
            <Text
              allowFontScaling={false}
              style={{
                ...MainNavigatorstyle.labelstylecss,
                color: themecolor.DeepSkyBlue,
              }}>
              Rating Us
            </Text>
          </TouchableOpacity>

          <View
            style={{
              ...MainNavigatorstyle.Borderline,
              borderWidth: 0.6,
              borderColor: themecolor.BOXBORDERCOLOR1,
            }}
          />

          <TouchableOpacity
            onPress={() => {
              handleConfirmLogout();
              navigation.dispatch(DrawerActions.closeDrawer())
            }}
            style={MainNavigatorstyle.viewstyle1}>
            <AD name="logout" size={23} color={themecolor.DeepSkyBlue} />
            <Text
              allowFontScaling={false}
              style={{
                ...MainNavigatorstyle.labelstylecss,
                color: themecolor.DeepSkyBlue,
              }}>
              Sign Out
            </Text>
          </TouchableOpacity>

          <View
            style={{
              ...MainNavigatorstyle.Borderline,
              borderWidth: 0.6,
              borderColor: themecolor.BOXBORDERCOLOR1,
            }}
          />

        </ScrollView>

        {showmodal && (
          <RatingModel
            showmodal={showmodal}
            setShowmodal={setShowmodal}
            starRating={startRating}
            starRating1={startRating1}
            commentRating={commentRating}
            commentRating1={commentRating1}
            setCommentRating={setCommentRating}
            setStarRating={setStarRating}
            press={HandleRatingUs}
          />
        )}


        <View
          style={{
            ...MainNavigatorstyle.Borderline,
            borderWidth: 0.6,
            borderColor: themecolor.BOXBORDERCOLOR1,
          }}
        />

        <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 5, alignItems: "center", alignSelf: "center" }}>
          <View style={{ padding: 10 }}>
            <ImageR
              style={{ ...MainNavigatorstyle.userimgIconsSmall }}
              source={require('../../assets/images/iaf.png')}
            />
          </View>
          <View style={{ padding: 10 }}>
            <ImageR
              style={{ ...MainNavigatorstyle.userimgIconsSmall1 }}
              source={require('../../assets/images/iso.png')}
            />
          </View>
          <View style={{ padding: 10 }}>
            <ImageR
              style={{ ...MainNavigatorstyle.userimgIconsSmall }}
              source={require('../../assets/images/egac.png')}
            />
          </View>
        </View>


        <View style={MainNavigatorstyle.view2}>
          <View
            style={{
              ...MainNavigatorstyle.Borderline,
              borderWidth: 0.6,
              borderColor: themecolor.BOXBORDERCOLOR1,
            }}
          />


          <View style={{ marginVertical: 3 }} />
          <Text allowFontScaling={false} style={{ ...MainNavigatorstyle.view2txt }}>App Version 1.0</Text>
          <View style={{ marginVertical: 3 }} />
        </View>

      </View>
    </DrawerContentScrollView>
  );
}
