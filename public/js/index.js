function newDeck() {
    document.getElementById("cardCount").innerHTML = "52";
    document.getElementById("pointCount").innerHTML = "0";
    document.getElementById("cardImage").innerHTML = "<img id='cardDisplay' src='https://cdn.shopify.com/s/files/1/0200/7616/products/playing-cards-bicycle-rider-back-1_1024x1024.png?v=1523371937'>";
    const fetchPromise = fetch("/newDeck"); 
    const streamPromise = fetchPromise.then((response) => response.json()); 
    streamPromise.then((data) => storeDeck(data));
}
function storeDeck(deck) {
    document.getElementById("deckId").innerHTML = deck.deckId;
}

function updateScore(suit,guess) {
    if (guess.includes(suit)) {
        let current = parseInt(document.getElementById("pointCount").textContent);
        document.getElementById("pointCount").innerText = (current + 1).toString();
    }
}

function flipCard(deckId, guess) {
    const fetchPromise = fetch("https://deckofcardsapi.com/api/deck/"+ deckId +"/draw/?count=1",
        {
            headers : {
                "Accept" : "application/json",
            },
        }); 
    const streamPromise = fetchPromise.then((response) => response.json()); 
    streamPromise.then((data) => showCard(data,guess));
}
function showCard(card,guess) {
    updateScore(card.cards[0].suit,guess);
    document.getElementById("cardCount").innerHTML = card.remaining;
    document.getElementById("cardImage").innerHTML = "<img id='cardDisplay' src='" + card.cards[0].image + "'>";
}

// button listeners
document.getElementById("redButton").addEventListener("click", function () {
    document.getElementById("redBlackContainer").classList.toggle("is-hidden");
    document.getElementById("nextButtonContainer").classList.toggle("is-hidden");
    const deckId = document.getElementById("deckId").textContent;
    flipCard(deckId,["HEARTS","DIAMONDS"]);
});
document.getElementById("blackButton").addEventListener("click", function () {
    document.getElementById("redBlackContainer").classList.toggle("is-hidden");
    document.getElementById("nextButtonContainer").classList.toggle("is-hidden");
    const deckId = document.getElementById("deckId").textContent;
    flipCard(deckId,["CLUBS","SPADES"]);
});
document.getElementById("nextButton").addEventListener("click", function () {
    document.getElementById("redBlackContainer").classList.toggle("is-hidden");
    document.getElementById("nextButtonContainer").classList.toggle("is-hidden");
});

// restart modal functions
document.getElementById("restartButton").addEventListener("click", function () {
    document.getElementById("restartModal").classList.toggle("is-active");
});

document.getElementById("modalBackground").addEventListener("click", function () {
    document.getElementById("restartModal").classList.toggle("is-active");
});
document.getElementById("noModalButton").addEventListener("click", function () {
    document.getElementById("restartModal").classList.toggle("is-active");
});
document.getElementById("yesModalButton").addEventListener("click", function () {
    document.getElementById("restartModal").classList.toggle("is-active");
    newDeck();
});

window.onload = function() {
    newDeck();
};