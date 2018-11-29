'use strict';
const fs = require('fs');
let updatejson = require('./updatejson.js');
let slidernews = document.getElementById("newsrange");
let sliderchangelogs = document.getElementById("changelogsrange");
let hardwareAcceleration = document.getElementById("hardware_acceleration");
function setRanges() {
    let displaynews = document.getElementById("displaynews");
    let displaychangelogs = document.getElementById("displaychangelogs");
    displaynews.innerHTML = configSettingConfig.rangenews;
    displaychangelogs.innerHTML = configSettingConfig.rangechangelogs;
    slidernews.oninput = function() {
        if (this.value === 50) 
            displaynews.innerHTML = "Maximum (50)";
        else if (this.value === 10) 
            displaynews.innerHTML = "Minimum (10)";
        else 
            displaynews.innerHTML = this.value;
    }
    sliderchangelogs.oninput = function() {
        if (this.value == 50) 
            displaychangelogs.innerHTML = "Maximum (50)";
        else if (this.value == 10) 
            displaychangelogs.innerHTML = "Minimum (10)";
        else 
            displaychangelogs.innerHTML = this.value;
    } 
}
function makeNewConfigFile(language = "en", rangenews = 25, rangechangelogs = 25, hardware = 0) {
    let file = {
        "language": language,
        "rangenews": rangenews,
        "rangechangelogs": rangechangelogs,
        "hardware": hardware,
    };
    fs.writeFile('resources/app/json/config.json', JSON.stringify(file), (err) => {
        if (err) throw err;
    });
}
function makeAlert(message) {
    let sectionAlert = document.getElementById("alert");
    sectionAlert.innerHTML = '<div class="alert">' +
    '<span class="closebtn" ' + 
    'onclick="this.parentElement.style.display=' + "'none'" +';">&times;</span>'+
    '<strong>' + message + '</strong></div>';
}
document.getElementById("button_spanish").addEventListener("click", () => {
    let checked = hardwareAcceleration.checked ? 1 : 0;
    makeNewConfigFile("es", slidernews.value, sliderchangelogs.value, checked);
    makeAlert("Completado, el idioma ha cambiado. Recargue sección.");
});
document.getElementById("button_english").addEventListener("click", () => {
    let checked = hardwareAcceleration.checked ? 1 : 0;
    makeNewConfigFile("en", slidernews.value, sliderchangelogs.value, checked);
    makeAlert("Success, the language has changed. Reload Section.");
});
document.getElementById("button_default").addEventListener("click", () => {
    makeNewConfigFile();
    makeAlert("Success, setting by default.");
});
document.getElementById("button_save").addEventListener("click", () => {
    let checked = hardwareAcceleration.checked ? 1 : 0;
    makeNewConfigFile(configSettingConfig.language, slidernews.value, sliderchangelogs.value, checked);
    if(configSettingConfig.language === "en")
        makeAlert("Success, the setting has been saved.");
    else(configSettingConfig.language === "es")
        makeAlert("Completado, las configuraciones se han guardado.");
});
document.getElementById("button_update").addEventListener("click", () => {
    updatejson.makeCardAllJSON();
});
setRanges();