/**
* Titre: Labo 1 - Tableau.js
* Date: 7 octobre 2018
* Auteurs: Claudia Antoun (1920363) et Jeffrey Salloum (1902655)
* Desciption: Ce code permet de recréer un tableau Doodle.
*/

function genererVueCalendrier()
{
    document.getElementById("spanTable").style.display = "block";
    document.getElementById("calendrier").innerHTML = "<div></div>";
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
                "</div><div class='pencil'><a href='#'><i class='fas fa-pencil-alt'></i></a></div></div>";
            }
            else
            {
                document.getElementById("table").innerHTML +=
                "<div class='registered-names-grid'><div><img src='Images/particip2.png'></div><div class='style-registered-names'>"+nom+
                "</div><div class='pencil'><a href='#'><i class='fas fa-pencil-alt'></i></a></div></div>";
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

                if(data.Participants[i].Disponibilités[j] == 0)
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
                else
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
            }
        }
    }
}

function genererCheckBox(data)
{
    //put dispos de michel toutes a zero
    for(let i = 0; i < data.Calendrier.length; i++)
    {
        document.getElementById("table").innerHTML +=
        "<div class='background-color-blue'><label class='container'><input type='checkbox'><span class='checkmark'></span></label></div>";
    }
}

function genererZoneDeSaisie()
{
    //put michel as en cours
    document.getElementById("table").innerHTML +=
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
        "<div class='image-align-check'><img src='Images/tick2.png' class='blue-check-size'><strong>"
        +disponibilitesParJour+"</strong></div>";
    }
}

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
        "<div class='padding-date'>"+mois+
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
        genererTemps(data);
        genererNombreParticipants(data);
        genererDisponibilitesParJour(data);
        genererZoneDeSaisie();
        genererCheckBox(data);
        genererDisponibilitesParPersonne(data);
    });
}