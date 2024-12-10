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
const insuranceBtn = document.getElementById("insuranceBtn");
const popUp = document.getElementById("popUp");
const container = document.getElementById("container");
const playAgainBtn = document.getElementById("playAgainBtn");

let playedCards = [];                 
let hiddenCard;
let playingStations = [];
let currentPlayingStation;
let currentCardId = 1;

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

            let cardVisual = `
            <div class="card" id="${currentCardId}">
                <img class="card-front" src="deck/${deck[drawnCard].cardValue}${deck[drawnCard].suit}.png">
                <img class="card-back" src='deck/reverse.png'>
            </div>
            `
            playedCards.push(drawnCard);

            if (target == "dealer") {
                dealersCardsDisplay.innerHTML += cardVisual;
                document.getElementById(currentCardId).style.animation = "cardBoth 0.75s ease-in-out";
                document.getElementById(currentCardId).style.transform = "rotateY(180deg)";
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
                dealersCardsDisplay.innerHTML += 
                `<div class="card" id="${currentCardId}"><img class="card-front" id="hiddenCardDisplay" src=""><img class="card-back" src="deck/reverse.png"></div>`;
                document.getElementById(currentCardId).style.animation = "cardDrawing 0.375s ease-in-out";
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
                document.getElementById(currentCardId).style.animation = "cardBoth 0.75s ease-in-out";
                document.getElementById(currentCardId).style.transform = "rotateY(180deg)";
                console.log(currentCardId);
                document.getElementById(currentCardId).addEventListener("animationend", function (currentCardId) {
                    document.getElementById(currentCardId).style.animation = "none";
                    console.log("balls");
                });


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
            currentCardId++;
            hasDrawn = true;
        }
    }
}

function start() {

    playingStations = [];
    currentCardId = 0;

    if (station1.betInput.value > 0 ) {
        playingStations.push(station1);
        station1.stationId.style.display = "inline";
    } else {
        station1.stationId.style.display = "none";
    }
    if (station2.betInput.value > 0) {
        playingStations.push(station2);
        station2.stationId.style.display = "inline";
    } else {
        station2.stationId.style.display = "none";
    }
    if (station3.betInput.value > 0) {
        playingStations.push(station3);
        station3.stationId.style.display = "inline";
    } else {
        station3.stationId.style.display = "none";
    }

    if (playingStations.length == 0) {
        alert("Input a bet first!");
        return;
    }

    popUp.style.display = "none";
    container.style.filter = "brightness(1)";
    playAgainBtn.style.display = "none";

    playedCards = [];
    currentPlayingStation = 0;
    dealer.handValue = 0;
    dealer.aceCount = 0;
    dealersCardsDisplay.innerHTML = "";
    dealersTotalDisplay.innerHTML = "";
    
    if (playingStations.length === 1) {
        playingStations[0].stationId.style.transform = "rotate(0turn)";
        playingStations[0].stationId.style.marginBottom = "0vh";
    } else if (playingStations.length === 2) {
        playingStations[0].stationId.style.transform = "rotate(0.025turn)";
        playingStations[0].stationId.style.marginBottom = "7.5vh";
        playingStations[1].stationId.style.transform = "rotate(-0.025turn)";
        playingStations[1].stationId.style.marginBottom = "7.5vh";
    } else if (playingStations.length === 3) {
        playingStations[0].stationId.style.transform = "rotate(0.05turn)";
        playingStations[0].stationId.style.marginBottom = "15vh";
        playingStations[1].stationId.style.transform = "rotate(0turn)";
        playingStations[1].stationId.style.marginBottom = "0vh";
        playingStations[2].stationId.style.transform = "rotate(-0.05turn)";
        playingStations[2].stationId.style.marginBottom = "15vh";
    }

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

    insuranceBtn.style.display = "none";
    if (dealer.handValue == 11) {
        insuranceBtn.style.display = "flex";
    }

    draw("hidden");

    playingStations[currentPlayingStation].stationId.classList.add("stationSelected");

    if (playingStations[0].handValue == 21) {
        stand()
    }

    doubleBtn.style.display = "flex";

    
}

function hit() {
    draw(playingStations[currentPlayingStation]);

    if (playingStations[currentPlayingStation].handValue > 21) {
        playingStations[currentPlayingStation].status.innerHTML = "BUST!";
        playingStations[currentPlayingStation].hasBusted = true;   
    }
    if (playingStations[currentPlayingStation].handValue >= 21) {       
        stand();
    }
    doubleBtn.style.display = "none";
}

function stand() {
    playingStations[currentPlayingStation].stationId.classList.remove("stationSelected");
    if (playingStations[currentPlayingStation].status.innerHTML + 1 == "Black Jack!") {
        stand();
    }
    currentPlayingStation++
    doubleBtn.style.display = "flex";

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
            dealerStatus.innerHTML = "Bust!";
        }
        
        for (let i = 0; i < playingStations.length; i++) {
            if (playingStations[i].hasBusted) {
                playingStations[i].status.innerHTML = "BUST! <br> You Lose!";
            } else if (playingStations[i].status.innerHTML == "Black Jack!" && dealerStatus.innerHTML != "Black Jack!") {
                gameWinnings += playingStations[i].betValue * 2.5;
                playingStations[i].status.innerHTML = "Black Jack! <br> You Win!";
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
        playAgainBtn.style.display = "inline";

    } else {
        playingStations[currentPlayingStation].stationId.classList.add("stationSelected");
    }
    
}

function double() {
    if (playingStations[currentPlayingStation].betValue) {
        playingStations[currentPlayingStation].betValue = playingStations[currentPlayingStation].betValue * 2;
        draw(playingStations[currentPlayingStation]);
        if (playingStations[currentPlayingStation].handValue > 21) {
            playingStations[currentPlayingStation].status.innerHTML = "BUST!";
            playingStations[currentPlayingStation].hasBusted = true;   
        }
        stand();
    }
}