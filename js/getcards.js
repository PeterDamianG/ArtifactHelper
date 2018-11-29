'use strict';
let actualLanguage = configSettingConfig.language;
function makeCardList(json) {
    let list = document.getElementById("card_list");
    list.innerHTML = '';
    for(let i = 0; i < json.length; i++) {
        let cardName = actualLanguage === "en" ? json[i].card_name.english : json[i].card_name.spanish;
        let imageLanguage = actualLanguage === "en" ? json[i].large_image.default : json[i].large_image.spanish;
        let largeImage = "makeImagePopUp('" + imageLanguage + "')";
        list.innerHTML += '<span class="' +
        getColor(json[i]) + " " +
        getRarity(json[i].rarity) + '" ' +
        'onclick="' + largeImage + '")">' +
        '<img src="' + json[i].mini_image.default + '" alt="No Net"/>&nbsp&nbsp&nbsp' +
        '<img src="' + getImagenType(json[i]) + '" alt="No Net"/>&nbsp&nbsp&nbsp' +
        cardName +'</span>';
    }
}
function getRarity(rarity) {
    if(rarity === "Basic")
        return "rarity_card_basic";
    else if(rarity === "Common")
        return "rarity_card_common";
    else if(rarity === "Uncommon")
        return "rarity_card_uncommon";
    else if(rarity === "Rare")
        return "rarity_card_rare";
    else 
        return "rarity_card_none";
}
function getColor(color) {
    if(color.is_red) 
        return "bg_card_red";
    else if(color.is_blue)
        return "bg_card_blue";
    else if(color.is_green)
        return "bg_card_green";
    else if(color.is_black)
        return "bg_card_black";
    else
        return "bg_card_yellow";
}
function getImagenType(type) {
    if(type.card_type === "Hero") 
        return "img/deckscards/button/hero.png";
    else if(type.card_type === "Creep")
        return "img/deckscards/button/creep.png";
    else if(type.card_type === "Spell")
        return "img/deckscards/button/spell.png";
    else if(type.card_type === "Improvement")
        return "img/deckscards/button/improvement.png";
    else if(type.sub_type === "Weapon")
        return "img/deckscards/button/weapon.png";
    else if(type.sub_type === "Armor")
        return "img/deckscards/button/armor.png";
    else if(type.sub_type === "Accessory")
        return "img/deckscards/button/accessory.png";
    else if(type.sub_type === "Consumable")
        return "img/deckscards/button/consumable.png"; 
}
//Make a PopUp's with cards.
function makeImagePopUp(source) {
    let sectionPopUp = document.getElementById("popup");
    sectionPopUp.innerHTML = '<section id="show_popup" onclick="hide()">' +
    '<img src="' + source + '"/></section>';
}
function hide() {
    let sectionPopUp = document.getElementById("popup");
    sectionPopUp.innerHTML = "";
}
document.getElementById("button_all").addEventListener("click", () => {
    getFetch("json/cardsjson/allcards.json", makeCardList);
});
document.getElementById("button_hero").addEventListener("click", () => {
    getFetch("json/cardsjson/herocards.json", makeCardList);
});
document.getElementById("button_creep").addEventListener("click", () => {
    getFetch("json/cardsjson/creepcards.json", makeCardList);
});
document.getElementById("button_spell").addEventListener("click", () => {
    getFetch("json/cardsjson/spellcards.json", makeCardList);
});
document.getElementById("button_improvement").addEventListener("click", () => {
    getFetch("json/cardsjson/improvementcards.json", makeCardList);
});
document.getElementById("button_weapon").addEventListener("click", () => {
    getFetch("json/cardsjson/weaponcards.json", makeCardList);
});
document.getElementById("button_armor").addEventListener("click", () => {
    getFetch("json/cardsjson/armorcards.json", makeCardList);
});
document.getElementById("button_accessory").addEventListener("click", () => {
    getFetch("json/cardsjson/accessorycards.json", makeCardList);
});
document.getElementById("button_consumable").addEventListener("click", () => {
    getFetch("json/cardsjson/consumablecards.json", makeCardList);
});
document.getElementById("button_red").addEventListener("click", () => {
    getFetch("json/cardsjson/redcards.json", makeCardList);
});
document.getElementById("button_blue").addEventListener("click", () => {
    getFetch("json/cardsjson/bluecards.json", makeCardList);
});
document.getElementById("button_green").addEventListener("click", () => {
    getFetch("json/cardsjson/greencards.json", makeCardList);
});
document.getElementById("button_black").addEventListener("click", () => {
    getFetch("json/cardsjson/blackcards.json", makeCardList);
});
document.getElementById("button_basic").addEventListener("click", () => {
    getFetch("json/cardsjson/basiccards.json", makeCardList);
});
document.getElementById("button_common").addEventListener("click", () => {
    getFetch("json/cardsjson/commoncards.json", makeCardList);
});
document.getElementById("button_uncommon").addEventListener("click", () => {
    getFetch("json/cardsjson/uncommoncards.json", makeCardList);
});
document.getElementById("button_rare").addEventListener("click", () => {
    getFetch("json/cardsjson/rarecards.json", makeCardList);
});