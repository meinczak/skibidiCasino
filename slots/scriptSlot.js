document.addEventListener('DOMContentLoaded', () => {
    const debugEl = document.getElementById('debug');
    const iconMap = ["banana", "seven", "cherry", "plum", "orange", "bell", "bar", "lemon", "melon"];
    const icon_width = 79;
    const icon_height = 79;
    const num_icons = 9;
    const time_per_icon = 100;
    const indexes = [0, 0, 0];
    const costPerSpin = 10;

    /**
     * Roll one reel
     */
    const roll = (reel, offset = 0) => {
        const delta = (offset + 2) * num_icons + Math.round(Math.random() * num_icons);

        return new Promise((resolve) => {
            const style = getComputedStyle(reel);
            const backgroundPositionY = parseFloat(style["background-position-y"]);
            const targetBackgroundPositionY = backgroundPositionY + delta * icon_height;
            const normTargetBackgroundPositionY = targetBackgroundPositionY % (num_icons * icon_height);

            setTimeout(() => {
                reel.style.transition = `background-position-y ${(8 + 1 * delta) * time_per_icon}ms cubic-bezier(.41,-0.01,.63,1.09)`;
                reel.style.backgroundPositionY = `${backgroundPositionY + delta * icon_height}px`;
            }, offset * 150);

            setTimeout(() => {
                reel.style.transition = `none`;
                reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
                resolve(delta % num_icons);
            }, (8 + 1 * delta) * time_per_icon + offset * 150);
        });
    };

    /**
     * Roll all reels, when promise resolves roll again
     */
    function rollAll() {
        
        const reelsList = document.querySelectorAll('.slots > .reel');

        Promise.all([...reelsList].map((reel, i) => roll(reel, i)))
            .then((deltas) => {
                deltas.forEach((delta, i) => indexes[i] = (indexes[i] + delta) % num_icons);
               
                // Sprawdzenie warunków wygranej
                let winAmount = 0;
                if (indexes[0] === indexes[1] && indexes[1] === indexes[2]) {
                    // Trzy takie same symbole - wygrana razy 10
                    winAmount = 10 * costPerSpin;
                } else if (indexes[0] === indexes[1] || indexes[1] === indexes[2]) {
                    // Dwa takie same symbole - wygrana razy 5
                    winAmount = 5 * costPerSpin;
                }

                if (winAmount > 0) {
                   alert(`Gratulacje! Wygrana: ${winAmount}$`) ;
                    const slotsEl = document.querySelector(".slots");
                    const winCls = indexes[0] === indexes[2] ? "win2" : "win1";
                    slotsEl.classList.add(winCls);
                    setTimeout(() => slotsEl.classList.remove(winCls), 2000);
                } else {
                    alert("przegrałeś")
                }
            });
    }

    // Sprawdzenie, czy przycisk istnieje przed przypisaniem zdarzenia
    const startButton = document.getElementById('arm');
    if (startButton) {
        startButton.addEventListener('click', () => {
            rollAll(); // Uruchomienie animacji po kliknięciu
        });
    } else {
        console.error('Nie znaleziono przycisku z ID "arm".');
    }
});
