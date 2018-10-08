/**
* Titre: Labo 1 - Tableau.js
* Date: 7 octobre 2018
* Auteurs: Claudia Antoun (1920363) et Jeffrey Salloum (1902655)
* Desciption: Ce code permet de recréer un tableau Doodle.
*/

/**
* 
*/
function genererVueTableau()
{
    document.getElementById("spanCalendrier").style.display = "none";
    document.getElementById("spanTable").style.display = "block";
}

/**
* 
*/
function genererVueCalendrier()
{
    document.getElementById("spanTable").style.display = "none";
    genererCalendrier(listDate);
    document.getElementById("spanCalendrier").style.display = "block"; 
}

/**
* 
*/
function genererCalendrier(listDate)
{
    document.getElementById("calendrier").innerHTML = 
    "<div class = 'calendar-participants'>"+
        "<form>"+
            "<input type='text' id='fnameCalendrier' name='firstname' placeholder='Saisissez nom'>"+
        "</form>"+
    "</div>"+
    "<div class = 'calendar-date-span'>27 août – 31 août, 2018</div>"+
    "<div></div>";

    for(let i = 0; i < 5; i++)
    {
        let jourMois = listDate[2*i][0].substr(8, 2);
        let jourSemaine = listDate[2*i][0].substr(0, 3);

        document.getElementById("calendrier").innerHTML += 
        "<div class = 'calendar-dates'>"+
            "<span class ='calendar-date'>"+jourMois+"</span>"+
            "<span class='calendar-day'>"+jourSemaine+"</span>"+
        "</div>";
    }

    for(let i = 0; i < listDate.length; i++)
    {
        if(i == (listDate.length - 1))
        {
            document.getElementById("calendrier").innerHTML +=
            "<div class = 'calendar-time'>"+(8+i)+":00</div>"+
            "<div class = 'calendar-time'></div>"+
            "<div class = 'calendar-time'></div>"+
            "<div class = 'calendar-time'></div>"+
            "<div class = 'calendar-time'></div>"+
            "<div class = 'calendar-time'></div>"+
            "<div class = 'end-border'></div>"+
            "<div class = 'end-border'></div>"+
            "<div class = 'end-border'></div>"+
            "<div class = 'end-border'></div>"+
            "<div class = 'end-border'></div>"+
            "<div class = 'end-border'></div>";
        }
        else if((8+i) == 10 || (8+i) == 14)
        {
            document.getElementById("calendrier").innerHTML +=
            "<div class = 'calendar-time'>"+(8+i)+":00</div>";
            for(let i = 0; i < 5; i++)
            {
                document.getElementById("calendrier").innerHTML +=
                "<div class = 'blue-box'>"+
                    "<label class='container'>"+
                        "<input type='checkbox'>"+
                        "<span class='checkmark-calendar'></span>"+
                    "</label><br><br><br>"+
                    "<i class='fas fa-check'></i>"+
                "</div>";
            }
            document.getElementById("calendrier").innerHTML +=
            "<div class = 'light-border'></div>";   
        }
        else if((8+i) == 11 || (8+i) == 15)
        {
            document.getElementById("calendrier").innerHTML +=
            "<div class = 'calendar-time'>"+(8+i)+":00</div>"+
            "<div class='light-border'></div>";
        }
        else
        {
            document.getElementById("calendrier").innerHTML += 
            "<div class = 'calendar-time'>"+(8+i)+":00</div>"+
            "<div class = 'calendar-time'></div>"+
            "<div class = 'calendar-time'></div>"+
            "<div class = 'calendar-time'></div>"+
            "<div class = 'calendar-time'></div>"+
            "<div class = 'calendar-time'></div>"+
            "<div class = 'light-border'></div>"+
            "<div class = 'light-border'></div>"+
            "<div class = 'light-border'></div>"+
            "<div class = 'light-border'></div>"+
            "<div class = 'light-border'></div>"+
            "<div class = 'light-border'></div>";
        }
    }
}

/**
* 
*/
function appuyerCrayon(indice, listDate, listParticipant)
{
    document.getElementById("fname").value = listParticipant[indice].Nom;
    // document.getElementById("fnameCalendrier").value = listParticipant[indice].Nom;

    for(let i = 0; i < listDate.length; i++)
    {
        if(listParticipant[indice].Disponibilités[i])
        {
            document.getElementById("checkbox"+i).checked = true;
            document.getElementById("temps"+i).style.backgroundColor = "rgb(235, 247, 212)";
            document.getElementById("dispoParJour"+i).style.backgroundColor = "rgb(235, 247, 212)";
        }
        else
        {
            document.getElementById("checkbox"+i).checked = false;
            document.getElementById("temps"+i).style.backgroundColor = "white";
            document.getElementById("dispoParJour"+i).style.backgroundColor = "white";
        }
        listParticipant[indice].Statut = "EnCours";
        viderTable();
        chargerPage(data);
    }
}

/**
* 
*/
function viderTable()
{
    document.getElementById("table").innerHTML = '';
}

/**
* 
*/
function obtenirParticipantEnCours(listParticipant)
{
    for(let i = 0; i < listParticipant.length; i++)
    {
        if (listParticipant[i].Statut == "EnCours") 
        {
            return i;
        }
    }
}

/**
* 
*/
function soumettre(data)
{
    let participantEnCours = data.Participants[obtenirParticipantEnCours(listParticipant)];

    if(participantEnCours == data.Participants[0])
    {
        let tableDesDisponibilites = [];
        for (let i = 0; i < data.Calendrier.length; i++)
        {
            if(document.getElementById("checkbox"+i).checked)
            {
                tableDesDisponibilites[i] = 1;
            }
            else
            {
                tableDesDisponibilites[i] = 0;
            }
        }
        data['Participants'].push(
        {
            "Nom" : document.getElementById("fname").value,
            "Statut" : "Complété",
            "Disponibilités" : tableDesDisponibilites
        });
    }
    else
    {
        for(var i = 0; i < data.Calendrier.length; i++)
        {
            if(document.getElementById("checkbox"+i).checked)
            {
                participantEnCours.Disponibilités[i] = 1;
            }
            else
            {
                participantEnCours.Disponibilités[i] = 0;
            }
        }
        participantEnCours.Statut = "Complété";
        data.Participants[0].Statut = "EnCours";
    }
    viderTable();
    chargerPage(data);
}

/**
* 
*/
function ecouterAppuieCrayon(crayon)
{
    let crayonId = crayon.id;
    let indice = crayonId.substr(18,1);
    document.getElementById("crayonParticipants"+indice).addEventListener("click", appuyerCrayon(indice, listDate, listParticipant));
}

/**
* 
*/
function genererDisponibilitesParPersonne(data)
{
    for(let i = 0; i < data.Participants.length; i++)
    {
        let nom = data.Participants[i].Nom;
        if( data.Participants[i].Statut == "Complété")
        {
            if(i == (data.Participants.length - 1))
            {
                document.getElementById("table").innerHTML +=
                "<div class='registered-names-erase-border-top'>"+
                    "<div>"+
                        "<img src='Images/particip2.png'>"+
                    "</div>"+
                    "<div class='style-registered-names'>"+
                        nom+
                    "</div>"+
                    "<div onclick='ecouterAppuieCrayon(this)' id='crayonParticipants"+i+"' class='pencil'>"+
                        "<a href='#'>"+
                            "<i class='fas fa-pencil-alt'></i>"+
                        "</a>"+
                    "</div>"+
                "</div>";
            }
            else
            {
                document.getElementById("table").innerHTML +=
                "<div class='registered-names-grid'>"+
                    "<div>"+
                        "<img src='Images/particip2.png'>"+
                    "</div>"+
                    "<div class='style-registered-names'>"+
                        nom+
                    "</div>"+
                    "<div onclick='ecouterAppuieCrayon(this)' id='crayonParticipants"+i+"' class='pencil'>"+
                        "<a href='#'>"+
                            "<i class='fas fa-pencil-alt'></i>"+
                        "</a>"+
                    "</div>"+
                "</div>";
            }

            for(let j = 0; j < data.Calendrier.length; j++)
            {
                let jourSemaine = data.Calendrier[j][0].substr(0, 3);
                let mois = data.Calendrier[j][0].substr(4, 3);
                let jourMois = data.Calendrier[j][0].substr(8, 2);
                let heure = data.Calendrier[j][0].substr(16, 5);
                let nouvelleHeure = new Date(data.Calendrier[j][0]);
                nouvelleHeure = new Date(nouvelleHeure.getTime() + data.Calendrier[j][1] * 60000);
                nouvelleHeure = nouvelleHeure.toString().substr(16, 5);

                if(data.Participants[i].Disponibilités[j])
                {
                    document.getElementById("table").innerHTML +=
                    "<div class='background-green-check'>"+
                        "<div class='tooltip'>"+
                            "<div class='tooltiptext'>"+
                                "<div class='tooltip'>"+
                                    mois+"<br><br>"+jourMois+"<br><br>"+jourSemaine+
                                    "<div class='time-tooltip'>"+
                                        heure+"<br>"+nouvelleHeure+
                                    "</div>"+
                                "</div>"+
                                "<div class='disponibility-tooltip'>"+
                                    nom+"<br>Voted 'Yes'"+
                                "</div>"+
                            "</div>"+
                        "</div>"+
                    "</div>";
                }
                else
                {
                    document.getElementById("table").innerHTML +=
                    "<div class='background-color-pink'>"+
                        "<div class='tooltip'>"+
                            "<div class='tooltiptext'>"+
                                "<div class='tooltip'>"+
                                    mois+"<br><br>"+jourMois+"<br><br>"+jourSemaine+
                                    "<div class='time-tooltip'>"+
                                        heure+"<br>"+nouvelleHeure+
                                    "</div>"+
                                "</div>"+
                                "<div class='disponibility-tooltip'>"+
                                    nom+"<br>Didn't vote for this"+
                                "</div>"+
                            "</div>"+
                        "</div>"+
                    "</div>";
                }
            }
        }
    }
    chargerPage(data);
    document.getElementById("fname").onkeydown = function(event)
    {
        if(event.keyCode == 13)
        {
            soumettre(data);
        }
    }
}

/**
* 
*/
function appuyerCheckBox(checkbox)
{
    let checkmarkId = checkbox.id;
    let indice = checkmarkId.substr(8,1);
    if(checkbox.checked)
    {
        document.getElementById("temps"+indice).style.backgroundColor = "rgb(235, 247, 212)";
        document.getElementById("dispoParJour"+indice).style.backgroundColor = "rgb(235, 247, 212)";
    }
    else
    {
        document.getElementById("temps"+indice).style.backgroundColor = "white";
        document.getElementById("dispoParJour"+indice).style.backgroundColor = "white";
    }
}

/**
* 
*/
function genererCheckBox(data)
{
    for(let i = 0; i < data.Calendrier.length; i++)
    {
        document.getElementById("table").innerHTML +=
        "<div class='background-color-blue'>"+
            "<label class='container'>"+
                "<input onchange='appuyerCheckBox(this)' type='checkbox' id='checkbox"+i+"'>"+
                "<span class='checkmark'></span>"+
            "</label>"+
        "</div>";
    }
}

/**
* 
*/
function genererZoneDeSaisie()
{
    document.getElementById("table").innerHTML +=
    "<div class='image-align-input-box'>"+
        "<span>"+
            "<img src='Images/particip1.png'>"+
        "</span>"+
        "<form>"+
            "<input type='text' id='fname' name='firstname' placeholder='Saisissez nom'>"+
        "</form>"+
    "</div>";
}

/**
* 
*/
function genererNombreParticipants(data)
{
    let nombreParticipantsTotal = 0;
    for(let i = 0; i < data.Participants.length; i++)
    {
        if(data.Participants[i].Statut == "Complété")
        {
            nombreParticipantsTotal++;
        }
    }
    document.getElementById("table").innerHTML += 
    "<div class='style-number-participants'>"+
        "<strong>"+nombreParticipantsTotal+" participants</strong>"+
    "</div>";
}

/**
* 
*/
function genererDisponibilitesParJour(data)
{
    for(let i = 0; i < data.Calendrier.length; i++)
    {
        let disponibilitesParJour = 0;
        for(let j = 0; j < data.Participants.length; j++)
        {
            disponibilitesParJour += data.Participants[j].Disponibilités[i];
        }
        document.getElementById("table").innerHTML += 
        "<div class='image-align-check' id='dispoParJour"+i+"'>"+
            "<img src='Images/tick2.png' class='blue-check-size'>"+
            "<strong>"+disponibilitesParJour+"</strong>"+
        "</div>";
    }
}

/**
* 
*/
function genererTemps(data)
{
    document.getElementById("table").innerHTML += "<div></div>";
    for(let i = 0; i < data.Calendrier.length; i++)
    {
        let jourSemaine = data.Calendrier[i][0].substr(0, 3);
        let mois = data.Calendrier[i][0].substr(4, 3);
        let jourMois = data.Calendrier[i][0].substr(8, 2);
        let heure = data.Calendrier[i][0].substr(16, 5);
        let nouvelleHeure = new Date(data.Calendrier[i][0]);
        nouvelleHeure = new Date(nouvelleHeure.getTime() + data.Calendrier[i][1] * 60000);
        nouvelleHeure = nouvelleHeure.toString().substr(16, 5);

        document.getElementById("table").innerHTML += 
        "<div class='padding-date' id='temps"+i+"'>"+mois+"<br>"+
            "<span class='date'>"+
                jourMois+
            "</span><br>"+
            "<span class='day'>"+
                jourSemaine+
            "</span><br><br>"+
            "<span class='time'>"+
                heure+"<br>"+nouvelleHeure+
            "</span>"+
        "</div>";
    }
}

/**
* 
*/
function chargerPage(data)
{
    genererTemps(data);
    genererNombreParticipants(data);
    genererDisponibilitesParJour(data);
    genererZoneDeSaisie();
    genererCheckBox(data);
    genererDisponibilitesParPersonne(data);
}

/**
* 
*/
function genererTableau()
{
    fetch("http://127.0.0.1:8080/cal-data.json").then(response => 
    {
        return response.json();
    }
    ).then(data =>
    {
        listParticipant = data["Participants"];
        listDate = data["Calendrier"];

        chargerPage(data);

        appuyerCrayon(indice, listDate, listParticipant);
        ecouterAppuieCrayon(crayon);

        genererVueCalendrier();
    });
}