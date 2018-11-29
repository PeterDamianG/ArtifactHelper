'use strict';
let configLimitNumber = configSettingConfig.rangechangelogs;
function makeChangeLogs(json) {
    let list = document.getElementsByClassName("timeline__group")[0];
    let countJSON = json.changelogsitems.length <= configLimitNumber ? json.changelogsitems.length : configLimitNumber;
    for(let i = 0; i < countJSON; i++) {
        list.innerHTML += '<section class="timeline__box">' +
        '<section class="timeline__date">' +
        '<span class="timeline__day">' + json.changelogsitems[i].day + '</span>' +
        '<span class="timeline__month">' + json.changelogsitems[i].month + '</span></section>'+
        '<section class="timeline__post"><section class="timeline__content">' +
        '<p class="items"><u>' + json.changelogsitems[i].title + '</u><br/>' + 
        '<a target="_blank" href="' + json.changelogsitems[i].url + '">Direct URL</a><br/>' +
        'Patch Size: ' + json.changelogsitems[i].patchsize + '<br/>' +
        'Author: ' + json.changelogsitems[i].author +'</p>' +
        '</section></section></section>';
    }
}
if(navigator.onLine) 
    getFetch("https://raw.githubusercontent.com/PeterDamianG/ArtifactHelper/master/json/getchangelogs.json", makeChangeLogs);
else
    getFetch("json/getchangelogs.json", makeChangeLogs);

