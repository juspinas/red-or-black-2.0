function newDeck() {
    document.getElementById("cardCount").innerHTML = "52";
    const fetchPromise = fetch("/newDeck"); 
    const streamPromise = fetchPromise.then((response) => response.json()); 
    streamPromise.then((data) => storeDeck(data));
}
function storeDeck(deck) {
    document.getElementById("deckId").innerHTML = deck.deckId;
}

function flipCard(deckId) {
    const fetchPromise = fetch("https://deckofcardsapi.com/api/deck/"+ deckId +"/draw/?count=1",
        {
            headers : {
                "Accept" : "application/json",
            },
        }); 
    const streamPromise = fetchPromise.then((response) => response.json()); 
    streamPromise.then((data) => showCard(data));
}
function showCard(card) {
    document.getElementById("cardCount").innerHTML = card.remaining;
    document.getElementById("cardImage").innerHTML = "<img id='cardDisplay' src='" + card.cards[0].image + "'>";
}


document.getElementById("redButton").addEventListener("click", function () {
    document.getElementById("redBlackContainer").classList.toggle("is-hidden");
    document.getElementById("nextButtonContainer").classList.toggle("is-hidden");
    const deckId = document.getElementById("deckId").textContent;
    flipCard(deckId);
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
    newDeck();
};