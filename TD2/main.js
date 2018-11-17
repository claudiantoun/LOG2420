let username;
let url = "ws://log2420-nginx.info.polymtl.ca/chatservice?username="; 
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
}

//problem is the color doesnt change to orange when it goes to minus
// maybe use textcontent;
// this method is not good apparently gotta do smtg w onjoin or onleavechannel
function clickChannelIcon(icon)
{
    if(icon.className == "fas fa-plus")
    {
        icon.className = "fas fa-minus";
    }
    else if(icon.className == "fas fa-minus")
    {
        icon.className = "fas fa-plus"
    }
}

function getUsername()
{
    let userEntry = prompt("Veuillez entrer votre nom d'utilisateur:", "");
    if (userEntry == null || userEntry == "") 
    {
        getUsername();
    } 
    else 
    {
        return userEntry;
    }
}

//I THINK IT WERKS
function sendMessage()
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

// function sendChannel()
// {
//        let userEntry = prompt("Veuillez entrer votre nom d'utilisateur:", "");
// }