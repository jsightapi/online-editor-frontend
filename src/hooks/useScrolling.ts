import React, {useEffect, useState} from 'react';

const createScrollStopListener = (
  mainContent: HTMLDivElement | null,
  handleScroll: () => void,
  handleStopScroll: () => void
) => {
  let removed = false;
  let handle: NodeJS.Timeout | null = null;

  const onScroll = () => {
    handleScroll();
    if (handle) {
      clearTimeout(handle);
    }
    handle = setTimeout(handleStopScroll, 500); // default 200 ms
  };

  mainContent?.addEventListener('scroll', onScroll);

  return () => {
    if (removed) {
      return;
    }
    removed = true;
    if (handle) {
      clearTimeout(handle);
    }
    mainContent?.removeEventListener('scroll', onScroll);
  };
};

export function useScrolling(mainContentRef: React.MutableRefObject<HTMLDivElement | null>) {
  const [scrolling, setScrolling] = useState<boolean>(false);

  useEffect(() => {
    const destroyListener = createScrollStopListener(
      mainContentRef.current,
      () => {
        setScrolling(true);
      },
      () => {
        setScrolling(false);
      }
    );

    return () => destroyListener(); // when App component is unmounted
  }, [mainContentRef]);

  return scrolling;
}
