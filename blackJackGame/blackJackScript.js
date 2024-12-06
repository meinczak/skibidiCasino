//nasz deck używa 2 tali kart (łącznie 104 karty)
const deck = [
    { cardValue: "A", suit: "S" }, { cardValue: "A", suit: "H" }, { cardValue: "A", suit: "D" }, { cardValue: "A", suit: "C" },
    { cardValue: "A", suit: "S" }, { cardValue: "A", suit: "H" }, { cardValue: "A", suit: "D" }, { cardValue: "A", suit: "C" },

    { cardValue: 2, suit: "S" }, { cardValue: 2, suit: "H" }, { cardValue: 2, suit: "D" }, { cardValue: 2, suit: "C" },
    { cardValue: 2, suit: "S" }, { cardValue: 2, suit: "H" }, { cardValue: 2, suit: "D" }, { cardValue: 2, suit: "C" },

    { cardValue: 3, suit: "S" }, { cardValue: 3, suit: "H" }, { cardValue: 3, suit: "D" }, { cardValue: 3, suit: "C" },
    { cardValue: 3, suit: "S" }, { cardValue: 3, suit: "H" }, { cardValue: 3, suit: "D" }, { cardValue: 3, suit: "C" },

    { cardValue: 4, suit: "S" }, { cardValue: 4, suit: "H" }, { cardValue: 4, suit: "D" }, { cardValue: 4, suit: "C" },
    { cardValue: 4, suit: "S" }, { cardValue: 4, suit: "H" }, { cardValue: 4, suit: "D" }, { cardValue: 4, suit: "C" },

    { cardValue: 5, suit: "S" }, { cardValue: 5, suit: "H" }, { cardValue: 5, suit: "D" }, { cardValue: 5, suit: "C" },
    { cardValue: 5, suit: "S" }, { cardValue: 5, suit: "H" }, { cardValue: 5, suit: "D" }, { cardValue: 5, suit: "C" },

    { cardValue: 6, suit: "S" }, { cardValue: 6, suit: "H" }, { cardValue: 6, suit: "D" }, { cardValue: 6, suit: "C" },
    { cardValue: 6, suit: "S" }, { cardValue: 6, suit: "H" }, { cardValue: 6, suit: "D" }, { cardValue: 6, suit: "C" },

    { cardValue: 7, suit: "S" }, { cardValue: 7, suit: "H" }, { cardValue: 7, suit: "D" }, { cardValue: 7, suit: "C" },
    { cardValue: 7, suit: "S" }, { cardValue: 7, suit: "H" }, { cardValue: 7, suit: "D" }, { cardValue: 7, suit: "C" },

    { cardValue: 8, suit: "S" }, { cardValue: 8, suit: "H" }, { cardValue: 8, suit: "D" }, { cardValue: 8, suit: "C" },
    { cardValue: 8, suit: "S" }, { cardValue: 8, suit: "H" }, { cardValue: 8, suit: "D" }, { cardValue: 8, suit: "C" },

    { cardValue: 9, suit: "S" }, { cardValue: 9, suit: "H" }, { cardValue: 9, suit: "D" }, { cardValue: 9, suit: "C" },
    { cardValue: 9, suit: "S" }, { cardValue: 9, suit: "H" }, { cardValue: 9, suit: "D" }, { cardValue: 9, suit: "C" },

    { cardValue: 10, suit: "S" }, { cardValue: 10, suit: "H" }, { cardValue: 10, suit: "D" }, { cardValue: 10, suit: "C" },        
    { cardValue: 10, suit: "S" }, { cardValue: 10, suit: "H" }, { cardValue: 10, suit: "D" }, { cardValue: 10, suit: "C" },

    { cardValue: "J", suit: "S" }, { cardValue: "J", suit: "H" }, { cardValue: "J", suit: "D" }, { cardValue: "J", suit: "C" },         
    { cardValue: "J", suit: "S" }, { cardValue: "J", suit: "H" }, { cardValue: "J", suit: "D" }, { cardValue: "J", suit: "C" },

    { cardValue: "Q", suit: "S" }, { cardValue: "Q", suit: "H" }, { cardValue: "Q", suit: "D" }, { cardValue: "Q", suit: "C" },         
    { cardValue: "Q", suit: "S" }, { cardValue: "Q", suit: "H" }, { cardValue: "Q", suit: "D" }, { cardValue: "Q", suit: "C" },

    { cardValue: "K", suit: "S" }, { cardValue: "K", suit: "H" }, { cardValue: "K", suit: "D" }, { cardValue: "K", suit: "C" },         
    { cardValue: "K", suit: "S" }, { cardValue: "K", suit: "H" }, { cardValue: "K", suit: "D" }, { cardValue: "K", suit: "C" }
];
const dealersTotalDisplay = document.getElementById("dealersTotalDisplay");         
const dealersCardsDisplay = document.getElementById("dealersCardsDisplay");
const dealerStatus = document.getElementById("dealerStatus");
const hitBtn = document.getElementById("hitBtn");                                  
const doubleBtn = document.getElementById("doubleBtn");
const standBtn = document.getElementById("standBtn");
const popUp = document.getElementById("popUp");
const container = document.getElementById("container");

let playedCards = [];
let playersHandsValue;            
let playersAceCount;
let dealersHandsValue;           
let dealersAceCount;
let hiddenCard;
let isGameOn = false;
let playingStations = [];
let currentPlayingStation;

let dealer = {handValue: 0, aceCount: 0, hasBusted: false};
class Station {
    constructor(handValue, aceCount, betValue, hasBusted, betInput, cardsDisplay, totalDisplay, betDisplay, status, stationId) {
        this.handValue = handValue;
        this.aceCount = aceCount;
        this.betValue = betValue;
        this.hasBusted = hasBusted;
        this.betInput = betInput;
        this.cardsDisplay = cardsDisplay;
        this.totalDisplay = totalDisplay;
        this.betDisplay = betDisplay;
        this.status = status;
        this.stationId = stationId;
    }
}

let station1 = new Station(0, 0, 0, false, document.getElementById("input1"), document.getElementById("station1CardsDisplay"), document.getElementById("station1Total"), document.getElementById("station1BetDisplay"), document.getElementById("station1Status"), document.getElementById("station1"));
let station2 = new Station(0, 0, 0, false, document.getElementById("input2"), document.getElementById("station2CardsDisplay"), document.getElementById("station2Total"), document.getElementById("station2BetDisplay"), document.getElementById("station2Status"), document.getElementById("station2"));
let station3 = new Station(0, 0, 0, false, document.getElementById("input3"), document.getElementById("station3CardsDisplay"), document.getElementById("station3Total"), document.getElementById("station3BetDisplay"), document.getElementById("station3Status"), document.getElementById("station3"));


function draw(target) {

    let hasDrawn = false;

    while (!hasDrawn) {

        let drawnCard = Math.floor(Math.random() * 104);

        if (!playedCards.includes(drawnCard)) {

            let cardVisual = `<img src="deck/${deck[drawnCard].cardValue}${deck[drawnCard].suit}.png">`
            playedCards.push(drawnCard);

            if (target == "dealer") {
                dealersCardsDisplay.innerHTML += cardVisual;

                    if (deck[drawnCard].cardValue === "A") {
                        dealer.aceCount++;
                        dealer.handValue += 11;
                    } else if (isNaN(deck[drawnCard].cardValue)) {
                        dealer.handValue += 10;
                    } else {
                        dealer.handValue += deck[drawnCard].cardValue;
                    }

                    while (dealer.handValue > 21 && dealer.aceCount > 0) {
                        dealer.handValue -= 10;
                        dealer.aceCount--;
                    }

                    dealersTotalDisplay.innerHTML = dealer.handValue;
            } else if (target == "hidden") {
                hiddenCard = drawnCard;
                dealersCardsDisplay.innerHTML += "<img id='hiddenCardDisplay' src='deck/reverse.png'>";
                if (deck[drawnCard].cardValue === "A") {
                    dealer.aceCount++;
                    dealer.handValue += 11;
                } else if (isNaN(deck[drawnCard].cardValue)) {
                    dealer.handValue += 10;
                } else {
                    dealer.handValue += deck[drawnCard].cardValue;
                }

                while (dealer.handValue > 21 && dealer.aceCount > 0) {
                    dealer.handValue -= 10;
                    dealer.aceCount--;
                }
            } else {
                target.cardsDisplay.innerHTML += cardVisual;

                if (deck[drawnCard].cardValue === "A") {
                    target.aceCount++;
                    target.handValue += 11;
                } else if (isNaN(deck[drawnCard].cardValue)){
                    target.handValue += 10;
                } else {
                    target.handValue += deck[drawnCard].cardValue;
                }

                while (target.handValue > 21 && target.aceCount > 0) {
                    target.handValue -= 10;
                    target.aceCount--;
                }

                target.totalDisplay.innerHTML = target.handValue;
            }
            
            hasDrawn = true;
        }
    }
}

function start() {

    playingStations = [];

    if (station1.betInput.value > 0 ) {
        playingStations.push(station1);
    } else {
        station1.stationId.style.display = "none";
    }
    if (station2.betInput.value > 0) {
        playingStations.push(station2);
    } else {
        station2.stationId.style.display = "none";
    }
    if (station3.betInput.value > 0) {
        playingStations.push(station3);
    } else {
        station3.stationId.style.display = "none";
    }

    if (playingStations.length == 0) {
        alert("Input a bet first!");
        return;
    } else {
        isGameOn = true
    }

    popUp.style.display = "none";
    container.style.filter = "brightness(1)"

    playedCards = [];
    dealer.handValue = 0;
    dealer.aceCount = 0;
    dealersCardsDisplay.innerHTML = "";
    dealersTotalDisplay.innerHTML = "";

    for (let i = 0; i < playingStations.length; i++) {
        playingStations[i].stationId.style.display = "initial";
        playingStations[i].betValue = playingStations[i].betInput.value;
        playingStations[i].betDisplay.innerHTML = playingStations[i].betValue + "$";
        playingStations[i].handValue = 0;
        playingStations[i].aceCount = 0;
        playingStations[i].cardsDisplay.innerHTML = "";
        playingStations[i].hasBusted = false;
        draw(playingStations[i]);
    }

    draw("dealer");
    
    for (let i = 0; i < playingStations.length; i++) {
        draw(playingStations[i]);
        if (playingStations[i].handValue == 21) {
            playingStations[i].status.innerHTML = "Black Jack!";
        }
    }

    draw("hidden");

    currentPlayingStation = 0;
    playingStations[currentPlayingStation].stationId.classList.add("stationSelected");

    
}

function hit() {
    if (!isGameOn) {
        return;
    }
    draw(playingStations[currentPlayingStation]);

    if (playingStations[currentPlayingStation].handValue > 21) {
        playingStations[currentPlayingStation].status.innerHTML = "BUST!";
        playingStations[currentPlayingStation].hasBusted = true;   
    }
    if (playingStations[currentPlayingStation].handValue >= 21) {       
        stand();
    }
    
}

function stand() {
    playingStations[currentPlayingStation].stationId.classList.remove("stationSelected");
    currentPlayingStation++
    if (currentPlayingStation + 1 > playingStations.length) {

        let gameWinnings = 0;

        isGameOn = false;

        document.getElementById("hiddenCardDisplay").src = `deck/${deck[hiddenCard].cardValue}${deck[hiddenCard].suit}.png`;
        dealersTotalDisplay.innerHTML = dealer.handValue;
        
        if (dealer.handValue == 21) {
            dealerStatus.innerHTML = "Black Jack!";
        }
        
        while (dealer.handValue < 17) {
            draw("dealer");
        }

        if (dealer.handValue > 21) {
            dealer.hasBusted = true;
        }
        
        for (let i = 0; i < playingStations.length; i++) {
            if (playingStations[i].hasBusted) {
                playingStations[i].status.innerHTML = "BUST! You Lose!";
            } else if (playingStations[i].status.innerHTML == "Black Jack!" && dealerStatus.innerHTML != "Black Jack!") {
                gameWinnings += playingStations[i].betValue * 2.5;
                playingStations[i].status.innerHTML = "Black Jack! You Win!";
            } else if (dealer.hasBusted) {
                gameWinnings += playingStations[i].betValue * 2;
                dealerStatus.innerHTML = "Bust!";
                playingStations[i].status.innerHTML = "You Win!";
            } else if (playingStations[i].handValue > dealer.handValue) {
                gameWinnings += playingStations[i].betValue * 2;
                playingStations[i].status.innerHTML = "You Win!";
            } else if (playingStations[i].handValue == dealer.handValue) {
                gameWinnings += playingStations[i].betValue;
                playingStations[i].status.innerHTML = "Tie!";
            } else {
                playingStations[i].status.innerHTML = "You Lose!";
            }
        }
        console.log(gameWinnings);

    } else {
        playingStations[currentPlayingStation].stationId.classList.add("stationSelected");
    }
    
}
