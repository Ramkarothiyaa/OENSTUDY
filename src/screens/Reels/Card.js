
// // import React, { useState, useEffect } from "react";
// // import { View, Text, Alert, StatusBar, StyleSheet, Dimensions } from 'react-native';
// // import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
// // import { useSelector } from 'react-redux';
// // import VideoPlayer from "react-native-video-player"
// // import Video from 'react-native-video';
// // import reel from "../../assets/images/Videos/samplePortrait.mp4"
// // import reel1 from "../../assets/images/Videos/sample.mp4"
// // import BackBtn from "react-native-vector-icons/Ionicons"
// // import BackBtn1 from "react-native-vector-icons/FontAwesome"
// // import BackBtn2 from "react-native-vector-icons/Entypo"
// // const { width, height } = Dimensions.get("screen")


// // export default function Card() {
// //     const mode = useSelector(state => state.mode);
// //     const themecolor = new MyThemeClass(mode).getThemeColor();

// //     return (<>

// //         <View style={{}}>
// //             <View style={{ backgroundColor: "green" }}>
// //                 <Video
// //                     repeat={true}
// //                     resizeMode="cover"
// //                     fullscreen={true}
// //                     source={reel}
// //                     paused={false}
// //                     style={styles.backgroundVideo}
// //                 />
// //                 <View style={styles.header}>
// //                     <View style={styles.row}>
// //                         <BackBtn name={"arrow-back"} size={24} color="#FFF" />
// //                         <Text style={styles.reel}>Reel</Text>
// //                     </View>

// //                     <View style={styles.camera}>
// //                         <BackBtn name={"camera-outline"} size={24} color="#FFF" />
// //                     </View>
// //                 </View>
// //                 <View style={styles.sidebar}>
// //                     <View style={styles.iconInfo}>
// //                         <BackBtn name={"heart-outline"} size={30} color="#FFF" />
// //                         <Text style={styles.txt}>122</Text>
// //                     </View>
// //                     <View style={styles.iconInfo}>
// //                         <BackBtn1 name={"comment-o"} size={30} color="#FFF" />
// //                         <Text style={styles.txt}>122</Text>
// //                     </View>
// //                     <View style={styles.iconInfo}>
// //                         <BackBtn1 name={"paper-plane-o"} size={30} color="#FFF" />
// //                         <Text style={styles.txt}></Text>
// //                     </View>
// //                     <View style={styles.iconInfo}>
// //                         <BackBtn2 name={"dots-three-vertical"} size={30} color="#FFF" />
// //                         <Text style={styles.txt}></Text>
// //                     </View>
// //                 </View>
// //             </View>
// //         </View>
// //     </>
// //     )

// // }

// // const styles = StyleSheet.create({
// //     backgroundVideo: {
// //         width: width,
// //         height: height
// //     },
// //     header: {
// //         flexDirection: "row",
// //         position: "absolute",
// //         padding: 12,
// //         paddingTop: 20,
// //         width: width,
// //         justifyContent: "space-between"
// //     },
// //     reel: {
// //         fontSize: 20,
// //         fontWeight: "bold",
// //         color: "#FFF",
// //         paddingHorizontal: 10
// //     },
// //     row: {
// //         flexDirection: "row"
// //     },
// //     camera: {
// //     },
// //     sidebar: {
// //         position: "absolute",
// //         right: 10,
// //         bottom: 80,
// //         padding: 15,
// //         paddingTop: 20
// //     },
// //     iconInfo: {
// //         alignItems: "center",
// //         paddingVertical: 10
// //     },
// //     txt: {
// //         color: "#FFF",
// //     }
// // });


// export const videoData = [
//   {
//     id: 1,
//     video: require('../../assets/images/Videos/samplePortrait.mp4'),
//     //   postProfile: require('../../storage/images/post1.jpg'),
//     // title: 'Ram_Charan',
//     // description: 'Feel the buity of nature',
//     likes: '0',
//     // isLike: "10k",
//   },
//   {
//     id: 2,
//     video: require('../../assets/images/Videos/sample.mp4'),
//     //   postProfile: require('../../storage/images/post2.jpg'),
//     // title: 'The_Groot',
//     // description: "It's a tea time",
//     likes: '2',
//     // isLike: "500",
//   },
//   {
//     id: 3,
//     video: require('../../assets/images/Videos/sampleLandscape.mp4'),
//     //   postProfile: require('../../storage/images/post3.jpg'),
//     // title: 'loverland',
//     // description: 'Feel the buity of nature',
//     likes: '3',
//     // isLike: "1",
//   },
//   {
//     id: 4,
//     video: require('../../assets/images/Videos/samplePortrait.mp4'),
//     //   postProfile: require('../../storage/images/post4.jpg'),
//     // title: 'mr. bean',
//     // description: 'How cute it is !!',
//     likes: '4',
//     // isLike: "500k",
//   },
// ];