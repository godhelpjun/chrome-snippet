;(function() {
    "use strict";

    const playbackRate = 2.0;
    const playNow = false;
    const copyVideoSrcToClipboard = false;

    console.clear();

    const vs = Array.from(document.querySelectorAll("video"));
    for (const v of vs) {
        v.playbackRate = playbackRate;
        if (playNow) v.play();

        console.log(v.src);
        if (copyVideoSrcToClipboard) try { copy(v.src); } catch(e) { }
    }
}());
