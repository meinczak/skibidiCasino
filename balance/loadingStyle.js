var napis = "";
var kropka = 0;
function kropki(){


    if(kropka<4){
        if(kropka==3){
            napis="...";
            kropka=-1;
        }
        else if(kropka==2){
            napis=".."
        }
        else if(kropka==1){
            napis="."
        }
        else if(kropka==0){
            napis=""
        }
        document.getElementById("Loading").innerHTML = "Loading" + napis;
        kropka++;

    }

}

setInterval(kropki, 500);