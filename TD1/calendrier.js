/**
* Titre: Labo 1 - Tableau.js
* Date: 7 octobre 2018
* Auteurs: Claudia Antoun (1920363) et Jeffrey Salloum (1902655)
* Desciption: Ce code permet de recréer un tableau Doodle.
*/

function genererVueTableau()
{
    document.getElementById("spanCalendrier").style.display = "none";
    document.getElementById("spanTable").style.display = "block";
}

function genererVueCalendrier(listDate)
{
    document.getElementById("spanTable").style.display = "none";
    document.getElementById("calendrier").innerHTML = 
    "<div class = 'calendar-participants'><form><input type='text' id='fnameCalendrier' name='firstname' placeholder='Saisissez nom'></form></div><div class = 'calendar-date-span'>27 août – 31 août, 2018</div><div></div>";

    for(let i = 0; i < 5; i++)
    {
        //ICI AUSSI???
        let jourMois = listDate[2*i][0].substr(8, 2);
        let jourSemaine = listDate[2*i][0].substr(0, 3);

        document.getElementById("calendrier").innerHTML += 
        "<div class = 'calendar-dates'><span class ='calendar-date'>"+jourMois+
        "</span><span class='calendar-day'>"+jourSemaine+
        "</span></div>";
    }

    for(let i = 0; i < listDate.length; i++)
    {
        if(i == (listDate.length - 1))
        {
            document.getElementById("calendrier").innerHTML +=
            "<div class = 'calendar-time'>"+(8+i)+
            ":00</div><div class = 'calendar-time'></div><div class = 'calendar-time'></div><div class = 'calendar-time'></div><div class = 'calendar-time'></div><div class = 'calendar-time'></div><div class = 'end-border'></div><div class = 'end-border'></div><div class = 'end-border'></div><div class = 'end-border'></div><div class = 'end-border'></div><div class = 'end-border'></div>";
        }
        else
        {
            document.getElementById("calendrier").innerHTML += 
            "<div class = 'calendar-time'>"+(8+i)+
            ":00</div><div class = 'calendar-time'></div><div class = 'calendar-time'></div><div class = 'calendar-time'></div><div class = 'calendar-time'></div><div class = 'calendar-time'></div><div class = 'light-border'></div><div class = 'light-border'></div><div class = 'light-border'></div><div class = 'light-border'></div><div class = 'light-border'></div><div class = 'light-border'></div>";
        }
    }
    document.getElementById("spanCalendrier").style.display = "block"; 
}

function appuyerCrayon(indice, listDate, listParticipant)
{
    document.getElementById("fname").value = listParticipant[indice].Nom;

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
    }
    document.getElementById("fname").onkeydown = function(event)
    {
        if(event.keyCode == 13)
        {
            submit(data);
        }
    }
}

function ecouterAppuieCrayon(crayon)
{
    let crayonId = crayon.id;
    let indice = crayonId.substr(18,1);
    document.getElementById("crayonParticipants"+indice).addEventListener("click", appuyerCrayon(indice, listDate, listParticipant));
}

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
                "<div class='registered-names-erase-border-top'><div><img src='Images/particip2.png'></div><div class='style-registered-names'>"+nom+
                "</div><div onclick='ecouterAppuieCrayon(this)' id='crayonParticipants"+i+"' class='pencil'><a href='#'><i class='fas fa-pencil-alt'></i></a></div></div>";
            }
            else
            {
                document.getElementById("table").innerHTML +=
                "<div class='registered-names-grid'><div><img src='Images/particip2.png'></div><div class='style-registered-names'>"+nom+
                "</div><div onclick='ecouterAppuieCrayon(this)' id='crayonParticipants"+i+"' class='pencil'><a href='#'><i class='fas fa-pencil-alt'></i></a></div></div>";
            }

            for(let j = 0; j < data.Calendrier.length; j++)
            {
                //FIND A WAY TO NOT REPEAT THIS!!!!
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
                    "<div class='background-green-check'><div class='tooltip'><div class='tooltiptext'><div class='tooltip'>"+mois+
                    "<br><br>"+jourMois+
                    "<br><br>"+jourSemaine+
                    "<div class='time-tooltip'>"+heure+
                    "<br>"+nouvelleHeure+
                    "</div></div><div class='disponibility-tooltip'>"+nom+
                    "<br>Voted 'Yes'</div></div></div></div>";
                }
                else
                {
                    document.getElementById("table").innerHTML +=
                    "<div class='background-color-pink'><div class='tooltip'><div class='tooltiptext'><div class='tooltip'>"+mois+
                    "<br><br>"+jourMois+
                    "<br><br>"+jourSemaine+
                    "<div class='time-tooltip'>"+heure+
                    "<br>"+nouvelleHeure+
                    "</div></div><div class='disponibility-tooltip'>"+nom+
                    "<br>Didn't vote for this</div></div></div></div>";
                }
            }
        }
    }
}

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

function genererCheckBox(listDate)
{
    //put dispos de michel toutes a zero
    for(let i = 0; i < listDate.length; i++)
    {
        document.getElementById("table").innerHTML +=
        "<div class='background-color-blue'><label class='container'><input onchange='appuyerCheckBox(this)' type='checkbox' id='checkbox"+i+"'><span class='checkmark'></span></label></div>";
    }
}

function genererZoneDeSaisie()
{
    //put michel as en cours
    document.getElementById("table").innerHTML +=
    "<div class='image-align-input-box'><span><img src='Images/particip1.png'></span><form><input type='text' id='fname' name='firstname' placeholder='Saisissez nom'></form></div>";
}

function genererNombreParticipants(listParticipant)
{
    let nombreParticipantsTotal = 0;
    for(let i = 0; i < listParticipant.length; i++)
    {
        if(listParticipant[i].Statut == "Complété")
        {
            nombreParticipantsTotal++;
        }
    }
    document.getElementById("table").innerHTML += 
    "<div class='style-number-participants'><strong>"+nombreParticipantsTotal+
    " participants"+"</strong></div>";
}

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
        "<div class='image-align-check' id='dispoParJour"+i+"'><img src='Images/tick2.png' class='blue-check-size'><strong>"
        +disponibilitesParJour+"</strong></div>";
    }
}

function genererTemps(listDate)
{
    document.getElementById("table").innerHTML += "<div></div>";
    for(let i = 0; i < listDate.length; i++)
    {
        let jourSemaine = listDate[i][0].substr(0, 3);
        let mois = listDate[i][0].substr(4, 3);
        let jourMois = listDate[i][0].substr(8, 2);
        let heure = listDate[i][0].substr(16, 5);
        let nouvelleHeure = new Date(listDate[i][0]);
        nouvelleHeure = new Date(nouvelleHeure.getTime() + listDate[i][1] * 60000);
        nouvelleHeure = nouvelleHeure.toString().substr(16, 5);

        document.getElementById("table").innerHTML += 
        "<div class='padding-date' id='temps"+i+"'>"+mois+
        "<br><span class='date'>"+jourMois+
        "</span><br><span class='day'>"+jourSemaine+
        "</span><br><br><span class='time'>"+heure+
        "<br>"+nouvelleHeure+"</span></div>";
    }
}

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

        genererTemps(listDate);
        genererNombreParticipants(listParticipant);
        genererDisponibilitesParJour(data);
        genererZoneDeSaisie();
        genererCheckBox(listDate);
        genererDisponibilitesParPersonne(data);

        appuyerCrayon(indice, listDate, listParticipant);
        ecouterAppuieCrayon(crayon);

        genererVueCalendrier(listDate);
    });
}