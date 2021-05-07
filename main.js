function celsiumFunc() {
    var celsiumTemp = document.getElementById("celsiumId").value;
    var farengateDiv = document.getElementById("farengateId");
    var farengateTemp = (9 / 5) * celsiumTemp + 32;

    farengateDiv.innerHTML = "Температрура, F " + farengateTemp;
    alert("Температрура, F " + farengateTemp);
}

