document.addEventListener('DOMContentLoaded', () => {

    // Funkcja do odczytu wartości cookie
    function getCookie(name) {
        const cookies = document.cookie.split('; ');
        for (let cookie of cookies) {
            const [key, value] = cookie.split('=');
            if (key === name) {
                return value;
            }
        }
        return null; 
    }
    
    // Funkcja do ustawiania wartości cookie
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/; meinczak.github.io; expires=Tue, 01 Jan 2030 00:00:00 UTC`;
    }
    
    const balanceCookie = getCookie('balance');
    let balanceCook = balanceCookie !== null ? Number(balanceCookie) : 0;
    if (isNaN(balanceCook)) {
        balanceCook = 0;
    }
    
    console.log(balanceCook);
    
    // Wyświetlanie aktualnego balansu na stronie
    const balanceDisplay = document.getElementById('balance');
    if (balanceDisplay) {
        balanceDisplay.textContent = `Balance: $${balanceCook}`;
    }
    
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
    
    function rollAll() {
        if (balanceCook < costPerSpin) {
            alert("Niewystarczający balans, aby zagrać.");
            return;
        }
        document.getElementById("arm").disabled = true;
        balanceCook -= costPerSpin;
        setCookie('balance', balanceCook, 7);
        document.getElementById("money").innerHTML= balanceCook+"$";
        
    
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
                    alert(`Gratulacje! Wygrana: $${winAmount}`);
                    balanceCook += winAmount;
                    document.getElementById("money").innerHTML= balanceCook+"$";
                    setCookie('balance', balanceCook, 7);
    
                    if (balanceDisplay) {
                        balanceDisplay.textContent = `Balance: $${balanceCook}`;
                    }
    
                    const slotsEl = document.querySelector(".slots");
                    const winCls = indexes[0] === indexes[2] ? "win2" : "win1";
                    slotsEl.classList.add(winCls);
                    
                    setTimeout(() => slotsEl.classList.remove(winCls), 2000);
                } else {
                    alert("Przegrałeś");
                    
                }
                document.getElementById("arm").disabled = false;
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
    