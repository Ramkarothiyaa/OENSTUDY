import React, { useState, useEffect } from 'react';
import {
    TouchableOpacity,
    View,
    FlatList,
    Text,
    Image,
    Dimensions,
    Alert,
} from 'react-native';
import { MyThemeClass } from '../../../Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../../../assets/css/DiscussionCss/DiscussionStyle';
import moment from 'moment';
import FA from 'react-native-vector-icons/FontAwesome';
import FA1 from 'react-native-vector-icons/AntDesign';
import Video from 'react-native-video';
import VideoPlayer from "react-native-video-player"
import { getDiscussion, getDiscussionTopic, postSendDiscussionislike } from '../../../../repository/DiscussionRepository/DiscussionRepo';

const { width, height } = Dimensions.get('screen');

function DiscussionTopicDataFlatList({ item, props, themecolor, boxSize }) {

    console.log("hhhhhhhhhhhhhhhhhhhhhh", item);

    // console.log("fffffffffffffffffffffff", item);
    // alert(JSON.stringify(props.data.id))
    // console.log("ssssssssssssss---->", item.like <= 0 ? "ram" : item.like >= 1 ? "shyam" : item.like);


    // console.log("iteeemmmmm",item);

    const navigation = useNavigation();
    const [likes, setLikes] = useState();
    const [heart, setHeart] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [ram, setRam] = useState(false);
    const [msg, setMsg] = useState('');
    const [total_like, setTotal_like] = useState();



    var NewDate = moment(item.created_time).format('MM MMM-YYYY');

    var contantUrl = ""
    if (item.media != null) {
        contantUrl = item.media;
    }
    var contantUrlType = "";
    if (contantUrl != "") {
        contantUrlType = contantUrl.split('.').pop()
    }

    useEffect(() => {
        setLikes(1)
    }, [props]);


    // const handleDiscussionTopic = async () => {
    //     var res = await getDiscussionTopic();
    //     console.log("rrrrrrrrrrrrrrrrrrrr->", res);
    // };


    const handleSendDiscussionislike = async () => {
        setLikes(!likes)
        setRam(!ram)
        try {
            let formdata = new FormData()
            formdata.append('discussion_id', item.id)
            formdata.append('is_like', likes)
            const res = await postSendDiscussionislike(formdata);
            // console.log("API RESPONSE -->", res)
            setMsg(res.message)
            setTotal_like(res.total_like)
            // alert(JSON.stringify(res))

            if (res.status == true) {
                setRefresh(!refresh);
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

    return (
        <View
            style={{ ...styles.innertopicContain, backgroundColor: themecolor.BOXBORDERCOLOR, borderColor: themecolor.BOXBORDERCOLOR1, }}
        >

            <View style={{ ...styles.commentCon1, }}>

                <View style={{ ...styles.TmeCon }}>
                    <View style={{ width: "60%", }}>
                        <View style={{ ...styles.innercont1 }}>

                            <View style={{ ...styles.bottomProfile }}>
                                <Image
                                    source={{ uri: item.user_profile_pic }}
                                    resizeMode="contain"
                                    style={{ width: 40, height: 40, borderRadius: 50 }}
                                />
                            </View>
                            <View style={{ ...styles.namecontainer }}>
                                <Text
                                    allowFontScaling={false}
                                    numberOfLines={1}
                                    style={{ color: themecolor.TXTWHITE, ...styles.txt }}>
                                    {item.user_name}
                                </Text>
                            </View>
                        </View>

                    </View>
                    <View style={{ ...styles.tmeConinnerLast }}>
                        <Text
                            allowFontScaling={false}
                            style={{ color: themecolor.TXTGREYS, ...styles.smalltxt }}>
                            {NewDate}
                        </Text>
                    </View>
                </View>

                <TouchableOpacity style={{ margin: 5, width: "96%" }}
                    onPress={() => navigation.navigate('Discussion', { Id: item.topic_name, TopicData: item })}
                >

                    <Text
                        allowFontScaling={false}
                        style={{ color: themecolor.TXTWHITE, ...styles.txt3 }}>
                        {item.topic_name}
                    </Text>

                    <View style={styles.MT5} />

                    {/* <Text
                        allowFontScaling={false}
                        style={{ color: themecolor.TXTWHITE, ...styles.txt2 }}>
                        {item.topic_description}
                    </Text> */}

                </TouchableOpacity>


                <View style={styles.MT10} />
                <View style={styles.MT10} />

                {contantUrl != "" ?
                    <View style={{ ...styles.mediaView }}>
                        {contantUrlType == 'mp4' ?
                            <VideoPlayer video={{ uri: item.media }}
                                // ref={(ref) => {
                                //     this.player = ref
                                // }}
                                // playControl={false}
                                // onBuffer={this.onBuffer}
                                // onError={this.videoError}
                                autoplay={false}
                                videoWidth={980}
                                videHeight={1000}
                                // ythumbnail={require('../../../../assets/images/logo.png')}
                                fullScreenOnLongPress={true}
                                showDuration={true}
                                pauseOnPress={true}
                            // resizeMode="contain"
                            // style={{ ...styles.imgEdit, backgroundColor: "#000" }}
                            />
                            :
                            <Image
                                source={{ uri: item.media }}
                                style={{ ...styles.imgEdit }}
                            />

                        }

                    </View>
                    : <></>
                }

                <View style={styles.MT10} />
                <View style={styles.MT10} />



                <View style={{ ...styles.TmeCon }}>


                    <TouchableOpacity style={{ width: "30%", }}
                        onPress={() => handleSendDiscussionislike()}
                    >
                        <Text
                            allowFontScaling={false}
                            style={{ color: themecolor.DeepSkyBlue, ...styles.smalltxt2 }}>
                            <FA1 name={likes ? 'like2' : 'like1'} size={20} color={themecolor.DeepSkyBlue} />{" "}
                            {msg == 200 ? total_like : item.like} {total_like == 1 ? "liked" : "like"}

                            {/* {ram ? 'Success' : 'Like'} */}
                            {/* {console.log('====================================', msg == 200 ? "liked" : "like")} */}


                            {/* {item.like <= 0 ? ram ? 'like' : 'success' : item.like >= 1 ? ram ? 'Like' : 'Success' : item.like} */}
                            {/* {item.like}  like{''} */}
                            {/* {ram ? 'Success' : 'Like'} */}
                        </Text>

                    </TouchableOpacity>

                    <View style={{ ...styles.tmeConinnerLast1, flexDirection: "row" }}>
                        <Text
                            allowFontScaling={false}
                            style={{ color: themecolor.DeepSkyBlue, ...styles.smalltxt2 }}>
                            <FA name="eye" size={15} color={themecolor.DeepSkyBlue} />{" "}
                            {item.View} View
                        </Text>

                        <TouchableOpacity activeOpacity={0.5}
                            onPress={() => navigation.navigate('Discussion', { Id: item.topic_name, TopicData: item })}
                            style={{ left: 20 }}>
                            <Text
                                allowFontScaling={false}
                                style={{ color: themecolor.DeepSkyBlue, ...styles.smalltxt2 }}>
                                <FA name="commenting-o" size={15} color={themecolor.DeepSkyBlue} />{" "}
                                {item.comment} Comment
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

        </View>
    );
}

export function DiscussionTopicFlateList(props) {
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();

    const [currentIndex, setCurrentIndex] = useState(0);


    const handleChangeIndexValue = ({ index }) => {
        setCurrentIndex(index);
    };



    return (
        <FlatList
            data={props.data}
            renderItem={({ item, index }) => (
                <DiscussionTopicDataFlatList item={item} props={props} themecolor={themecolor} boxSize={props.boxSize} index={index} currentIndex={currentIndex} />
            )}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            keyExtractor={(item, index) => index}
            onChangeIndex={handleChangeIndexValue}
        />
    );
}
