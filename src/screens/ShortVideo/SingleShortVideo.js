import { View, Text, Dimensions, TouchableOpacity, Image, ActivityIndicator, StyleSheet, Alert } from 'react-native'
import React,{ useEffect, useRef, useState } from 'react'
import Video from 'react-native-video';
import Ionic from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const SingleShortVideo = ({ item, index, currentIndex }) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;




  const [mute, setMute] = useState(false);
  // const [like, setLike] = useState(item.like);


  const [opacity, setopacity] = useState(0);
  const onLoadStart = () => {
    setopacity(1);
  }
  const onLoad = () => {
    setopacity(0);
  }
  const onBuffer = ({ isBuffering }) => {
    setopacity(isBuffering ? 1 : 0);
  }

  const videoRef = useRef(null);
  const onError = error => {
    console.log('error', error);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#8ae0ff", }}>
      <View style={{ margin: 15 }}>

        <View
          style={{
            width: windowWidth,
            height: windowHeight,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setMute(!mute)}
            style={styles.video}>
            <Video
              videoRef={videoRef}
              onError={onError}
              repeat={true}
              resizeMode="cover"
              paused={ true}
              source={{ uri: `${item.uri}` }}
              muted={mute}
              onBuffer={onBuffer}
              onLoadStart={onLoadStart}
              onLoad={onLoad}
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
              }}
            />

            <ActivityIndicator
              color="#00afef"
              size={30}
              style={{
                opacity: opacity,
                position: 'absolute',
                top: 400,
                left: 70,
                right: 70,
                // height: 50,
              }}
            />
          </TouchableOpacity>
          <Ionic
            name="volume-mute"
            style={{
              fontSize: mute ? 20 : 0,
              color: 'white',
              position: 'absolute',
              backgroundColor: 'rgba(52,52,52,0.6)',
              borderRadius: 100,
              padding: mute ? 20 : 0,
            }}
          />
          {/* <View
                style={{
                    position: 'absolute',
                    width: windowWidth,
                    zIndex: 1,
                    bottom: 0, //edited
                    padding: 10,
                }}>
                 <View style={{}}>
          <TouchableOpacity style={{width: 150}}>
            <View
              style={{width: 100, flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 100,
                  backgroundColor: 'white',
                  margin: 10,
                }}>
                <Image
                  source={item.postProfile}
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                    borderRadius: 100,
                  }}
                />
              </View>
              <Text style={{color: 'white', fontSize: 16}}>{item.title}</Text>
            </View>
          </TouchableOpacity>
          <Text style={{color: 'white', fontSize: 14, marginHorizontal: 10}}>
            {item.description}
          </Text>
          <View style={{flexDirection: 'row', padding: 10}}>
            <Ionic
              name="ios-musical-note"
              style={{color: 'white', fontSize: 16}}
            />
            <Text style={{color: 'white'}}>Original Audio</Text>
          </View>
        </View> 
            </View> */}
          <View
            style={{
              position: 'absolute',
              bottom: 10, //edited
              right: 0,
            }}>
            {/* <TouchableOpacity style={{ padding: 1, justifyContent: "center", alignItems: "center" }}>
                    <AntDesign
                        name={Is_like? 'heart' : 'hearto'}
                        style={{ color: Is_like == 1 ? 'red' : 'white', fontSize: 25 }}
                    />
                    <Text style={{ color: 'white', top: 2 }}>
                        {TotalLike == undefined || TotalLike == null ? item.get_total_like : TotalLike}
                        {/* {item.get_total_like} 
                    </Text>
                </TouchableOpacity> */}
            {/* <TouchableOpacity style={{ padding: 10 }}>
                    <Ionic
                        name="ios-chatbubble-outline"
                        style={{ color: 'white', fontSize: 25 }}
                    />
                </TouchableOpacity> */}
            <TouchableOpacity style={{ padding: 10 }}>
              <Ionic
                name="paper-plane-outline"
                style={{ color: 'white', fontSize: 25 }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 10 }}>
              <Feather
                name="more-vertical"
                style={{ color: 'white', fontSize: 25 }}
              />
            </TouchableOpacity>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: 'white',
                margin: 12,
                bottom: 2
              }}>
              <Image
                source={require('../../assets/images/dostudy.jpg')}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 10,
                  resizeMode: 'cover',
                }}
              />
            </View>
          </View>
        </View>
      </View>


    </View>
  )
}

export default SingleShortVideo

const styles = StyleSheet.create({
  video: {
      width: '100%',
      height: '100%',
      position: 'absolute',
  },

});