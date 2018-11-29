'use strict';
let configLimitNumber = configSettingConfig.rangenews;
function makeNewsList(json) {
    let list = document.getElementById("button-contain");
    let countJSON = json.appnews.newsitems.length <= configLimitNumber ? json.appnews.newsitems.length : configLimitNumber;
    for(let i = 0; i < countJSON; i++) {
        list.innerHTML += '<section class="boxing square effect tooltip"' +
        'title="' + json.appnews.newsitems[i].contents + '">' +
        '<a target="_blank" href="' + json.appnews.newsitems[i].url + '">' +
        '<section class="img"><img src="img/newsfeedname/' + getImage(json.appnews.newsitems[i].feedname) + '.jpg" alt="NewsImage"></section>' +
        '<section class="info">' +
        '<h3 style="font-size: 2.5vh;">' + json.appnews.newsitems[i].title + '</h3>' +
        '<p style="font-size: 2vh;">From:' + json.appnews.newsitems[i].feedlabel + '<br/>' +
        'Author:' + (json.appnews.newsitems[i].author === "" ? 'Unknown' : json.appnews.newsitems[i].author) + '</p>' +
        '</section></a></section>';
    }
}
function getImage(objJSON) {
    if(objJSON === "rps")
        return "rps";
    else if(objJSON === "pcgamer")
        return "pcgamer";
    else if(objJSON === "steam_community_announcements")
        return "steam_community_announcements";
    else 
        return "unknown";
}
if(navigator.onLine) 
    getFetch("https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=583950&count=50&maxlength=25&format=json", makeNewsList);
else 
    getFetch("json/getnews.json", makeNewsList);