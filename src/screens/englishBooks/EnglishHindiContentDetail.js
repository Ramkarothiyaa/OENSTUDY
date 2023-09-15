import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Dimensions, Text, BackHandler, StatusBar, ScrollView,useWindowDimensions
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useToast } from 'react-native-toast-notifications';
import Header from '../../components/shared/header/Header';
import LoadingFullScreen from '../../components/shared/Loader/LoadingFullScreen';
import NoDataMsg from '../../components/shared/NoData/NoDataMsg';
import { styles } from '../../assets/css/EnglishandHindiBooksCss/EnglishandHindiStyle'
import HalfSizeButton from '../../components/shared/button/halfSizeButton';
import IC from 'react-native-vector-icons/Ionicons';
import Tts from 'react-native-tts';
import HTML from 'react-native-render-html';

const { width, height } = Dimensions.get('screen');

export default function EnglishHindiContentDetail(props) {

    const { contentWidth } = useWindowDimensions();


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
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor();

    const [loader, setLoader] = useState(true);
    const [data, setData] = useState([]);
    const [speckerOnStop, setSpeckerOnStop] = useState(0);

    const [activeIndex, setActiveIndex] = useState(-1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [recognizedText, setRecognizedText] = useState('');

    const htmlData = [
        "<p><a href=\"https://en.wikipedia.org/wiki/Cricket\">international cricketer</a> and the former captain of the <a href=\"https://en.wikipedia.org/wiki/India_national_cricket_team\">Indian national cricket team</a> who plays as a right-handed <a href=\"https://en.wikipedia.org/wiki/Batting_(cricket)\">batsman</a> for <a href=\"https://en.wikipedia.org/wiki/Royal_Challengers_Bangalore\">Royal Challengers Bangalore</a> in the <a href=\"https://en.wikipedia.org/wiki/Indian_Premier_League\">IPL</a> and for <a href=\"https://en.wikipedia.org/wiki/Delhi_cricket_team\">Delhi</a> in Indian domestic cricket. Widely</p>",
        "<p>&nbsp;regarded as one of the greatest batsmen of all time, and the best of the current generation <a href=\"https://en.wikipedia.org/wiki/Virat_Kohli#cite_note-indiatoday.intoday.in-4\">[4]</a> Kohli holds the records for scoring most runs in <a href=\"https://en.wikipedia.org/wiki/Twenty20_International\">T20 internationals</a> and in the IPL. In 2020, the <a href=\"https://en.wikipedia.org/wiki/International_Cricket_Council\">International Cricket Council</a> named him the <a href=\"https://en.wikipedia.org/wiki/ICC_Awards_of_the_Decade\">male cricketer of the decade</a>.&nbsp;</p>", "<p>Kohli has also contributed to India's successes, including winning the <a href=\"https://en.wikipedia.org/wiki/2011_Cricket_World_Cup\">2011 World Cup</a> and the <a href=\"https://en.wikipedia.org/wiki/2013_ICC_Champions_Trophy\">2013 Champions trophy</a>.</p>", "<p>Born and raised in New Delhi, Kohli trained at the <a href=\"https://en.wikipedia.org/wiki/West_Delhi_Cricket_Academy\">West Delhi Cricket Academy</a> and started his youth career with the Delhi Under-15 team.</p>", "<p>&nbsp;He made his international debut in 2008 and quickly became a key player in the ODI team and later made his Test debut in 2011. In 2013, Kohli reached the number one spot in the <a href=\"https://en.wikipedia.org/wiki/ICC_Men%27s_Player_Rankings\">ICC rankings</a> for ODI batsmen for the first time. During <a href=\"https://en.wikipedia.org/wiki/2014_ICC_World_Twenty20\">2014 T20 World Cup</a>, he set a record for the most runs scored in the tournament. In 2018, he achieved yet another milestone, becoming the world's top-ranked Test batsman, making him the only Indian cricketer to hold the number one spot in all three formats of the game. His form continued in 2019, when he became the first player to score 20,000 international runs in a single decade. In 2021, Kohli made the decision to step down as the captain of the Indian national team for T20Is, following the T20 World Cup and in early 2022 he stepped down as the captain of the Test team as well.</p>", "</p>"]


    const activeIndexRef = useRef(activeIndex);

    useEffect(() => {
        activeIndexRef.current = activeIndex;
    }, [activeIndex]);

    useEffect(() => {
        Tts.addEventListener('tts-finish', handleTTSFinish);

        return () => {
            Tts.removeEventListener('tts-finish', handleTTSFinish);
        };
    }, []);


    const fetchAndSetVoice = async () => {
        try {
            const voices = await Tts.voices();
            const desiredVoice = voices.find(voice => voice.id === 'hi-in-x-hid-local');
            if (desiredVoice) {
                Tts.setDefaultLanguage(desiredVoice.language)
                Tts.setDefaultVoice(desiredVoice.id);
            } else {
                console.warn('Desired voice not found');
            }
        } catch (error) {
            console.error('Error fetching available voices:', error);
        }
    };

    useEffect(() => {
        fetchAndSetVoice()
    }, [])

    const handlePlay = (index) => {
        Tts.stop();
        setActiveIndex(index);
        setIsPlaying(true);
        setRecognizedText('');
        Tts.speak(htmlData[index].replace(/<[^>]+>/g, ''));
        setSpeckerOnStop(1)
    };

    const handleTTSFinish = () => {
        const currentActiveIndex = activeIndexRef.current;
        if (currentActiveIndex !== -1 && currentActiveIndex < htmlData.length - 1) {
            handlePlay(currentActiveIndex + 1);
        } else {
            setIsPlaying(false);
            setActiveIndex(-1);
            setSpeckerOnStop(0)
        }
    };

    const handleStop = () => {
        Tts.stop();
        setIsPlaying(false);
        setActiveIndex(-1);
        setSpeckerOnStop(0)
    };

    const handleTextClick = (index) => {
        Tts.stop();
        setActiveIndex(index);
        setRecognizedText('');
        if (index >= 0 && index < htmlData.length) {
            Tts.speak(htmlData[index].replace(/<[^>]+>/g, ''));
            setSpeckerOnStop(1)
        }
    };



    return (
        <View style={{ ...styles.bg, backgroundColor: themecolor.THEMECOLOR }}>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
            />

            <Header title="EnglishHindiContentDetail" backIcon={true}
                onPressBack={() => handleBackButtonClick()} />

            {loader ? (
                <LoadingFullScreen style={{ flex: 1 }} />
            ) : (
                <>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View
                            style={{
                                ...styles.container,
                            }}>

                            <Text>ijiiioi</Text>

                            {htmlData.map((html, index) => (
                                <TouchableOpacity key={index} onPress={() => handleTextClick(index)}>
                                    <HTML
                                        contentWidth={contentWidth}
                                        source={{ html: html }}
                                        enableExperimentalBRCollapsing={true}
                                        enableExperimentalGhostLinesPrevention={true}
                                        defaultViewProps={{ width: width * 0.9 }}
                                        style={{
                                            fontSize: 16,
                                            fontWeight: activeIndex === index ? 'bold' : 'normal',
                                            color: activeIndex === index ? 'red' : '#000',
                                        }}
                                        tagsStyles={{
                                            p: {
                                                fontSize: 16,
                                                color: activeIndex === index ? 'red' : '#000',
                                                textAlign: 'left',
                                                fontWeight: activeIndex === index ? 'bold' : 'normal',
                                                height: 'auto',
                                                width: "100%",
                                            },
                                            h2: {
                                                fontSize: 16,
                                                color: activeIndex === index ? 'red' : '#000',
                                                textAlign: 'left',
                                                fontWeight: activeIndex === index ? 'bold' : 'normal',
                                                height: 'auto',
                                                width: "100%",
                                            },
                                            ul: {
                                                fontSize: 16,
                                                color: "#000",
                                                height: 'auto',
                                                width: "100%",
                                            },
                                            li: {
                                                fontSize: 16,
                                                color: "#000",
                                                textAlign: 'left',
                                                height: 'auto',
                                                width: "100%",
                                            },
                                            span: {

                                                height: 'auto',
                                                width: "100%",
                                            },
                                            body: {
                                                height: 'auto',
                                                width: "100%",
                                            },
                                        }}
                                    />
                                </TouchableOpacity>
                            ))}




                            <View style={{ ...styles.MT10 }} />

                        </View>
                    </ScrollView>


                    <View
                        style={{
                            ...styles.touchview,
                        }}>
                        <View style={{ ...styles.mainView, backgroundColor: themecolor.LOGINTHEMECOLOR1, borderColor: themecolor.BOXBORDERCOLOR1, elevation: 3 }}>
                            {speckerOnStop === 1 ?
                                <HalfSizeButton
                                    title=""
                                    icon={<IC name="ios-volume-mute-outline" size={35} color={themecolor.TEXTRED} />}
                                    onPress={() => handleStop()}
                                    backgroundColor={'transparent'}
                                    borderColor={'transparent'}
                                />
                                : <HalfSizeButton
                                    title=""
                                    icon={<IC name="ios-volume-high-outline" size={35} color={themecolor.BACKICON} />}
                                    onPress={() => handlePlay(0)}
                                    backgroundColor={'transparent'}
                                    borderColor={'transparent'}
                                />
                            }
                        </View>

                    </View>

                </>
            )}
        </View>
    );
}
