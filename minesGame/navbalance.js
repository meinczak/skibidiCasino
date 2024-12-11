function navbalance(){

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
    if (bal === null || bal === "") {
        bal = "0";
    }
    document.getElementById("money").innerHTML= bal;
    }