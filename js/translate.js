'use strict';
let actualLanguageTranslate = configSettingConfig.language;
let language = require(getFileLanguage());
function getFileLanguage() {
    let pathFinal;
    let pathFile = window.location.pathname.split(/(\\|\/)/g).pop();
    if(actualLanguageTranslate === 'en')
        pathFinal = './language/english/';
    else if(actualLanguageTranslate === 'es')
        pathFinal = './language/spanish/';
    else
        pathFinal = './language/english/';
    if(pathFile === 'index.html')
        pathFinal += 'main.json';
    else if(pathFile === 'statistics.html')
        pathFinal += 'statistics.json';
    else if(pathFile === 'config.html')
        pathFinal += 'config.json';
    else if(pathFile === 'about.html')
        pathFinal += 'about.json';    
    return pathFinal;
}
function rewriteHTML() {
    for(let i in language) {
        let elementTranslate = document.getElementById(i);
        elementTranslate.innerHTML = language[i];
    }
}
rewriteHTML();