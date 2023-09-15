import React, { useState, useEffect } from 'react';
import {
    View,
    StatusBar,
    ScrollView,
    Text,
    Image, TextInput, BackHandler, Alert
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import Header from '../../components/shared/header/Header';
import { styles } from '../../assets/css/DiscussionCss/DiscussionStyle';
import { useToast } from 'react-native-toast-notifications';
import { useNavigation } from '@react-navigation/native';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FA from 'react-native-vector-icons/Feather';
import { getProfileInfo } from '../../repository/ProfileRepository/EditProfileRepo';
import { DiscussionFlateList } from '../../components/shared/FlateLists/DiscussionFlateList/DiscussionFlateList';
import { getDiscussion, postSendDiscussion, postSendDiscussionislike } from '../../repository/DiscussionRepository/DiscussionRepo';
import Video from 'react-native-video';
import moment from 'moment';
import VideoPlayer from "react-native-video-player"
import { MainNavigatorstyle } from '../../assets/css/MainNavigatorstyle';

export default function Discussion(props) {


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
    const navigation = useNavigation();
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();

    const [loader, setLoader] = useState(true);
    const [txt, setTxt] = useState("");
    const [userData, setUserData] = useState([]);
    const [data, setData] = useState([]);
    const [userProfile, setProfile] = useState('');
    const [refresh, setRefresh] = useState(false);

    var discussionTopicData = props.route.params.TopicData
    var contantUrl = ""
    var contantUrlType = ""
    var NewDate = ""


    if (Object.values(discussionTopicData).length > 0) {
        contantUrl = discussionTopicData.media
        // alert(JSON.stringify(contantUrl == null ?"image not found ":contantUrl))
        contantUrl == null || contantUrl != "" || contantUrl == undefined ? <Image style={{ ...styles.imgEdit }} source={require("../../assets/images/logo.png")} /> : contantUrl.split('.').pop()
        // if (contantUrl != "") {
        //     // contantUrlType = contantUrl.split('.').pop()
        // }
        NewDate = moment(discussionTopicData.created_time).format('MM-DD-YYYY hh:mm a');
    }

    const handleUserData = async () => {
        try {
            var res = await getProfileInfo();
            if (res.status === true) {
                setUserData(res.data)
                setProfile(res.data[0].profile_photo)
                setLoader(false)
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
        }
    };

    const handleDiscussion = async () => {
        try {
            var res = await getDiscussion(props.route.params.TopicData.id);
            console.log("ramkkkkkkkkkkkkkk",res)
            if (res.status === true) {
                setData(res.data)
                setLoader(false)
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
            console.log('catch in ....handleDiscussion page', e);
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
        handleDiscussion()
    }, [refresh]);

    const handleSendDiscussion = async () => {
        setLoader(true);
        if (txt == '') {
            setLoader(false)
            toast.show('Comment is required!', {
                type: 'warning',
                placement: 'bottom',
                duration: 1000,
                offset: 30,
                animationType: 'slide-in',
            });
        }
        else {
            try {
                let formdata = new FormData()
                formdata.append('user_id', userData.id)
                formdata.append('topic_id', props.route.params.TopicData.id)
                formdata.append('comment', txt)

                const res = await postSendDiscussion(formdata);
                if (res.status == true) {
                    setRefresh(!refresh);
                    setTxt("")
                    toast.show("Send your comment Successfully.", {
                        type: 'success',
                        placement: 'bottom',
                        duration: 1000,
                        offset: 30,
                        animationType: 'slide-in',
                    });
                }
            } catch (e) {
                setLoader(false)
                console.log('catch in ....handleSendDiscussion page', e);
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
        <View style={{ ...styles.bg, backgroundColor: themecolor.THEMECOLOR1 }}>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
            />

            <Header title={props.route.params.Id} backIcon={true}
                onPressBack={() => handleBackButtonClick()} />

            {loader ? (
                <LoadingFullScreen style={{ flex: 1 }} />
            ) : (
                <>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ ...styles.container }}>

                            <View
                                style={{ ...styles.innerContaintop, backgroundColor: themecolor.BOXBORDERCOLOR, borderColor: themecolor.BOXBORDERCOLOR1, }}
                            >

                                {/* <Text
                                    allowFontScaling={false}
                                    style={{ color: themecolor.TXTWHITE, ...styles.txt3 }}>
                                    <Text
                                        allowFontScaling={false}
                                        style={{ color: themecolor.TXTWHITE, ...styles.smalltxt1 }}>
                                        Topic Name :
                                    </Text>  {discussionTopicData.topic_name}
                                </Text> */}


                                {/* <View style={{ ...styles.MT5 }} />

                                <Text
                                    allowFontScaling={false}
                                    style={{ color: themecolor.TXTGREYS, ...styles.smalltxt }}>
                                    Created Date : {NewDate}
                                </Text> */}

                                <View style={styles.MT5} />

                                <View style={{ ...styles.mediaView }}>
                                    {contantUrlType == 'mp4' ?
                                        <VideoPlayer
                                            video={{ uri: discussionTopicData.media }}
                                            //     ref={(ref) => {
                                            //         this.player = ref
                                            //     }}
                                            //     onBuffer={this.onBuffer}
                                            //     onError={this.videoError}
                                            //     controls={true}
                                            //     resizeMode="contain"
                                            //     style={{ ...styles.imgEdit, backgroundColor: "#000" }}
                                            autoplay={false}
                                            videoWidth={980}
                                            videHeight={1000}
                                            thumbnail={require('../../assets/images/logo.png')}
                                            fullScreenOnLongPress={true}
                                            showDuration={true}
                                            pauseOnPress={true}
                                        />
                                        :
                                        <Image
                                            source={{ uri: discussionTopicData.media }}
                                            style={{ ...styles.imgEdit }}
                                        />
                                    }
                                </View>

                                <View style={{ ...styles.MT5 }} />
                                <View style={{ ...styles.MT5 }} />
                                <View
                                    style={{
                                        ...MainNavigatorstyle.Borderline1,
                                        borderWidth: 1,
                                        borderColor: themecolor.DeepSkyBlue1,
                                    }}
                                />
                                <View style={{ ...styles.MT5 }} />
                                <View style={{ ...styles.MT5 }} />
                                <Text
                                    allowFontScaling={false}
                                    style={{ color: themecolor.TXTWHITE, ...styles.txt2 }}>
                                    {discussionTopicData.topic_description}
                                </Text>

                                <View style={styles.MT10} />
                            </View>

                            <View style={{ ...styles.MT5 }} />

                            {data.length > 0 ? (
                                <DiscussionFlateList data={data} />
                            ) : (
                                <></>
                            )}

                        </View>

                    </ScrollView>

                    <View style={{ ...styles.bottomContain, backgroundColor: themecolor.BOXBORDERCOLOR, borderTopColor: themecolor.BOXBORDERCOLOR1, }}>
                        <View style={{ ...styles.bottomProfile }}>
                            <Image
                                source={{ uri: userProfile }}
                                resizeMode="contain"
                                style={{ width: 40, height: 40, borderRadius: 50 }}
                            />
                        </View>

                        <View style={{ ...styles.bottomTextInput }}>
                            <View
                                style={{
                                    ...styles.TextView,
                                    borderColor: themecolor.BOXBORDERCOLOR1,
                                    backgroundColor: themecolor.BOXBORDERCOLOR,
                                }}>
                                <TextInput
                                    allowFontScaling={false}
                                    value={txt}
                                    placeholder={'Type a response..'}
                                    placeholderTextColor={themecolor.TXTGREYS}
                                    style={{
                                        ...styles.TextInput,
                                        color: themecolor.TXTWHITE,
                                    }}
                                    onChangeText={txt => setTxt(txt)}
                                />
                            </View>
                        </View>

                        <View style={{ ...styles.bottommsgSend }}>
                            <TouchableOpacity activeOpacity={0.5} style={{ ...styles.msgSend }} onPress={() => handleSendDiscussion()}>
                                <FA name="send" color={themecolor.ADDTOCARTBUTTONCOLOR} size={25} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            )}
        </View>
    );
}
