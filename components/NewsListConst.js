const isMobileDevice = typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1;
const NewsListConst = {
    NEWS: {
        urlSuffix: `news?images=${!isMobileDevice}`
    },
    TECH: {
        urlSuffix: `tech-and-science?images=${!isMobileDevice}`
    },
    PROGRAMMING: {
        urlSuffix: `programming?images=${!isMobileDevice}`
    }
};

export { NewsListConst, isMobileDevice };