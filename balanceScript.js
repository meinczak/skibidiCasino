function balance(){
   // var pole = document.getElementById("pole").value;
   // document.cookie = `balance=${pole}; path=/; domain=127.0.0.1`;


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

    var money = ciasteczko('balance');
    document.getElementById("money").innerHTML= money;
    }