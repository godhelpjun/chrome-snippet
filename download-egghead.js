;(() => { "use strict";
    
console.clear();
copy(
    Array.from(document.querySelectorAll(`.bg-base-secondary.flex.items-center a.pointer[href^="https://egghead.io/lessons/"]`))
    .map((a, i) => ({label: `${(i+1).toString().padStart(2, "0")} ${a.text.replace(/[/\\?%*:|"<>]/g, '_')}`, href:a.href}))
    .map(x => `youtube-dl -o "${x.label}.%(ext)s" ${x.href}\n`)
    .join("")
);

})();
