let username;
//let url = "ws://log2420-nginx.info.polymtl.ca/chatservice?username="; 
let url = "ws://inter-host.ca:3000/chatservice?username=";
let connectionHandler;

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

function getChannelName()
{
    let userEntry = prompt("Veuillez entrer le nom du nouveau groupe:", "");
    connectionHandler.createChannel(userEntry);
}

//idkk
function clickOnInputBox()
{
    // if(document.getElementById("fname").clicked == true)
    // {
    //     connectionHandler.emptyNotificationIcon();
    // }
    var element = document.getElementById('fname'); // grab a reference to your element
    element.addEventListener('click', connectionHandler.emptyNotificationIcon());
}