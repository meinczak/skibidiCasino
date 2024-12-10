function nickname(){
    var pole = document.getElementById("pole").value;
    document.cookie = `username=${pole}; path=/`;


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
    
        document.getElementById("nick").innerHTML= "<h2>Nickname: " + nickname+"</h2>";
        document.getElementById("pole").value="";
    }


    function zmien(){
        document.getElementById("podmiana").style.display="block";
    }