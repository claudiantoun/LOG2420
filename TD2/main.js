/**
* Titre: Labo 2 - main.js
* Date: 25 novembre 2018
* Auteurs: Claudia Antoun (1920363) et Jeffrey Salloum (1902655)
* Desciption: Ce code permet de manipuler la connection au serveur et d'int�ragir avec l'interface de PolyChat.
*/

let username;
let url = "ws://log2420-nginx.info.polymtl.ca/chatservice?username="; 
let connectionHandler;

/**
* Créer le manipulateur d'action envoyé par le WebSocket.
*/
function createActionHandler()
{
    document.getElementById("fname").focus();
    document.getElementById("fname").select();
    username = getUsername();
    document.getElementById("userIcon").innerHTML = 
    "<span class='icons'>"+
        "<i class='fa fa-user'></i>"+
        "+<span class='username-style'>"+username+"</span>"+
    "</span>";
    connectionHandler = new ConnectionHandler(url, username);
    connectionHandler.actionHandler();
    enterToSendMessage();  
}

/**
* Quitter ou joindre un canal à partir de son icône.
* @param {AnyObject} icon - L'icône du canal.
*/
function clickChannelIcon(icon)
{
    if(icon.className == "fas fa-plus")
    {
        connectionHandler.joinChannel(icon.id);
    }
    else if(icon.className == "fas fa-minus")
    {
        connectionHandler.leaveChannel(icon.id);
    }
}

/**
* Identifier le canal actuel.
* @param {AnyObject} currentChannelBox - La boîte du canal actuel.
*/
function getCurrentChannelId(currentChannelBox)
{
    channel = currentChannelBox.childNodes[0];
    activeGroup = currentChannelBox.childNodes[1].innerText;
    if(channel.className == "fas fa-minus" || channel.className == "fas fa-star")
    {
        document.getElementById("groupChat").innerHTML = "";
        document.getElementById("activeChannel").innerText = activeGroup;
        connectionHandler.changeCurrentChannel(channel.id);
    }
}

/**
* Retourner le nom d'utilisateur à entrer.
* @returns {String} userEntry - Le nom d'utilisateur entré.
*/
function getUsername()
{
    let userEntry;
    do 
    {
        userEntry = prompt("Veuillez entrer votre nom d'utilisateur:", "");
    }
    while(userEntry == null || userEntry == "")
    return userEntry;
}

/**
* Lier la touche "Enter" à l'envoi d'un message. 
*/
function enterToSendMessage()
{
    document.getElementById("fname").onkeydown = function(event)
    {
        if(event.keyCode == 13)
        {
            connectionHandler.createMessage();
        }
    }
}

/**
* Lier le bouton d'envoi à l'envoi d'un message. 
*/
function clickToSendMessage()
{
    connectionHandler.createMessage();
}

/**
* Lier le bouton d'ajout de canal (symbole "plus") à l'ajout d'un canal. 
*/
function clickToAddChannel()
{
    getChannelName();
}

/**
* Ajouter un canal à partir de son nom (entré par l'utilisateur).
*/
function getChannelName()
{
    let userEntry = prompt("Veuillez entrer le nom du nouveau groupe:", "");
    connectionHandler.createChannel(userEntry);
}

/**
* Vider l'indice de notification en appuyant sur la boîte de saisie de texte.
*/
function clickOnInputBox()
{
    let element = document.getElementById("fname");
    element.addEventListener("click", connectionHandler.emptyNotificationIcon());
}