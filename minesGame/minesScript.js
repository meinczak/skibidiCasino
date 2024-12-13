function ciasteczko(nazwa) {
    var ciasteczka = document.cookie.split('; ');
    for (var i = 0; i < ciasteczka.length; i++) {
        var [ciastko, wartosc] = ciasteczka[i].split('=');
        if (ciastko === nazwa) {
            return decodeURIComponent(wartosc);
        }
    }
    return null;
}

const minesInput = document.getElementById("minesInput");
const betInput = document.getElementById("betInput");
const minesLabel = document.getElementById("minesLabel");
const betBtn = document.getElementById("betBtn");
const gameInfo = document.getElementById("gameInfo");
const randomTileBtn = document.getElementById("randomTileBtn");
const cashoutBtn = document.getElementById("cashoutBtn");
const minesRemaining = document.getElementById("minesRemaining");
const gemsRemaining = document.getElementById("gemsRemaining");
const profitLabel = document.getElementById("profitLabel");
const profit = document.getElementById("profit");
const gameResult = document.getElementById("gameResult");
const playAgainBtn = document.getElementById("playAgainBtn");

    // gems, mines
    
const multiplier = [ 
    [1.01, 1.08, 1.12, 1.18, 1.24, 1.3, 1.37, 1.46, 1.55, 1.65, 1.77, 1.9, 2.06, 2.25, 2.47, 2.75, 3.09, 3.54, 4.12, 4.95, 6.19, 8.25, 12.37, 24.75], 
    [1.08, 1.17, 1.29, 1.41, 1.56, 1.74, 1.94, 2.18, 2.47, 2.83, 3.26, 3.81, 4.5, 5.4, 6.6, 8.25, 10.61, 14.14, 19.8, 29.7, 49.5, 99, 297],
    [1.12, 1.29, 1.48, 1.71, 2, 2.35, 2.79, 3.35, 4.07, 5, 6.26, 7.96, 10.35, 13.8, 18.97, 27.11, 40.66, 65.06, 113.85, 227.7, 569.3, 2277],
    [1.18, 1.41, 1.71, 2.09, 2.58, 3.23, 4.09, 5.26, 6.88, 9.17, 12.51, 17.52, 25.3, 37.95, 59.64, 99.39, 178.91, 357.81, 834.9, 2504, 12523],
    [1.24, 1.56, 2, 2.58, 3.39, 4.52, 6.14, 8.5, 12.04, 17.52, 26.77, 40.87, 66.41, 113.85, 208.72, 417.45, 939.26, 2504, 12523],
    [1.3, 1.74, 2.35, 3.23, 4.52, 6.46, 9.44, 14.17, 21.89, 35.03, 58.38, 102.17, 189.75, 379.5, 834.9, 2087, 6261, 25047, 175329],
    [1.37, 1.94, 2.79, 4.09, 6.14, 9.44, 14.95, 24.47, 41.6, 73.95, 138.66, 277.33, 600.87, 1442, 3965, 13219, 59486, 475893],
    [1.46, 2.18, 3.35, 5.26, 8.5, 14.17, 24.47, 44.05, 83.2, 166.4, 356.56, 831.98, 2163, 6489, 23794, 118973, 1070759],
    [1.55, 2.47, 4.07, 6.88, 12.04, 21.89, 41.6, 83.2, 176.8, 404.1, 1010, 2828, 9193, 36773, 202254, 2022545],
    [1.65, 2.83, 5, 9.17, 17.52, 35.03, 73.95, 166.4, 404.1, 1077, 3232, 11314, 49031, 294188, 3236072],
    [1.77, 3.26, 6.26, 12.51, 26.27, 58.38, 138.66, 356.56, 1010, 3232, 12123, 56574, 367735, 4412826],
    [1.99, 3.81, 7.96, 17.52, 40.87, 102.17, 277.33, 831.98, 2828, 11314, 56574, 396022, 5148297],
    [2.06, 4.5, 10.35, 25.3, 66.41, 189.75, 600.87, 2163, 9193, 49031, 367735, 5148297],
    [2.25, 5.4, 13.8, 37.95, 113.9, 379.5, 1442, 6489, 36773, 294188, 4412826],
    [2.47, 6.6, 18.97, 59.64,208.7, 834.9, 3965, 23794, 202254, 3236072],
    [2.75, 8.25, 27.11, 99.39, 417.5, 2087, 13219, 118973, 2022545],
    [3.09, 10.61, 40.66, 178.9, 939.3, 6261, 59486, 1070759],
    [3.54, 14.14, 65.06, 357.8, 2504, 25047, 475893],
    [4.12, 19.8, 133.9, 834.9, 8766, 175329],
    [4.95, 29.7, 227.7, 2504, 52598],
    [6.19, 49.5, 569.3, 12523],
    [8.25, 99, 2277],
    [12.38, 297],
    [24.75]
];

let hasBet = false;
let balance = ciasteczko('balance');
let mines = [];
let gemsClicked = [];
let totalGemsNumber;

function gameStart() {
    arrow.style.display = "none";
    for (i = 1; i <= 25; i++) {
        document.getElementById(i).innerHTML = "";
        document.getElementById(i).style.backgroundColor = "#272727";
        document.getElementById(i).style.background = "#272727"
    }
    if (betInput.value > balance || betInput.value < 0.1) {
        return;
    } 
    hasBet = true;
    balance -= betInput.value;
    document.cookie = `balance=${balance}; path=/; domain=meinczak.github.io; expires=Tue, 01 Jan 2030 00:00:00 UTC; Secure`;
    document.getElementById("money").innerHTML= balance.toFixed(2) + "$";
    betInput.readOnly = true;
    gemsClicked = [];
    profitLabel.innerHTML = "Profit (x1)"
    profit.value = betInput.value;
    changeStyle("game");
    minesRemaining.value = minesInput.value;
    totalGemsNumber = 25 - minesInput.value;
    gemsRemaining.value = totalGemsNumber;
    
    while(mines.length < minesInput.value) {
                                                                                                                            // Mine Generation
        let mineId = Math.floor(Math.random() * 25) + 1;
        if (!mines.includes(mineId)) {
            mines.push(mineId);
        }
    }  
}

function tileClick(tileId) {
    
    if (!hasBet) {
        return;
    }
    if (gemsClicked.includes(tileId)) {
        return;
    }
    if (mines.includes(tileId)) {
                                                                                                                            // Mine Clicked
        document.getElementById(tileId).innerHTML= "<img src='mine.svg'>";
        document.getElementById(tileId).style.background = "rgb(195,51,51)"
        document.getElementById(tileId).style.background = "radial-gradient(circle, rgba(195,51,51,1) 0%, rgba(0,0,0,1) 100%)"
        hasBet = false;
        betInput.readOnly = false;
        mines = [];
        changeStyle("gameLost");
    } else {
                                                                                                                            // Gem Clicked
        totalGemsNumber--;
        gemsClicked.push(tileId);
        gemsRemaining.value = totalGemsNumber;
        document.getElementById(tileId).innerHTML = "<img src='gem.svg'>";
        document.getElementById(tileId).style.backgroundColor = "#0c0c0c";
        profitLabel.innerHTML = `Profit (x${multiplier[gemsClicked.length - 1][mines.length - 1]})`;
        profit.value = (betInput.value * multiplier[gemsClicked.length - 1][mines.length - 1]).toFixed(2);
                                                                                                                            // Game Won 
        if (gemsClicked.length == 25 - mines.length) {
            cashout();
            changeStyle("gameWon");
        }
    }
}

function alterBalanceInput(action) {
    if (hasBet) {
        return;
    }
    switch (action) {
        case "half": 
            betInput.value = betInput.value / 2;
            break;
        case "double":
            betInput.value = betInput.value * 2;
            break;
        case "allin":
            betInput.value = balance;
            break;
    }
}

function changeStyle(style) {
    switch (style) {
        case "initial": 
            minesInput.style.display = "initial";
            minesLabel.style.display = "initial";
            betBtn.style.display = "initial";
            gameInfo.style.display = "none";
            randomTileBtn.style.display = "none";
            cashoutBtn.style.display = "none";
            profitLabel.style.display = "none";
            profit.style.display = "none";
            gameResult.style.display = "none"
            playAgainBtn.style.display = "none";

            break;
        case "game":
            minesInput.style.display = "none";
            minesLabel.style.display = "none";
            betBtn.style.display = "none";
            gameInfo.style.display = "initial";
            randomTileBtn.style.display = "initial";
            cashoutBtn.style.display = "initial";
            profitLabel.style.display = "initial";
            profit.style.display = "initial";
            gameResult.style.display = "none";
            playAgainBtn.style.display = "none";
            break;
        case "gameWon":
            minesInput.style.display = "none";
            minesLabel.style.display = "none";
            betBtn.style.display = "none";
            gameInfo.style.display = "initial";
            randomTileBtn.style.display = "initial";
            cashoutBtn.style.display = "initial";
            profitLabel.style.display = "initial";
            profit.style.display = "initial";
            gameResult.innerHTML = "You Won!";
            gameResult.style.display = "initial";
            playAgainBtn.style.display = "initial";
            document.getElementById("money").innerHTML = balance.toFixed(2) + "$";
            break;
        case "gameLost":
            minesInput.style.display = "none";
            minesLabel.style.display = "none";
            betBtn.style.display = "none";
            gameInfo.style.display = "none";
            randomTileBtn.style.display = "none";
            cashoutBtn.style.display = "none";
            profitLabel.style.display = "none";
            profit.style.display = "none";
            gameResult.innerHTML = "You Lost!";
            gameResult.style.display = "initial";
            playAgainBtn.style.display = "initial";
            document.getElementById("money").innerHTML = balance.toFixed(2) + "$";
            break;
    }
}

function randomTile () {
    let tileGotClicked = false;
    while(!tileGotClicked) {
        let pickedTileId = Math.floor(Math.random() * 25) + 1;
        if (document.getElementById(pickedTileId).innerHTML == ""){
            tileClick(pickedTileId);
            tileGotClicked = true;
        }
    }
}

function cashout() {
    changeStyle("initial");
    hasBet = false;
    balance += profit.value;
    document.getElementById("money").innerHTML= Number(balance).toFixed(2) + "$";
    document.cookie = `balance=${balance}; path=/; domain=meinczak.github.io; expires=Tue, 01 Jan 2030 00:00:00 UTC; Secure`;
}
changeStyle("initial");