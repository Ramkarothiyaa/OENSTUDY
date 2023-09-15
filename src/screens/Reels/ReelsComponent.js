import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { videoData } from './Card';
import SingleReel from './SingleReel';
import { getReelsVideo } from '../../repository/ReelsVideo/ReelsViewRes';
import { useToast } from 'react-native-toast-notifications';

const ReelsComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [DataVideo, setDataVideo] = useState([]);
  const toast = useToast();

  const handleChangeIndexValue = ({ index }) => {
    setCurrentIndex(index);
  };

  const handleReelsVideo = async () => {
    try {
      var res = await getReelsVideo();
      // console.log("handleGetreeelssss.....++++.", res)
      if (res.status === true) {
        setDataVideo(res.data)
      }
    } catch (e) {
      console.log('errrror in..handleResults page-->', e);
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
    handleReelsVideo();
  }, []);


  return (
    <SwiperFlatList
      vertical={true}
      onChangeIndex={handleChangeIndexValue}
      data={DataVideo}
      renderItem={({ item, index }) => (
        <SingleReel item={item} index={index} currentIndex={currentIndex} />
      )}
      keyExtractor={(item, index) => index}
    />
  );
};

export default ReelsComponent;