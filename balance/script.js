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
    document.getElementById("kwota").innerHTML = "The deposit amount: " + amt + "PLN";
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
    location.href = "loading.html";

}