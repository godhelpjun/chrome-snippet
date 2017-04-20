;(() => {"use strict";

try { clear(); } catch(e) { }

// // https://github.com/muicss/loadjs 
// // https://cdnjs.com/libraries/loadjs 
// // 3.4.0
// const loadjs=function(){function n(n,e){n=n.push?n:[n];var t,r,i,o,c=[],s=n.length,h=s;for(t=function(n,t){t.length&&c.push(n),h--,h||e(c)};s--;)r=n[s],i=u[r],i?t(r,i):(o=f[r]=f[r]||[],o.push(t))}function e(n,e){if(n){var t=f[n];if(u[n]=e,t)for(;t.length;)t[0](n,e),t.splice(0,1)}}function t(n,e,r,i){var c,u,f=document,s=r.async,h=(r.numRetries||0)+1,a=r.before||o;i=i||0,/\.css$/.test(n)?(c=!0,u=f.createElement("link"),u.rel="stylesheet",u.href=n):(u=f.createElement("script"),u.src=n,u.async=void 0===s||s),u.onload=u.onerror=u.onbeforeload=function(o){var f=o.type[0];if(c&&"hideFocus"in u)try{u.sheet.cssText.length||(f="e")}catch(n){f="e"}return"e"==f&&(i+=1,i<h)?t(n,e,r,i):void e(n,f,o.defaultPrevented)},a(n,u),f.head.appendChild(u)}function r(n,e,r){n=n.push?n:[n];var i,o,c=n.length,u=c,f=[];for(i=function(n,t,r){if("e"==t&&f.push(n),"b"==t){if(!r)return;f.push(n)}c--,c||e(f)},o=0;o<u;o++)t(n[o],i,r)}function i(n,t,i){var u,f;if(t&&t.trim&&(u=t),f=(u?i:t)||{},u){if(u in c)throw"LoadJS";c[u]=!0}r(n,function(n){n.length?(f.error||o)(n):(f.success||o)(),e(u,n)},f)}var o=function(){},c={},u={},f={};return i.ready=function(e,t){return n(e,function(n){n.length?(t.error||o)(n):(t.success||o)()}),i},i.done=function(n){e(n,[])},i.reset=function(){c={},u={},f={}},i.isDefined=function(n){return n in c},i}();

// const DB_HackerNews = "HackNewsDB";
// const Store_Story = "story";

// loadjs([
//     "https://unpkg.com/store/dist/store.modern.min.js"
// ], "store.js");
// loadjs.ready('store.js', {
//     success() {
       
//     }
// });
// return;

const page = 0;
const pageCount = 5*2;
const timeThreshold = 6*60*60*1000;


;(() => {
    const visitedNews = getVisitedNews();

    fetch(`https://hacker-news.firebaseio.com/v0/topstories.json`).then(res => res.json())
    .then(xs => xs
        .filter(id => !visitedNews.includes(id))
        .slice(page*pageCount, (page+1)*pageCount)
        .reverse()
    )
    .then(xs => Promise.all(xs.map(openStoryById)))
    ;

})();


function getVisitedNews() { return JSON.parse(localStorage.getItem("visitedNews") || "[]") }
function setVisitedNews(ids) { localStorage.setItem("visitedNews", JSON.stringify(ids)); }
function setNewsVisited(id) { setVisitedNews([id].concat(getVisitedNews())) }
function hasVisited(id) { return getVisitedNews().includes[id] }
function getItemLink(id){
    // https://github.com/tastejs/hacker-news-pwas
    return (
        // `https://news.ycombinator.com/item?id=${id}`
        // `https://react-hn.appspot.com/#story/${id}`
        `https://next-news.now.sh/item?id=${id}`
        // `https://hn.kristoferbaxter.com/item/${id}`
    );
}
function isInteresting(story, page) {
    return (
        ((Date.now() - story.time*1000) > timeThreshold) &&
        // (story.score >= page * 10) &&
        true
    );
}

function openStoryById(id) {
    return (
        fetchItem(id)
        .then(story => {
            if (!isInteresting(story, page)) return;
            openStory(story);
        })
    );
}

function openStory(x) {
    console.log(x.id);
    setNewsVisited(x.id);

    window.open(getItemLink(x.id), "_blank");
    if (!!x.url) window.open(x.url, "_blank");
}

function fetchItem(id) {
    return (
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        .then(res => res.json())
    );
}
})();
