function nickname(){
    var pole = document.getElementById("imie").value;

    document.cookie = `username=${pole}; path=/`;
    console.log(pole)
}

function wyswietl(){
    alert(document.cookie);
    console.log(document.cookie)
    
}