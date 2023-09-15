import * as React from 'react';
import { View, Text,Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  TransitionSpecs,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { MainNavigatorstyle } from '../../assets/css/MainNavigatorstyle';
import Dashboard from '../../screens/dashboard/Dashboard';
import FA from 'react-native-vector-icons/FontAwesome';
import AD from 'react-native-vector-icons/AntDesign';
import Ii from 'react-native-vector-icons/Ionicons';
import OI from 'react-native-vector-icons/Octicons';
import Profile from '../../screens/profile/Profile';
import Support from '../../screens/support/Support';
import Discussion from '../../screens/discussion/Discussion';
import DiscussionTopic from '../../screens/discussion/DiscussionTopic';
import Reels from '../../screens/Reels/ReelsVideo';
import Classes from '../../screens/classes/Classes';
import Result from '../../screens/result/Result';
import RS from 'react-native-vector-icons/Foundation';

const Tab = createBottomTabNavigator();
const MyTransition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
};

export default function BottomNavigationStack(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();


  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 51,
          backgroundColor: themecolor.LOGINTHEMECOLOR1,
          borderColor: themecolor.BOXBORDERCOLOR,
          keyboardHidesTabBar: true,
          labelStyle: MainNavigatorstyle.tab1,
          style: MainNavigatorstyle.tab2,
          animationEnabled: true,
          inactiveTintColor: Colors.gray,
          activeTintColor: themecolor.HEADERTHEMECOLOR,
          showLabel: false,
          fontFamily: FontFamily.PopinsMedium,
          headerShown: false,

        },
      }}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          MyTransition,
          tabBarLabel: '',
          tabBarLabelStyle: { top: -4, },
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <>
                <AD name="home" color={themecolor.Moderategreen} size={30} />
                {/* <View
                  style={{
                    ...MainNavigatorstyle.tabbarbottomborder,
                    backgroundColor: themecolor.BACKICON,
                  }}
                /> */}
                <Text
                  allowFontScaling={false}
                  style={{
                    ...MainNavigatorstyle.abelstylecss2,
                    color: themecolor.Moderategreen,
                  
                  }}>
                  ______
                </Text>
              </>
            ) : (
              <>
                <AD name="home" size={30} color={themecolor.DeepSkyBlue} />
                <Text
                  allowFontScaling={false}
                  style={{
                    ...MainNavigatorstyle.abelstylecss2,
                    color: themecolor.DeepSkyBlue,
                  }}>
                  
                </Text>
              </>
            ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="DiscussionTopic"
        component={DiscussionTopic}
        options={{
          MyTransition,
          tabBarLabel: ' ',
          tabBarLabelStyle: { bottom: -5 },
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <>
                <Ii name="chatbubbles-outline" color={themecolor.Moderategreen} size={30} />
                <Text
                  allowFontScaling={false}
                  style={{
                    ...MainNavigatorstyle.abelstylecss2,
                    color: themecolor.Moderategreen,
                  }}>
                  ______
                </Text>
              </>
            ) : (
              <>
                <Ii name="chatbubbles-outline" size={30} color={themecolor.DeepSkyBlue} />
                <Text
                  allowFontScaling={false}
                  style={{
                    ...MainNavigatorstyle.abelstylecss2,
                    color: themecolor.DeepSkyBlue,
                  }}>
                
                </Text>
              </>
            ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name={"Reels"}
        component={Reels}
        options={{
          MyTransition,
          tabBarLabel: ' ',
          tabBarLabelStyle: { bottom: -5 },
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <>
              <View style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 15,
                  backgroundColor: '#00afef',
                  elevation: 6,
                  borderRadius: 100,
                  width: '70%',
                  height: '150%'
                }}>

                <View style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 1,
                  backgroundColor: '#fff',
                  elevation: 12,
                  borderRadius: 100,
                  width: '78%',
                  height: '78%'
                }}>
                  <Image
                    source={require('../../assets/images/allvideos.png')}
                    resizeMode="contain"
                    style={{
                      width: 50,
                      height: 50,
                      // tintColor:  '#fff',
                    }}
                  />
                </View>
              </View>

              </>
            ) : (
              <>
                <View style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 15,
                  backgroundColor: '#fff',
                  elevation: 12,
                  borderRadius: 100,
                  width: '70%',
                  height: '150%'
                }}>
                  <Image
                    source={require('../../assets/images/allvideos.png')}
                    resizeMode="contain"
                    style={{
                      width: 55,
                      height: 55,
                      // tintColor:  '#fff',
                    }}
                  />
                  
                </View>
              </>
            ),
          headerShown: false,
        }}


      // options={{
      //     tabBarIcon: ({focused}) => (
      //       <View
      //         style={{
      //           alignItems: 'center',
      //           justifyContent: 'center',
      //           marginBottom: 30,
      //           backgroundColor: '#fff',
      //           elevation: 9,
      //           borderRadius: 100,
      //           width: '60%',
      //           height: '100%',
      //         }}>
      //         {/* <Image
      //           // source={require('../../assets/Image/com.png')}
      //           resizeMode="contain"
      //           style={{
      //             width: 80,
      //             height: 80,
      //             // tintColor:  '#fff',
      //           }}
      //         /> */}
      //         {/* <Text
      //           style={{
      //             color: focused ? '#74b9ff' : '#748c94',
      //             fontSize: 12,
      //           }}>
      //          Post
      //         </Text> */}
      //       </View>
      //     ),
      //   }}

      />


      <Tab.Screen
        name={"Profile"}
        component={Profile}
        options={{
          MyTransition,
          tabBarLabel: ' ',
          tabBarLabelStyle: { bottom: -3 },
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <>
                <FA name="user-o" color={themecolor.Moderategreen} size={27} />
                <Text
                  allowFontScaling={false}
                  style={{
                    ...MainNavigatorstyle.abelstylecss2,
                    color: themecolor.Moderategreen,
                  }}>
              ______
                </Text>
              </>
            ) : (
              <>
                <FA name="user-o" size={27} color={themecolor.DeepSkyBlue} />
                <Text
                  allowFontScaling={false}
                  style={{
                    ...MainNavigatorstyle.abelstylecss2,
                    color: themecolor.DeepSkyBlue,
                  }}>
                  
                </Text>
              </>
            ),
          headerShown: false,
        }}
      />


      <Tab.Screen
        name={"Result"}
        component={Result}
        options={{
          MyTransition,
          tabBarLabel: ' ',
          tabBarLabelStyle: { bottom: -5 },
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <>
                <RS name="results" color={themecolor.Moderategreen} size={30} />
                <Text
                  allowFontScaling={false}
                  style={{
                    ...MainNavigatorstyle.abelstylecss2,
                    color: themecolor.Moderategreen,
                  }}>
                ______
                </Text>
              </>
            ) : (
              <>
                <RS name="results" size={30} color={themecolor.DeepSkyBlue} />
                <Text
                  allowFontScaling={false}
                  style={{
                    ...MainNavigatorstyle.abelstylecss2,
                    color: themecolor.DeepSkyBlue,
                  }}>
                  
                </Text>
              </>
            ),
          headerShown: false,
        }}
      />






    </Tab.Navigator>
  );
}
