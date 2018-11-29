'use strict';
const fs = require('fs');
const request = require('request');
//Function to get a JSON from an API and replace a file in the system.
function requesting(URL, fileReplace) {
    request.get({
        url: URL,
        json: true,
        headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
        if (err) {
            console.log('Error:', err);
        } else if (res.statusCode !== 200) {
            console.log('Status:', res.statusCode);
        } else {
            fs.writeFile(fileReplace, JSON.stringify(data), (err) => {
                if (err) throw err;
            });
        }
    });
}
function updateAllJSON() {
//Update News file JSON, getnews.json.
    requesting("https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=583950&count=50&maxlength=25&format=json", "resources/app/json/getnews.json");
//Update ChangeLogs file JSON, getchangelogs.json.
    requesting("https://raw.githubusercontent.com/PeterDamianG/ArtifactHelper/master/json/getchangelogs.json", "resources/app/json/getchangelogs.json");
//Update DecksCards file JSON, cardset00.json and cardset01.json.
//Get the first cardset 00.
    request.get({
        url: "https://playartifact.com/cardset/00/",
        json: true,
        headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
        if (err) {
            console.log('Error:', err);
        } else if (res.statusCode !== 200) {
            console.log('Status:', res.statusCode);
        } else {
            requesting((data.cdn_root + data.url), "resources/app/json/cardset00.json");
        }
    });
//Get the first cardset 01.
    request.get({
        url: "https://playartifact.com/cardset/01/",
        json: true,
        headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
        if (err) {
            console.log('Error:', err);
        } else if (res.statusCode !== 200) {
            console.log('Status:', res.statusCode);
        } else {
            requesting((data.cdn_root + data.url), "resources/app/json/cardset01.json");
        }
    });
}
function makeCardsJSON() {
//Get both file lasted obtained and save in cardSetAll var and file allcards.json.
    const cardSet00 = require('./json/cardset00.json');
    const cardSet01 = require('./json/cardset01.json');
    let cardSetAllUnfiltered = cardSet00.card_set.card_list.concat(cardSet01.card_set.card_list);
    let cardSetAll = cardSetAllUnfiltered.filter(item => {
        if(item.card_type !== "Passive Ability") {
            if(item.card_type !== "Ability") {
                if(item.card_type !== "Stronghold") {
                    if(item.card_type !== "Pathing") {
                        return true;
                    } 
                }    
            }
        }
    });
    fs.writeFile('resources/app/json/cardsjson/allcards.json', JSON.stringify(cardSetAll), (err) => {
        if (err) throw err;
    });
//Make a file with only all red cards.
    let allRedCards = cardSetAll.filter(item => item.is_red);
    fs.writeFile("resources/app/json/cardsjson/redcards.json", JSON.stringify(allRedCards), (err) => {
        if (err) throw err;
    });
//Make a file with only all blue cards.
    let allBlueCards = cardSetAll.filter(item => item.is_blue);
    fs.writeFile("resources/app/json/cardsjson/bluecards.json", JSON.stringify(allBlueCards), (err) => {
        if (err) throw err;
    });
//Make a file with only all green cards.
    let allGreenCards = cardSetAll.filter(item => item.is_green);
    fs.writeFile("resources/app/json/cardsjson/greencards.json", JSON.stringify(allGreenCards), (err) => {
        if (err) throw err;
    });
//Make a file with only all black cards.
    let allBlackCards = cardSetAll.filter(item => item.is_black);
    fs.writeFile("resources/app/json/cardsjson/blackcards.json", JSON.stringify(allBlackCards), (err) => {
        if (err) throw err;
    });
//Make a file with only all basic cards. This is special, all card set 00 are basic.
    fs.writeFile("resources/app/json/cardsjson/basiccards.json", JSON.stringify(cardSet00.card_set.card_list), (err) => {
        if (err) throw err;
    });
//Make a file with only all common cards.
    let allCommonCards = cardSetAll.filter(item => item.rarity === "Common");
    fs.writeFile("resources/app/json/cardsjson/commoncards.json", JSON.stringify(allCommonCards), (err) => {
        if (err) throw err;
    });
//Make a file with only all uncommon cards.
    let allUncommonCards = cardSetAll.filter(item => item.rarity === "Uncommon");
    fs.writeFile("resources/app/json/cardsjson/uncommoncards.json", JSON.stringify(allUncommonCards), (err) => {
        if (err) throw err;
    });
//Make a file with only all rare cards.
    let allRareCards = cardSetAll.filter(item => item.rarity === "Rare");
    fs.writeFile("resources/app/json/cardsjson/rarecards.json", JSON.stringify(allRareCards), (err) => {
        if (err) throw err;
    });
//Make a file with only all hero cards.
    let allHeroCards = cardSetAll.filter(item => item.card_type === "Hero");
    fs.writeFile("resources/app/json/cardsjson/herocards.json", JSON.stringify(allHeroCards), (err) => {
        if (err) throw err;
    });
//Make a file with only all creep cards.
    let allCreepCards = cardSetAll.filter(item => item.card_type === "Creep");
    fs.writeFile("resources/app/json/cardsjson/creepcards.json", JSON.stringify(allCreepCards), (err) => {
        if (err) throw err;
    });
//Make a file with only all spell cards.
    let allSpellCards = cardSetAll.filter(item => item.card_type === "Spell");
    fs.writeFile("resources/app/json/cardsjson/spellcards.json", JSON.stringify(allSpellCards), (err) => {
        if (err) throw err;
    });
//Make a file with only all improvement cards.
    let allImprovementCards = cardSetAll.filter(item => item.card_type === "Improvement");
    fs.writeFile("resources/app/json/cardsjson/improvementcards.json", JSON.stringify(allImprovementCards), (err) => {
        if (err) throw err;
    });
//Make a file with only all weapon cards.
    let allWeaponCards = cardSetAll.filter(item => item.sub_type === "Weapon");
    fs.writeFile("resources/app/json/cardsjson/weaponcards.json", JSON.stringify(allWeaponCards), (err) => {
        if (err) throw err;
    });
//Make a file with only all armor cards.
    let allArmorCards = cardSetAll.filter(item => item.sub_type === "Armor");
    fs.writeFile("resources/app/json/cardsjson/armorcards.json", JSON.stringify(allArmorCards), (err) => {
        if (err) throw err;
    });
//Make a file with only all accessory cards.
    let allAccessoryCards = cardSetAll.filter(item => item.sub_type === "Accessory");
    fs.writeFile("resources/app/json/cardsjson/accessorycards.json", JSON.stringify(allAccessoryCards), (err) => {
        if (err) throw err;
    });
//Make a file with only all consumable cards.
    let allConsumableCards = cardSetAll.filter(item => item.sub_type === "Consumable");
    fs.writeFile("resources/app/json/cardsjson/consumablecards.json", JSON.stringify(allConsumableCards), (err) => {
        if (err) throw err;
    });
}
exports.updateAll = () => {
    //Call the function to update all file JSON.
    updateAllJSON();
}
exports.makeCardAllJSON = () => {
    //Call the function to make all file JSON for section deckscards.
    makeCardsJSON();
    alert("Be careful with this function, it may damage the application.");
}


