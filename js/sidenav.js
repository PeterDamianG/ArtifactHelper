'use strict';
let configSettingConfig = require('./json/config.json');
let configActualLanguage = configSettingConfig.language;
function makeNav() {
    if(configActualLanguage === 'en')
        writeTextNav();
    else if(configActualLanguage === 'es')
        writeTextNav('Menú', 'Noticias', 'Cambios', 'Cartas y Decks', 'Estadísticas', 'Configuración', 'Sobre APP');
    else
        writeTextNav();
}
function writeTextNav(main = 'Main', news = 'News', changelogs = 'ChangeLogs', deckscards = 'Decks/Cards', statistics = 'Statistics', configuration = 'Configuration', about = 'About') {
    let sideNav = document.getElementById("sidenav");
    sideNav.innerHTML = '<div id="mySidenav" class="sidenav">' +
    '<a class="closebtn" onclick="closeNav()">&times;</a>' +
    '<a title="Ctrl+Alt+P" href="index.html">' + main + '</a>' +
    '<a title="Ctrl+Alt+N" href="news.html">' + news + '</a>' +
    '<a title="Ctrl+Alt+L" href="changelogs.html">' + changelogs + '</a>' +
    '<a title="Ctrl+Alt+D" href="deckscards.html">' + deckscards + '</a>' +
    '<a title="Ctrl+Alt+S" href="statistics.html">' + statistics + '</a>' +
    '<a title="Ctrl+Alt+C" href="config.html">' + configuration + '</a>' +
    '<a title="Ctrl+Alt+A" href="about.html">' + about + '</a></div>' +
    '<span id="iconnav" onclick="openNav()">&#9776;</span>';
}
function openNav() {
    if(screen.width > 800)
        document.getElementById("mySidenav").style.width = "40%";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
makeNav();

