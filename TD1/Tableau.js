/**
* Titre: Labo 1 - Tableau.js
* Date: 7 octobre 2018
* Auteurs: Claudia Antoun (1920363) et Jeffrey Salloum (1902655)
* Desciption: Ce code permet recréer un tableau Doodle.
*/

function genererCheckBox(data)
{
    //put dispos de michel toutes a zero
    for(let i = 0; i < data.Calendrier.length; i++)
    {
        document.getElementById("body").innerHTML +=
        "<div class='background-color-blue'><label class='container'><input type='checkbox'><span class='checkmark'></span></label></div>";
    }1
}

function genererZoneDeSaisie()
{
    //put michel as en cours
    document.getElementById("body").innerHTML +=
    "<div class='image-align-input-box'><span><img src='Images/particip1.png'></span><form><input type='text' id='fname' name='firstname' placeholder='Saisissez nom'></form></div>";
}

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
    document.getElementById("body").innerHTML += 
    "<div class='style-number-participants'><strong>"+nombreParticipantsTotal+
    " participants"+"</strong></div>";
}

function genererDisponibilites(data)
{
    for(let i = 0; i < data.Calendrier.length; i++)
    {
        let disponibilitesParJour = 0;
        for(let j = 0; j < data.Participants.length; j++)
        {
            disponibilitesParJour += data.Participants[j].Disponibilités[i];
        }
        document.getElementById("body").innerHTML += 
        "<div class='image-align-check'><img src='Images/tick2.png' class='blue-check-size'><strong>"
        +disponibilitesParJour+"</strong></div>";
    }
}

function genererTemps(data)
{
    document.getElementById("body").innerHTML += "<div></div>";
    for(let i = 0; i < data.Calendrier.length; i++)
    {
        let jourSemaine = data.Calendrier[i][0].substr(0, 3);
        let mois = data.Calendrier[i][0].substr(4, 3);
        let jourMois = data.Calendrier[i][0].substr(8, 2);
        let heure = data.Calendrier[i][0].substr(16, 5);

        document.getElementById("body").innerHTML += 
        "<div class='padding-date'>"+mois+
        "<br><span class='date'>"+jourMois+
        "</span><br><span class='day'>"+jourSemaine+
        "</span><br><br><span class='time'>"+heure+
        "<br>12:00</span></div>";
        // u gotta change the time 
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
        genererTemps(data);
        genererNombreParticipants(data);
        genererDisponibilites(data);
        genererZoneDeSaisie();
        genererCheckBox(data);
    });
}