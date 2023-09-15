import React, { useState } from 'react';
import {
    View,
    Text, Image,
    BackHandler,
    TextInput,
    ScrollView,
    Dimensions,
    TouchableOpacity,StatusBar
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import Header from '../../components/shared/header/Header';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import { useToast } from 'react-native-toast-notifications';
import { styles } from '../../assets/css/ProfileCss/EditProfileStyle';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HalfSizeButton from '../../components/shared/button/halfSizeButton';
import { postChangePswd } from '../../repository/ProfileRepository/ChangePswdRepo';

const { width, height } = Dimensions.get('window');

export default function ChangePswd(props) {
    function handleBackButtonClick() {
        props.navigation.goBack();
        return true;
    }

    React.useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener(
                'hardwareBackPress',
                handleBackButtonClick,
            );
        };
    }, []);

    const toast = useToast();
    var navigation = useNavigation();

    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();
    const [loader, setLoader] = useState(false);

    const [oldPswd, setOldPswd] = useState('');
    const [newPswd, setNewPswd] = useState('');
    const [confirmNewPswd, setConfirmNewPswd] = useState('');
    const [isPasswordSecure, setIsPasswordSecure] = useState(true);
    const [isPasswordSecure1, setIsPasswordSecure1] = useState(true);
    const [isPasswordSecure2, setIsPasswordSecure2] = useState(true);


    const handleSubmit = async () => {
        setLoader(true)
        if (oldPswd == '') {
            setLoader(false)
            toast.show('old Password is required!', {
                type: 'warning',
                placement: 'bottom',
                duration: 1000,
                offset: 30,
                animationType: 'slide-in',
            });
        } else if (newPswd == '') {
            setLoader(false)
            toast.show('New Password is required!', {
                type: 'warning',
                placement: 'bottom',
                duration: 1000,
                offset: 30,
                animationType: 'slide-in',
            });
        } else if (confirmNewPswd == '') {
            setLoader(false)
            toast.show('Confirm New Password is required!', {
                type: 'warning',
                placement: 'bottom',
                duration: 1000,
                offset: 30,
                animationType: 'slide-in',
            });
        } else {
            try {
                let formdata = new FormData();
                formdata.append('old_password', oldPswd);
                formdata.append('password1', newPswd);
                formdata.append('password2', confirmNewPswd);

                var res = await postChangePswd(formdata);
                console.log("postChangePswd...",res)

                if (res.status === true) {
                    setLoader(false)
                    navigation.navigate("Dashboard")
                    toast.show("Password change Successfully.", {
                        type: 'success',
                        placement: 'bottom',
                        duration: 1000,
                        offset: 30,
                        animationType: 'slide-in',
                    });
                }
                else {
                    setLoader(false)
                    toast.show(res.message, {
                        type: 'warning',
                        placement: 'bottom',
                        duration: 1000,
                        offset: 30,
                        animationType: 'slide-in',
                    });
                }

            } catch (e) {
                setLoader(false)
                console.log('errrror in..getManageAddress page in address-->', e);
                toast.show('Something went wrong!, Try again later.', {
                    type: 'danger',
                    placement: 'bottom',
                    duration: 1000,
                    offset: 30,
                    animationType: 'slide-in',
                });
            }
        }
    };


    return (
        <View style={{ backgroundColor: themecolor.DeepSkyBlue2, ...styles.bg }}>

            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
            />

            <Header title="Change Password" backIcon={true}
                onPressBack={() => handleBackButtonClick()} />

            {loader ? (
                <LoadingFullScreen style={{ flex: 1 }} />
            ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View
                        style={{
                            ...styles.container,
                        }}>

                        <View style={styles.viewDetails}>
                            <View style={{ ...styles.ImgView, borderColor: themecolor.BOXBORDERCOLOR1, }}>
                                <Image
                                    source={require('../../assets/images/reset-password.png')}
                                    style={{ ...styles.imgEdit }}
                                />
                            </View>
                            <Text
                                allowFontScaling={false}
                                style={{ ...styles.txt, color: themecolor.DeepSkyBlue }}
                                numberOfLines={2}>
                                Change Your Password
                            </Text>
                        </View>

                        <View style={{ ...styles.Mv5 }} />

                        <View style={{ ...styles.Mv5 }}>
                            <Text allowFontScaling={false} style={{ ...styles.TextinputH, color: themecolor.DeepSkyBlue }}>Old Password</Text>
                            <View
                                style={{
                                    ...styles.TextViewPswd,
                                    borderColor: themecolor.BOXBORDERCOLOR1,
                                    backgroundColor: themecolor.BOXBORDERCOLOR,
                                }}>
                                <View style={{ ...styles.pswdchangeWidth }}>
                                    <TextInput
                                        allowFontScaling={false}
                                        value={oldPswd}
                                        placeholder={'Old Password'}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        textContentType="newPassword"
                                        secureTextEntry={isPasswordSecure}
                                        enablesReturnKeyAutomatically
                                        placeholderTextColor={themecolor.TXTGREYS}
                                        style={{
                                            ...styles.TextInput,
                                            color: themecolor.TXTWHITE,
                                        }}
                                        onChangeText={txt => setOldPswd(txt)}
                                    />
                                </View>
                                <TouchableOpacity activeOpacity={0.5} style={{ padding: 2 }}
                                    onPress={() => {
                                        isPasswordSecure
                                            ? setIsPasswordSecure(false)
                                            : setIsPasswordSecure(true);
                                    }}>
                                    <MaterialCommunityIcons
                                        name={isPasswordSecure ? 'eye-off' : 'eye'}
                                        size={16}
                                        color={themecolor.DeepSkyBlue}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View style={{ ...styles.Mv5 }} />

                        <View>
                            <Text allowFontScaling={false} style={{ ...styles.TextinputH, color: themecolor.DeepSkyBlue }}>New Password</Text>
                            <View
                                style={{
                                    ...styles.TextViewPswd,
                                    borderColor: themecolor.BOXBORDERCOLOR1,
                                    backgroundColor: themecolor.BOXBORDERCOLOR,
                                }}>
                                <View style={{ ...styles.pswdchangeWidth }}>
                                    <TextInput
                                        allowFontScaling={false}
                                        value={newPswd}
                                        placeholder={'New Password'}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        textContentType="newPassword"
                                        secureTextEntry={isPasswordSecure1}
                                        enablesReturnKeyAutomatically
                                        placeholderTextColor={themecolor.TXTGREYS}
                                        style={{
                                            ...styles.TextInput,
                                            color: themecolor.TXTWHITE,
                                        }}
                                        onChangeText={txt => setNewPswd(txt)}
                                    />
                                </View>
                                <TouchableOpacity activeOpacity={0.5} style={{ padding: 2 }} onPress={() => {
                                    isPasswordSecure1
                                        ? setIsPasswordSecure1(false)
                                        : setIsPasswordSecure1(true);
                                }}
                                >
                                    <MaterialCommunityIcons
                                        name={isPasswordSecure1 ? 'eye-off' : 'eye'}
                                        size={16}
                                        color={themecolor.DeepSkyBlue}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View style={{ ...styles.Mv5 }} />

                        <View>
                            <Text allowFontScaling={false} style={{ ...styles.TextinputH, color: themecolor.DeepSkyBlue }}>Confirm New Password</Text>
                            <View
                                style={{
                                    ...styles.TextViewPswd,
                                    borderColor: themecolor.BOXBORDERCOLOR1,
                                    backgroundColor: themecolor.BOXBORDERCOLOR,
                                }}>
                                <View style={{ ...styles.pswdchangeWidth }}>
                                    <TextInput
                                        allowFontScaling={false}
                                        value={confirmNewPswd}
                                        placeholder={'Confirm New Password'}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        textContentType="newPassword"
                                        secureTextEntry={isPasswordSecure2}
                                        enablesReturnKeyAutomatically
                                        placeholderTextColor={themecolor.TXTGREYS}
                                        style={{
                                            ...styles.TextInput,
                                            color: themecolor.TXTWHITE,
                                        }}
                                        onChangeText={txt => setConfirmNewPswd(txt)}
                                    />
                                </View>
                                <TouchableOpacity activeOpacity={0.5} style={{ padding: 2 }} onPress={() => {
                                    isPasswordSecure2
                                        ? setIsPasswordSecure2(false)
                                        : setIsPasswordSecure2(true);
                                }}
                                >
                                    <MaterialCommunityIcons
                                        name={isPasswordSecure2 ? 'eye-off' : 'eye'}
                                        size={16}
                                        color={themecolor.DeepSkyBlue}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ ...styles.Mv5 }} />

                        <TouchableOpacity activeOpacity={0.5} style={{ ...styles.forgot, }} onPress={() => navigation.navigate('ForgotPswd',{comeIn:"ChangePassword"})}>
                            <Text
                                allowFontScaling={false}
                                style={{
                                    ...styles.forgotTxt,
                                    color: themecolor.DeepSkyBlue,
                                }}>
                                Forgot Password?
                            </Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            )}

            <View style={{ marginVertical: 22 }} />

            <View
                style={{
                    ...styles.touchview,
                }}>
                <View style={{ ...styles.mainView, }}>
                    <HalfSizeButton
                        title="Update Password"
                        icon=""
                        onPress={() => handleSubmit()}
                        color="#fff"
                        backgroundColor={themecolor.DeepSkyBlue}
                        borderColor={themecolor.BOXBORDERCOLOR1}
                    />
                </View>
            </View>
        </View>
    );
}
