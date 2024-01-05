window.addEventListener("load", function () {
    // Stran naložena

    var prizgiCakanje = function () {
        document.querySelector(".loading").style.display = "block";
    };

    var ugasniCakanje = function () {
        document.querySelector(".loading").style.display = "none";
    };

    document.querySelector("#nalozi").addEventListener("click", prizgiCakanje);

    // Pridobi seznam datotek
    var pridobiSeznamDatotek = function (event) {
        prizgiCakanje();
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var datoteke = JSON.parse(xhttp.responseText);

                var datotekeHTML = document.querySelector("#datoteke");

                for (var i = 0; i < datoteke.length; i++) {
                    var datoteka = datoteke[i];

                    var velikost = datoteka.velikost;
                    var enota = "B";


                    if (velikost >= 1024) {
                        velikost = Math.round(velikost / 1024);
                        enota = "KiB";
                    }
                    if (velikost >= 1024) {
                        velikost = Math.round(velikost / 1024);
                        enota = "MiB";
                    }
                    if (velikost >= 1024) {
                        velikost = Math.round(velikost / 1024);
                        enota = "GiB";
                    }

                    //doda gradnik z podatki o datoteki in vsebuje gumb za prenos
                    datotekeHTML.innerHTML +=
                        " <div class='datoteka senca rob'>" +
                        "<div class='naziv_datoteke'> " +
                        datoteka.datoteka +
                        "  (" +
                        velikost +
                        " " +
                        enota +
                        ") </div><div class='akcije'> " +
                        "<span><a href='/poglej/" + datoteka.datoteka + "' target='_blank'>Poglej</a></span>" +
                        "| <span><a href='/prenesi/" + datoteka.datoteka + "' target='_self'>Prenesi</a></span>" +
                        " | <span akcija='brisi' datoteka='" + datoteka.datoteka + "'>Izbriši</span> </div></div>";
                }

                if (datoteke.length > 0) {
                    var brisanje = document.querySelectorAll("span[akcija=brisi]");
                    for (var i = 0; i < brisanje.length; i++)
                        brisanje[i].addEventListener("click", brisi);
                }
                ugasniCakanje();
            }
        };
        //AJAX zahteva
        //pridobi seznam datotek s strežnika
        xhttp.open("GET", "/datoteke", true);
        //pošlje seznam datotek na /datoteke
        xhttp.send();
    };
    pridobiSeznamDatotek();

    var brisi = function (event) {
        prizgiCakanje();
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                if (xhttp.responseText == "Datoteka izbrisana") {
                    window.location = "/";
                } else {
                    alert("Datoteke ni bilo možno izbrisati!");
                }
            }
            ugasniCakanje();
        };
        xhttp.open("GET", "/brisi/" + this.getAttribute("datoteka"), true);
        xhttp.send();
    };
});
