;(function() {
    console.clear();

    const playbackRate = 1.5;
    const fraction = 0.0;

    autoPlay();

    function playAll() {
        const vs = Array.from(document.querySelectorAll("video"));
        for (var v of vs) {
            v.playbackRate = playbackRate;
            v.play();
        }
    }

    function autoPlay() {
        window.addEventListener('scroll', checkScroll, false);
        window.addEventListener('resize', checkScroll, false);
        checkScroll();
    }

    function checkScroll() {
        const vs = document.querySelectorAll("video");
        for (const video of vs) {
            video.playbackRate = playbackRate;

            // const visible = getElementVisible(video);
            // if (visible > fraction) {
            if (isScrolledIntoView(video)) {
                console.log(video);
                video.play();
            } else {
                video.pause();
            }   
        }
    }

    function getElementVisible(video) {
        const x = video.offsetLeft,
              y = video.offsetTop,
              w = video.offsetWidth,
              h = video.offsetHeight,
              r = x + w, //right
              b = y + h //bottom
        ;

        const visibleX = Math.max(0, Math.min(w, window.pageXOffset + window.innerWidth - x, r - window.pageXOffset));
        const visibleY = Math.max(0, Math.min(h, window.pageYOffset + window.innerHeight - y, b - window.pageYOffset));

        return visibleX * visibleY / (w * h);
    }

    function isScrolledIntoView(el) {
        const elemTop = el.getBoundingClientRect().top;
        const elemBottom = el.getBoundingClientRect().bottom;

        const isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
        return isVisible;
    }
})();
