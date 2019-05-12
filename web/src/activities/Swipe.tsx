import React from 'react';

interface PropTypes {
  children: any,
  onSwipeLeft: () => void,
  onSwipeRight: () => void,
}

const Swipe: React.FC<PropTypes> = (
  {
    children,
    onSwipeLeft = () => {
    },
    onSwipeRight = () => {
    }
  }: PropTypes) => {

  let mouseX = -1;
  let isMouseDown = false;

  const mouseDown = (e: any) => {
    mouseX = e.pageX;
    isMouseDown = true;
  };

  const mouseUp = (e: any) => {
    if (!isMouseDown) {
      return;
    }

    const distance = e.pageX - mouseX;
    if (Math.abs(distance) < 30) {
      return;
    }

    if (distance < 0) {
      onSwipeLeft();
    } else {
      onSwipeRight();
    }
  };

  let touchX = -1;

  const touchStart = (e: any) => {
    touchX = e.changedTouches[0].pageX;
  };

  const touchEnd = (e: any) => {
    const distance = e.changedTouches[e.changedTouches.length - 1].pageX - touchX;
    if (Math.abs(distance) < 30) {
      return;
    }

    if (distance < 0) {
      onSwipeLeft();
    } else {
      onSwipeRight();
    }
  };

  return (
    <div
      onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseLeave={mouseUp}
      onTouchStart={touchStart} onTouchEnd={touchEnd}
    >
      {children}
    </div>
  )
};

export default Swipe;
