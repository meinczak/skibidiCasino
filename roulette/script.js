function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      return value;
    }
  }
  return null;
}

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

const balanceCookie = getCookie("balance");
let balanceCook = balanceCookie !== null ? Number(balanceCookie) : 0;
if (isNaN(balanceCook)) {
  balanceCook = 0;
}

let isSpinning = false;
let isBetPlaced = false;  // Dodana flaga do śledzenia, czy zakład został postawiony

let totalchip = 0;
let currentBets = [];
let chips = [];

function updateBalanceDisplay() {
  document.getElementById("money").innerHTML = balanceCook + "$";
}

function chipTotal(value) {
  if (totalchip + value > balanceCook) { 
    alert("Nie masz wystarczającego balansu!");
  } else {
    totalchip += value;
    document.getElementById("chipvalue").innerHTML = totalchip;
  }
}

function resetChip() {
  document.getElementById("chipvalue").innerHTML = "";
  totalchip = 0;
}

function resetTable() {
  document.querySelectorAll(".chipontable").forEach((chip) => {
    const parentCell = chip.parentElement;
    const originalValuev = parentCell.getAttribute("data-in");
    const originalValue = parentCell.getAttribute("data-value");

    const chipObject = chips.find((c) => c.grid === originalValue);
    const chipValue = chipObject ? chipObject.valueofBet : 0;

    parentCell.innerHTML = originalValuev;

    chips = chips.filter((c) => c.grid !== originalValue);

    balanceCook += chipValue;
    setCookie("balance", balanceCook, 7);

    updateBalanceDisplay();

    currentBets = currentBets.filter((bet) => bet.value !== originalValue);
  });

  document.querySelectorAll(".chipontable").forEach((el) => el.remove());
}

function table(grid) {
  if (totalchip <= 0) {
    alert("Najpierw wybierz żetony!");
    return;
  }
  if (balanceCook === 0 || totalchip > balanceCook) { // Added balance check before placing a bet
    alert("Nie masz wystarczającego salda do postawienia zakładu!");
    return;
  }
  var clickedCell = document.getElementById(grid);
  if (clickedCell) {
    let betType = clickedCell.getAttribute("data-type");
    let betValue = clickedCell.getAttribute("data-value");

    if (
      currentBets.some((bet) => bet.type === betType && bet.value === betValue)
    ) {
      return;
    }
    if (isSpinning) {
      return;
    }
    currentBets.push({ type: betType, value: betValue });

    var chip = document.createElement("button");
    chip.className = "chipontable";
    chip.innerHTML = `${totalchip}`;
    chip.setAttribute("data-number", totalchip);
    chip.setAttribute("data-grid", betValue);

    chips.push({ valueofBet: totalchip, grid: betValue });
    clickedCell.innerHTML = "";
    clickedCell.appendChild(chip);
    balanceCook -= totalchip;
    setCookie("balance", balanceCook, 7);
    updateBalanceDisplay();

    isBetPlaced = true;  // Ustawiamy flagę na true po postawieniu zakładu
  }
}

document.addEventListener("contextmenu", (event) => {
  if (isSpinning) {
    return;
  }

  if (event.target.classList.contains("chipontable")) {
    event.preventDefault();

    const chip = event.target;
    const parentCell = chip.parentElement;
    const originalValuev = parentCell.getAttribute("data-in");
    const originalValue = parentCell.getAttribute("data-value");

    const chipObject = chips.find((c) => c.grid === originalValue);
    const chipValue = chipObject ? chipObject.valueofBet : 0;

    parentCell.innerHTML = originalValuev;

    chips = chips.filter((c) => c.grid !== originalValue);

    balanceCook += chipValue;
    setCookie("balance", balanceCook, 7);

    updateBalanceDisplay();

    currentBets = currentBets.filter((bet) => bet.value !== originalValue);
  }
});

(function (loader) {
  document.addEventListener("DOMContentLoaded", loader[0], false);
})([
  function () {
    "use strict";

    function rand(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    var pallete = [
      "r18", "b8", "r19", "g2", "r20", "r21", "b9", "r10", "g3", "r11", "b4", "r12", "b5", "r13", "b6", "r14", "g0", "r15", "b7", "r16", "g1", "r17",
    ];

    var bets = {
      green: [0, 2, 3],
      red: [18, 19, 20, 21, 10, 11, 12, 13, 14, 15, 16, 17],
      black: [8, 9, 4, 5, 6, 7],
    };

    var wrap = document.querySelector(".roulette-container .wrap");

    function spin_promise(color, number) {
      return new Promise((resolve) => {
        let index = pallete.indexOf(color[0] + number);
        if (index !== -1) {
          let pixels = 80 * index;
          pixels = rand(pixels + 2, pixels + 79);
          let circles = 1760 * 15;
          pixels += circles;
          pixels *= -1;

          wrap.style.backgroundPosition = `${pixels + wrap.offsetWidth / 2}px`;

          setTimeout(() => {
            wrap.style.transition = "none";
            wrap.style.backgroundPosition = `${
              (pixels * -1 - circles) * -1 + wrap.offsetWidth / 2
            }px`;
            setTimeout(() => {
              wrap.style.transition = "background-position 5s";
              resolve();
            }, 510);
          }, 5700);
        }
      });
    }

    function play(betType, betValue, betAmount) {
      document.getElementById("placeBet").disabled = true;
      document.getElementById("resetchip").disabled = true;
      document.getElementById("resetbet").disabled = true;
      let color;
      let bet;
      let r = rand(1, 1000);

      if (r < 30) color = "green";
      else if (r < 530) color = "red";
      else color = "black";

      bet = bets[color][rand(0, bets[color].length)];

      isSpinning = true;

      spin_promise(color, bet).then(() => {
        let totalWin = 0;

        currentBets.forEach((currentBet) => {
          let win = false;
          let multiplier = 0;

          const foundChip = chips.find(
            (chip) => chip.grid === currentBet.value
          );

          if (!foundChip) {
            return;
          }

          if (currentBet.type === "number" && currentBet.value == bet) {
            win = true;
            multiplier = 3.0;
          } else if (
            currentBet.type === "color" &&
            currentBet.value === color
          ) {
            win = true;
            multiplier = 2.0;
          } else if (
            currentBet.type === "parity" &&
            ((currentBet.value === "odd" && bet % 2 !== 0) ||
              (currentBet.value === "even" && bet % 2 === 0))
          ) {
            win = true;
            multiplier = 2.5;
          } else if (currentBet.type === "range") {
            if (
              (currentBet.value === "1 to 7" && bet >= 1 && bet <= 7) ||
              (currentBet.value === "8 to 14" && bet >= 8 && bet <= 14) ||
              (currentBet.value === "15 to 21" && bet >= 15 && bet <= 21)
            ) {
              win = true;
              multiplier = 1.5;
            }
          }

          if (win) {
            const chipWin = foundChip.valueofBet * multiplier;

            balanceCook += chipWin;
            document.getElementById("money").innerHTML = balanceCook + "$";
            setCookie("balance", balanceCook, 7);
            totalWin += chipWin;
          }
        });

        if (totalWin > 0) {
          alert(`Wygrałeś! Łączna wygrana: ${totalWin}`);
        } else {
          alert("Przegrałeś!");
        }

       
        location.reload();

        currentBets = [];

        document.getElementById("placeBet").disabled = false;
        document.getElementById("resetchip").disabled = false;
        document.getElementById("resetbet").disabled = false;

        isSpinning = false;
      });
    }

    document.getElementById("placeBet").addEventListener("click", function () {
      if (!isBetPlaced) {  // Sprawdzamy, czy zakład został postawiony przed pozwoleniem na kręcenie
        alert("Najpierw postaw zakład!");
        return;
      }
      
      play();  // Uruchomienie gry, jeśli zakład został postawiony
    });
  },
]);
