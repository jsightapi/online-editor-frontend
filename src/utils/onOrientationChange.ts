export const onOrientationChange = (onChange: () => void) => {
  if ('onorientationchange' in window) {
    window.addEventListener(
      'orientationchange',
      () => {
        onChange();
      },
      false
    );
  } else if ('onresize' in window) {
    window.addEventListener(
      'resize',
      () => {
        onChange();
      },
      false
    );
  }
};
