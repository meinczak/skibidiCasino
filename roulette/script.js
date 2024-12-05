let totalchip = 0;
let currentBets = []; // Tablica na różne zakłady
let chips=[];
function chipTotal(value) {
    totalchip += value;
    document.getElementById("chipvalue").innerHTML = totalchip;
}
function resetChip()
{
    document.getElementById("chipvalue").innerHTML = "";
    totalchip = 0;
}
function resetTable()
{
   
    document.querySelectorAll('.chipontable').forEach(el => el.remove());
    currentBets=[];
    document.querySelectorAll("#betType td").forEach(cell => {
        cell.innerHTML = cell.dataset.value;})
   
    
}
function table(grid) {
    var clickedCell = document.getElementById(grid);

    if (clickedCell) {
        let betType = clickedCell.getAttribute('data-type');
        let betValue = clickedCell.getAttribute('data-value');

        console.log(`Wybrano: Typ - ${betType}, Wartość - ${betValue}`);

        // Sprawdzanie, czy zakład już istnieje
        if (currentBets.some(bet => bet.type === betType && bet.value === betValue)) {
            alert("Zakład na to pole już został postawiony!");
            return;
        }

        // Dodaj zakład do listy
        currentBets.push({ type: betType, value: betValue });

        if (totalchip > 0) {
            var chip = document.createElement("button");
            chip.className = "chipontable";
            chip.innerHTML = `${totalchip}`;
            chip.setAttribute('data-number', totalchip);
            chip.setAttribute('data-grid', betValue)
            clickedCell.innerHTML = '';
            clickedCell.appendChild(chip);
            chips.push({
                number: totalchip,
                grid: betValue
            })
            console.log(`utworzono chip o wartości ${chips.number}`)
        } else {
            alert("Najpierw dodaj żetony!");
        }
    }
}

(function(loader) {
    document.addEventListener("DOMContentLoaded", loader[0], false);
})([function () {
    "use strict";

    function rand(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    var pallete = [
        "r18", "b8", "r19", "g2", "r20", "r21", "b9", "r10",
        "g3", "r11", "b4", "r12", "b5", "r13", "b6",
        "r14", "g0", "r15", "b7", "r16", "g1", "r17"
    ];

    var bets = {
        "green": [0, 2, 3],
        "red": [18, 19, 20, 21, 10, 11, 12, 13, 14, 15, 16, 17],
        "black": [8, 9, 4, 5, 6, 7]
    };

    var wrap = document.querySelector('.roulette-container .wrap');

    function spin_promise(color, number) {
        return new Promise((resolve) => {
            let index = pallete.indexOf(color[0] + number);
            if (index !== -1) {
                let pixels = 80 * (index);
                pixels = rand(pixels + 2, pixels + 79);
                let circles = 1760 * 15; // 15 obrotów
                pixels += circles;
                pixels *= -1;

                wrap.style.backgroundPosition = `${pixels + wrap.offsetWidth / 2}px`;

                setTimeout(() => {
                    wrap.style.transition = "none";
                    wrap.style.backgroundPosition = `${((pixels * -1) - circles) * -1 + wrap.offsetWidth / 2}px`;
                    setTimeout(() => {
                        wrap.style.transition = "background-position 5s";
                        resolve();
                    }, 510);
                }, 5700);
            }
        });
    }

    function play(betType, betValue, betAmount) {
        let color;
        let bet;
        let r = rand(1, 1000);

        // Losowanie koloru
        if (r < 30) color = "green";
        else if (r < 530) color = "red";
        else color = "black";

        // Losowanie numeru w danym kolorze
        bet = bets[color][rand(0, bets[color].length)];

        // Wywołanie animacji ruletki
        spin_promise(color, bet).then(() => {
            let winBets = 0; // Liczba wygranych zakładów
           
            // Oblicz stawkę na jeden zakład
           
            let totalWin = totalchip;
            // Sprawdzanie warunków wygranej dla każdego zakładu
            currentBets.forEach((currentBet) => {
                let win = false;
                if (currentBet.type === "number" && currentBet.value == bet) {
                    win = true;
                    totalWin = totalWin*22;
                } else if (currentBet.type === "color" && currentBet.value === color) {
                    win = true;
                    totalWin = totalWin*3;
                } else if (currentBet.type === "parity" && 
                           ((currentBet.value === "odd" && bet % 2 !== 0) || 
                            (currentBet.value === "even" && bet % 2 === 0))) {
                    win = true;
                    totalWin = totalWin*2;
                } else if (currentBet.type === "range") {
                    if ((currentBet.value === "1 to 7" && bet >= 1 && bet <= 7) ||
                        (currentBet.value === "8 to 14" && bet >= 8 && bet <= 14) ||
                        (currentBet.value === "15 to 21" && bet >= 15 && bet <= 21)) {
                        win = true;
                        totalWin = totalWin*3;
                    }
                }

                // Jeśli wygrana, zliczamy ją
                if (win) {
                    winBets++;
            
                }
            });

            // Wygrana całkowita
            

            if (winBets > 0) {
                alert(`Wygrałeś! Wygrana: ${totalWin}`);
                resetChip();
                resetTable();
            } else {
                alert("Przegrałeś!");
                resetChip();
                resetTable();
            }

            // Reset zakładów
            currentBets = [];

            // Odblokowanie przycisku po zakończeniu gry
            document.getElementById('placeBet').disabled = false;
            document.getElementById('resetchip').disabled = false;
            document.getElementById('resetbet').disabled = false;
        });
    }

    document.getElementById('placeBet').addEventListener('click', function() {
        if (currentBets.length === 0) {
            alert("Najpierw wybierz pole zakładu.");
            return;
        }

        if (totalchip <= 0) {
            alert("Musisz postawić co najmniej 1 żeton.");
            return;
        }

        // Zablokowanie przycisku zakładu na czas gry
        document.getElementById('placeBet').disabled = true;
            document.getElementById('resetchip').disabled = true;
            document.getElementById('resetbet').disabled = true;

        // Rozpoczynamy grę
        play(currentBets[0].type, currentBets[0].value, totalchip);
    });
}]);
