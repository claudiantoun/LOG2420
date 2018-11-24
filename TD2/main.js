let username;
let url = "ws://log2420-nginx.info.polymtl.ca/chatservice?username="; 
//let url = "ws://inter-host.ca:3000/chatservice?username=";
let connectionHandler;

function createActionHandler()
{
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

//problem is the color doesnt change to orange when it goes to minus
function clickChannelIcon(icon)
{
    if(icon.className == "fas fa-plus")
    {
        connectionHandler.joinChannel();
    }
    else if(icon.className == "fas fa-minus")
    {
        connectionHandler.leaveChannel();
    }
}

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

function clickToSendMessage()
{
    connectionHandler.createMessage();
}

function clickToAddChannel()
{
    getChannelName();
}

// it doesnt like it when u dont put a name for the channel
function getChannelName()
{
    let userEntry = prompt("Veuillez entrer le nom du nouveau groupe:", "");
    connectionHandler.createChannel(userEntry);
}