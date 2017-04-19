;(function() {
    "use strict";
    
    const page = 0;
    const pageCount = 20;
    const timeThreshold = 6*60*60*1000;
    
    try { clear(); } catch(e) { }
    
    fetch(`https://hacker-news.firebaseio.com/v0/topstories.json`).then(res => res.json())
    .then(xs => Promise.all(xs.slice(page*pageCount, (page+1)*pageCount).map(fetchItem)))
    .then(xs => xs.filter(x => isInteresting(x, page)))
    .then(xs => xs.reverse().forEach(openStory))
    ;
    
    function isInteresting(story, page) {
        return (
            ((Date.now() - story.time*1000) > timeThreshold) &&
            (story.score >= page * 10)
        );
    }
    
    function openStory(x) {
        // https://github.com/tastejs/hacker-news-pwas

        window.open(
            // `https://news.ycombinator.com/item?id=${x.id}`
            // `https://react-hn.appspot.com/#story/${x.id}`
            // `https://next-news.now.sh/item?id=${x.id}`
            `https://hn.kristoferbaxter.com/item/${x.id}`
            , "_blank");
        window.open(x.url, "_blank");
    }

    function fetchItem(id) {
        return (
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())
        );
    }
})();
