import React from 'react';
import {animateScroll} from 'utils/animateScroll';

interface ScrollToInterface {
  ref: React.MutableRefObject<HTMLDivElement | null>;
  wrapperRef?: React.MutableRefObject<HTMLDivElement | null>;
  duration?: number;
}

const logError = () =>
  console.error(`Invalid element, are you sure you've provided element id or react ref?`);

const getElementPosition = (element: HTMLDivElement) => element.offsetTop;

export const scrollTo = ({ref, wrapperRef, duration = 3000}: ScrollToInterface) => {
  // the position of the scroll bar before the user clicks the button
  const initialPosition: number = wrapperRef?.current
    ? wrapperRef.current.scrollTop
    : window.scrollY;

  if (!ref.current) {
    // log error if the reference passed is invalid
    logError();
    return;
  }

  animateScroll({
    targetPosition: getElementPosition(ref.current),
    initialPosition,
    duration,
    wrapperRef,
  });
};
