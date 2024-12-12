var output = document.getElementById("numer");

function kwota10(){
document.getElementById("numer").value = "10";
}

function kwota50(){
    document.getElementById("numer").value = "50";
}

function kwota100(){
document.getElementById("numer").value = "100";
}

function kwota500(){
    document.getElementById("numer").value = "500";
}

function confirm(){

    var button = document.getElementById("payment");
    var amt = document.getElementById("numer").value;

    if(amt < 1){
        document.getElementById("error").style.display = "block";
        document.getElementById("kwota").style.display = "none";
        document.getElementById("payment").disabled = true;
        document.getElementById("payment").style.backgroundColor = "rgb(36, 36, 36)";
        document.getElementById("payment").style.cursor = "not-allowed";

        button.onmouseover = function() {
            button.style.backgroundColor = 'rgb(36, 36, 36)';
          };
        button.onmouseout = function() {
            button.style.backgroundColor = 'rgb(36, 36, 36)';
          };
    }
    else{
    document.getElementById("kwota").innerHTML = "The deposit amount: " + amt + "$";
    document.getElementById("kwota").style.display = "block";
    document.getElementById("error").style.display = "none";
    document.getElementById("payment").disabled = false;
    document.getElementById("payment").style.backgroundColor = "#0c0c0c";
    document.getElementById("payment").style.cursor = "pointer";

    button.onmouseover = function() {
        button.style.backgroundColor = '#141414';
      };
    button.onmouseout = function() {
        button.style.backgroundColor = '#0c0c0c';
      };
    }
}

function pay(){
    setTimeout(function () {location.href = "loading.html";}, 300);
}

function balance1(){

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
var bal = ciasteczko('balance');
var balNumber = parseFloat(bal);
if (isNaN(balNumber)) balNumber = 0;

var liczba = parseFloat(document.getElementById("numer").value);
if (isNaN(liczba)) liczba = 0;
var liczba1 = balNumber + liczba;

document.cookie = `balance=${liczba1}; path=/; domain=meinczak.github.io; expires=Tue, 01 Jan 2030 00:00:00 UTC`;

   }

