function throttleScroll(func, timeFrame) {
    let lastTime = 0;
    return function () {
        const now = new Date();
        if (now - lastTime >= timeFrame) {
            func();
            lastTime = now;
        }
    };
  }

export default throttleScroll;