import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import ReelsComponent from './ReelsComponent';

const ReelsVideo = () => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    return (
        <View style={{
            width: windowWidth,
            height: windowHeight,
            backgroundColor: 'white',
            position: 'relative',
            backgroundColor: 'black',
        }}>
            <View style={styles.container}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                    Reels
                </Text>
                <Feather name="camera" style={{ fontSize: 25, color: 'white' }} />
            </View>
            <ReelsComponent />
        </View>
    );
};

export default ReelsVideo;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 1,
        padding: 20,
    },

});
