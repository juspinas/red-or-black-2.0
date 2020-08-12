function getDeck() {
    const fetchPromise = fetch('/newDeck'); 
    const streamPromise = fetchPromise.then((response) => response.json()); 
    streamPromise.then((data) => showDeck(data));
}

function showDeck(deck) {
    alert(deck);
}


document.getElementById("redButton").addEventListener("click", function () {
    document.getElementById("redBlackContainer").classList.toggle("is-hidden");
    document.getElementById("nextButtonContainer").classList.toggle("is-hidden");
});
document.getElementById("blackButton").addEventListener("click", function () {
    document.getElementById("redBlackContainer").classList.toggle("is-hidden");
    document.getElementById("nextButtonContainer").classList.toggle("is-hidden");
});
document.getElementById("nextButton").addEventListener("click", function () {
    document.getElementById("redBlackContainer").classList.toggle("is-hidden");
    document.getElementById("nextButtonContainer").classList.toggle("is-hidden");
});

window.onload = function() {
    getDeck();
};