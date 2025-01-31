// getting a shuffled new deck
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

// Updates scores as guess is correct
function updateScore(suit,guess) {
    if (guess.includes(suit)) {
        let current = parseInt(document.getElementById("pointCount").textContent);
        document.getElementById("pointCount").innerText = (current + 1).toString();
        document.getElementById("pointText").classList.add("correctAnimation");
    } else {
    }
}

// draws a card from the current deckId
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
    
    if (card.remaining == "0") {
        document.getElementById("restartButtonContainer").classList.remove("is-hidden");
    } else {
        document.getElementById("nextButtonContainer").classList.remove("is-hidden");
    }
}

// button listeners
document.getElementById("redButton").addEventListener("click", function () {
    document.getElementById("redBlackContainer").classList.add("is-hidden");
    const deckId = document.getElementById("deckId").textContent;
    flipCard(deckId,["HEARTS","DIAMONDS"]);
});
document.getElementById("blackButton").addEventListener("click", function () {
    document.getElementById("redBlackContainer").classList.add("is-hidden");
    const deckId = document.getElementById("deckId").textContent;
    flipCard(deckId,["CLUBS","SPADES"]);
});
document.getElementById("nextButton").addEventListener("click", function () {
    document.getElementById("redBlackContainer").classList.remove("is-hidden");
    document.getElementById("nextButtonContainer").classList.add("is-hidden");
    document.getElementById("cardImage").innerHTML = "<img id='cardDisplay' src='https://cdn.shopify.com/s/files/1/0200/7616/products/playing-cards-bicycle-rider-back-1_1024x1024.png?v=1523371937'>";
    document.getElementById("pointText").classList.remove("correctAnimation");
});
document.getElementById("restartButton").addEventListener("click", function () {
    document.getElementById("restartButtonContainer").classList.add("is-hidden");
    document.getElementById("redBlackContainer").classList.remove("is-hidden");
    newDeck();
});

// dropdown menu
document.getElementById("dropdownButton").addEventListener("click", function () {
    document.getElementById("dropdownButton").classList.toggle("is-active");
    document.getElementById("navbarMenuHero").classList.toggle("is-active");
});
document.getElementById("darkLightNavButton").addEventListener("click", function () {
    if (document.getElementById("navbar").classList.contains("is-light")) {
        document.getElementById("navbar").classList.replace("is-light","is-dark")
        document.getElementById("background").classList.add("bg-dark");
        document.getElementById("darkLightNavButton").innerHTML = "Light Mode";
    } else {
        document.getElementById("navbar").classList.replace("is-dark","is-light")
        document.getElementById("background").classList.remove("bg-dark");
        document.getElementById("darkLightNavButton").innerHTML = "Dark Mode";
    }
});
// restart modal functions
document.getElementById("restartNavButton").addEventListener("click", function () {
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