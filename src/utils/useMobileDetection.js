import { useState, useEffect } from 'react';

const detectMobile = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /android|iPad|iPhone|iPod/i.test(userAgent);
};

const useMobileDetection = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (detectMobile()) {
            setIsMobile(true);
        }
    }, []);

    return isMobile;
};

export default useMobileDetection;
