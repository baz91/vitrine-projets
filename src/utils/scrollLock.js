export const useScrollLock = () => {
  let scrollPosition = 0;

  const lockScroll = () => {
    scrollPosition = window.scrollY;
    document.documentElement.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = "100%";
  };

  const unlockScroll = () => {
    document.documentElement.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo(0, scrollPosition);
  };

  return { lockScroll, unlockScroll };
};
