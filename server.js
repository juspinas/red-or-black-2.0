// install request also
const express = require('express');
const path = require("path");
const request = require("request-promise");
const app = express();
const PORT = process.env.PORT || 3000

app.use(express.static("public"));
app.get('/', (req, res) => res.sendFile(__dirname + "/client/index.html"))

app.get('/newDeck', async (req, res) => {
    var settings = {
        async: true,
        crossDomain: true,
        url: "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1",
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    };
    const deckResponse = await request(settings).catch(error => console.log(error));
    const deckResponseObj = JSON.parse(deckResponse);
    res.status(200).send({
        success: deckResponseObj.success,
        deckId: deckResponseObj.deck_id,
        remaining: deckResponseObj.remaining,
        shuffled: deckResponseObj.shuffled
    });
});

app.listen(PORT, () => console.log('Example app listening on port 3000!'))