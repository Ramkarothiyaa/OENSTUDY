import React, { useState, useEffect } from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  Text,
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import Header from '../../components/shared/header/Header';
import { styles } from '../../assets/css/DashBoardCss/DashboardStyle';
import { useToast } from 'react-native-toast-notifications';
import { useNavigation } from '@react-navigation/native';
import DashboardShimmer from '../../components/shared/Shimmer/DashboardShimmer';
import CarouselFile from '../../components/shared/Carousel/CarouselFile';
import { DashBoardFlateList } from '../../components/shared/FlateLists/DashboardFlatList/DashBoardFlateList';
import { getCarousel } from '../../repository/DashboardRepository/DashboardRep';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import { getSettingDetails } from '../../repository/SettingRepository/SettingRepo';
import AdsCarouselFile from '../../components/shared/Carousel/AdsCarouselFile';
import { StoreDatatoAsync } from '../../repository/AsyncStorageServices';
import ShortVideo from '../ShortVideo/ShortVideo';

export default function Dashboard(props) {
  const toast = useToast();
  const navigation = useNavigation();
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const [loader, setLoader] = useState(true);

  var data = [
    {
      id: 1,
      // image: require('../../assets/images/classes.png'),
      image: require('../../assets/images/classes7.png'),
      name: 'Classes',
      onpress1: "Classes",
      touch: false,
    },
    {
      id: 2,
      image: require('../../assets/images/preparation2.png'),
      name: 'Preparation',
      onpress1: "Preparation",
      touch: false,
    },
    {
      id: 3,
      image: require('../../assets/images/course2.png'),
      name: 'Courses',
      onpress1: "Courses",
      touch: false,
    },
    {
      id: 4,
      image: require('../../assets/images/english1.png'),
      name: 'English Books',
      onpress: "EnglishBooks",
      touch: false,
    },
    {
      id: 5,
      image: require('../../assets/images/hindi2.png'),
      name: 'Hindi Books',
      onpress: "HindiBooks",
      touch: false,
    },
    // {
    //   id: 6,
    //   image: require('../../assets/images/youtube.png'),
    //   name: 'YouTube Classes',
    //   onpress1: "YouTube_Classes",
    //   touch: false,
    // },
    {
      id: 9,
      image: require('../../assets/images/result1.png'),
      name: 'Results',
      onpress: "Result",
      touch: false,
    },
    {
      id: 7,
      image: require('../../assets/images/liveclass.png'),
      name: 'Live Classes', 
      onpress: "",
      touch: true,
    },
    {
      id: 8,
      image: require('../../assets/images/estore.png'),
      name: 'E-Stores',
      onpress: "",
      touch: true,
    },
    {
      id: 10,
      image: require('../../assets/images/motivation_ve.png'),
      name: 'Motivational Videos',
      onpress: "",
      touch: true,
    },
  ]

  const [carouselData, setCarouselData] = useState([]);
  const [adsData, setAdsData] = useState([]);

  const handleCarousel = async () => {
    try {
      var res = await getCarousel();
      if (res.status === true) {
        setCarouselData(res.data);
        setLoader(false)
      } else {
        setLoader(false)
      }
    } catch (e) {
      setLoader(false)
      console.log('errrror in..handleCarousel page-->', e);
      toast.show('Something went wrong!, Try again later.', {
        type: 'danger',
        placement: 'bottom',
        duration: 1000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  const handleSettingDetails = async () => {
    try {
      var res = await getSettingDetails();
      if (res.status === true) {
        var AdsData = res.data.ads;
        setAdsData(Object.values(AdsData))
        await StoreDatatoAsync('@AdsData', JSON.stringify(Object.values(AdsData)));
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
      console.log("Error..in  getSettingDetails...", e)
    }
  };

  useEffect(() => {
    handleCarousel()
    handleSettingDetails()
  }, [])


  return (
    <View style={{ ...styles.bg, backgroundColor: themecolor.DeepSkyBlue2}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
      />

      <Header title="Home" />

      {loader ? (
        <LoadingFullScreen style={{ flex: 1 }} />
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ ...styles.bdContainter }} >

              <View style={styles.mgT10} />

              <View style={{
                ...styles.adsContainer,
              }}>
                <CarouselFile data={carouselData} />
              </View>

              <View style={styles.mgT10} />
              <View style={{ ...styles.ViewHeading ,}}>
                <DashBoardFlateList data={data} />
              </View>

              <View style={styles.mgT10} />
              <View style={{ ...styles.ViewHeading ,}}>
                <ShortVideo  />
              </View>


              {adsData.length > 0 ?
                <View style={{
                  ...styles.adsContainer,
                }}>
                  <AdsCarouselFile data={adsData} />
                </View>
                : <></>}

            </View>

            <View style={{ marginVertical: 5 }} />
          </ScrollView>
        </>
      )}
    </View>
  );
}



// Text to Speech Conversion with Natural Voices in React Native
// https://aboutreact.com/react-native-text-to-speech/

// import React in our code
// import React, {useState, useEffect} from 'react';

// // import all the components we are going to use
// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   TextInput,
//   Keyboard,
//   TouchableOpacity,
// } from 'react-native';

// // import slider for the tuning of pitch and speed
// import Slider from '@react-native-community/slider';

// // import Tts Text to Speech
// import Tts from 'react-native-tts';

// const App = () => {
//   const [voices, setVoices] = useState([]);
//   const [ttsStatus, setTtsStatus] = useState('initiliazing');
//   const [selectedVoice, setSelectedVoice] = useState(null);
//   const [speechRate, setSpeechRate] = useState(0.5);
//   const [speechPitch, setSpeechPitch] = useState(1);
//   const [text,setText] = useState('Enter Text like Hello About React');

//   useEffect(() => {
//     Tts.addEventListener(
//       'tts-start',
//       (_event) => setTtsStatus('started')
//     );
//     Tts.addEventListener(
//       'tts-finish',
//       (_event) => setTtsStatus('finished')
//     );
//     Tts.addEventListener(
//       'tts-cancel',
//       (_event) => setTtsStatus('cancelled')
//     );
//     Tts.setDefaultRate(speechRate);
//     Tts.setDefaultPitch(speechPitch);
//     Tts.getInitStatus().then(initTts);
//     return () => {
//       Tts.removeEventListener(
//         'tts-start',
//         (_event) => setTtsStatus('started')
//       );
//       Tts.removeEventListener(
//         'tts-finish',
//         (_event) => setTtsStatus('finished'),
//       );
//       Tts.removeEventListener(
//         'tts-cancel',
//         (_event) => setTtsStatus('cancelled'),
//       );
//     };
//   }, []);

//   const initTts = async () => {
//     const voices = await Tts.voices();
//     const availableVoices = voices
//       .filter((v) => !v.networkConnectionRequired && !v.notInstalled)
//       .map((v) => {
//         return {id: v.id, name: v.name, language: v.language};
//       });
//     let selectedVoice = null;
//     if (voices && voices.length > 0) {
//       selectedVoice = voices[0].id;
//       try {
//         await Tts.setDefaultLanguage(voices[0].language);
//       } catch (err) {
//         //Samsung S9 has always this error:
//         //"Language is not supported"
//         console.log(`setDefaultLanguage error `, err);
//       }
//       await Tts.setDefaultVoice(voices[0].id);
//       setVoices(availableVoices);
//       setSelectedVoice(selectedVoice);
//       setTtsStatus('initialized');
//     } else {
//       setTtsStatus('initialized');
//     }
//   };

//   const readText = async () => {
//     Tts.stop();
//     Tts.speak(text);
//   };

//   const updateSpeechRate = async (rate) => {
//     await Tts.setDefaultRate(rate);
//     setSpeechRate(rate);
//   };

//   const updateSpeechPitch = async (rate) => {
//     await Tts.setDefaultPitch(rate);
//     setSpeechPitch(rate);
//   };

//   const onVoicePress = async (voice) => {
//     try {
//       await Tts.setDefaultLanguage(voice.language);
//     } catch (err) {
//       // Samsung S9 has always this error: 
//       // "Language is not supported"
//       console.log(`setDefaultLanguage error `, err);
//     }
//     await Tts.setDefaultVoice(voice.id);
//     setSelectedVoice(voice.id);
//   };

//   const renderVoiceItem = ({item}) => {
//     return (
//       <TouchableOpacity
//         style={{
//           backgroundColor: selectedVoice === item.id ? 
//           '#DDA0DD' : '#5F9EA0',
//         }}
//         onPress={() => onVoicePress(item)}>
//         <Text style={styles.buttonTextStyle}>
//           {`${item.language} - ${item.name || item.id}`}
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.container}>
//         <Text style={styles.titleText}>
//           Text to Speech Conversion with Natural Voices
//         </Text>
//         <View style={styles.sliderContainer}>
//           <Text style={styles.sliderLabel}>
//             {`Speed: ${speechRate.toFixed(2)}`}
//           </Text>
//           <Slider
//             style={styles.slider}
//             minimumValue={0.01}
//             maximumValue={0.99}
//             value={speechRate}
//             onSlidingComplete={updateSpeechRate}
//           />
//         </View>
//         <View style={styles.sliderContainer}>
//           <Text style={styles.sliderLabel}>
//             {`Pitch: ${speechPitch.toFixed(2)}`}
//           </Text>
//           <Slider
//             style={styles.slider}
//             minimumValue={0.5}
//             maximumValue={2}
//             value={speechPitch}
//             onSlidingComplete={updateSpeechPitch}
//           />
//         </View>
//         <Text style={styles.sliderContainer}>
//           {`Selected Voice: ${selectedVoice || ''}`}
//         </Text>
//         <TextInput
//           style={styles.textInput}
//           onChangeText={(text) => setText(text)}
//           value={text}
//           onSubmitEditing={Keyboard.dismiss}
//         />
//         <TouchableOpacity
//           style={styles.buttonStyle}
//           onPress={readText}>
//           <Text style={styles.buttonTextStyle}>
//             Click to Read Text ({`Status: ${ttsStatus || ''}`})
//           </Text>
//         </TouchableOpacity>
//         <Text style={styles.sliderLabel}>
//           Select the Voice from below
//         </Text>
//         <FlatList
//           style={{width: '100%', marginTop: 5}}
//           keyExtractor={(item) => item.id}
//           renderItem={renderVoiceItem}
//           extraData={selectedVoice}
//           data={voices}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     padding: 5,
//   },
//   titleText: {
//     fontSize: 22,
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   buttonStyle: {
//     justifyContent: 'center',
//     marginTop: 15,
//     padding: 10,
//     backgroundColor: '#8ad24e',
//   },
//   buttonTextStyle: {
//     color: '#fff',
//     textAlign: 'center',
//   },
//   sliderContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 300,
//     padding: 5,
//   },
//   sliderLabel: {
//     textAlign: 'center',
//     marginRight: 20,
//   },
//   slider: {
//     flex: 1,
//   },
//   textInput: {
//     borderColor: 'gray',
//     borderWidth: 1,
//     color: 'black',
//     width: '100%',
//     textAlign: 'center',
//     height: 40,
//   },
// });