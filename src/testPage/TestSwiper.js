import React, { useState } from 'react';
import Swiper from 'react-id-swiper';
 
const ManipulatingSwiper = () => {
  const [swiper, updateSwiper] = useState(null);

  const params = {
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
        }
    }
 
  const goNext = () => {
    if (swiper !== null) {
      swiper.slideNext();
    }
  };
 
  const goPrev = () => {
    if (swiper !== null) {
      swiper.slidePrev();
    }
  };

 
  return (
    <div className = 's-con'>
      <Swiper {...params} getSwiper={updateSwiper}>
        <div className = 's-con'>Slide 1</div>
        <div className = 's-con'>Slide 2</div>
        <div className = 's-con'>Slide 3</div>
        <div className = 's-con'>Slide 4</div>
        <div className = 's-con'>Slide 5</div>
      </Swiper>
      <button onClick={goPrev}>Prev</button>
      <button onClick={goNext}>Next</button>
    </div>
  );
};
 
export default ManipulatingSwiper;