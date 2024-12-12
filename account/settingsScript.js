function nickname(){
    var pole = document.getElementById("pole").value;
    document.cookie = `username=${pole}; path=/; domain=meinczak.github.io; expires=Tue, 01 Jan 2030 00:00:00 UTC; Secure`;


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

    var nickname = ciasteczko('username');

    document.getElementById("nick").innerHTML= "<h2>Nickname: " + nickname+"</h2>";
    document.getElementById("pole").value="";
    document.getElementById("podmiana").style.display="none";
    }
    
    function mailfunkcja(){
        var pole1 = document.getElementById("pole1").value;
        document.cookie = `email=${pole1}; path=/; domain=meinczak.github.io; expires=Tue, 01 Jan 2030 00:00:00 UTC; Secure`;
    
    
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
    
        var adres = ciasteczko('email');
    
        document.getElementById("mail").innerHTML= "<h2>Email: " + adres+"</h2>";
        document.getElementById("pole1").value="";
        document.getElementById("podmiana1").style.display="none";
        }

    function flash(){
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
    
        var nickname = ciasteczko('username');
        var mailadress= ciasteczko('email')
    
        document.getElementById("nick").innerHTML= "<h2>Nickname: " + nickname+"</h2>";
        document.getElementById("mail").innerHTML= "<h2>Mail: " + mailadress+"</h2>";
    }


    function zmien(){
        document.getElementById("podmiana").style.display="block";
    }

    function zmienmail(){
        document.getElementById("podmiana1").style.display="block";
    }