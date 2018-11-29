'use strict';
function getFetch(URL, callback) {
    fetch(URL)
    .then(response => {
        if(response.ok) {
            response.json()
            .then(myJSON => {
                callback(myJSON);
                console.log('Correct JSON.');
            });
        } else {
            console.log('Network response OK.');
        }})
    .catch(function(error) {
        console.log('Was a issues with Fetch:' + error.message);
    });
}
