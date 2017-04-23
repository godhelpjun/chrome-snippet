/*

This script copy to clipboard a list of command to download egghead.io videos using youtube-dl.

*/

;(() => { "use strict";
    
console.clear();
copy(
    Array.from(document.querySelectorAll(".cell-lesson-title .title a"))
    .map((a, i) => ({label: `${(i+1).toString().padStart(2, "0")} ${a.text.replace(/[/\\?%*:|"<>]/g, '_')}`, href:a.href}))
    .map(x => `youtube-dl -o "${x.label}.%(ext)s" ${x.href}`)
    .join("\n")
);

})();
