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

function pokaz(){

    var amt = document.getElementById("numer").value;
    if(amt < 1){
        document.getElementById("error").style.display = "block";
    }
    else{
    document.getElementById("kwota").innerHTML = "The deposit amount is " + amt + "PLN";
    document.getElementById("error").style.display = "none";
    }
}