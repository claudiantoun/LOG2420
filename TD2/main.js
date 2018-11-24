let username;
let url = "ws://log2420-nginx.info.polymtl.ca/chatservice?username="; 
//let url = "ws://inter-host.ca:3000/chatservice?username=";
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
        //dont forgot the console log
        connectionHandler.leaveChannel(icon.id);
        // let generalId = document.getElementById("generalChannel").childNodes[0].id;
        // console.log(generalId);
        // connectionHandler.changeCurrentChannel(generalId);
    }
}

//when going from minus to plus active group name gotta be general and the current chat needs to be general as well!!
function getCurrentChannelId(currentChannelBox)
{
    channel = currentChannelBox.childNodes[0];
    activeGroup = currentChannelBox.childNodes[1].innerText;
    if(channel.className == "fas fa-minus" || channel.className == "fas fa-star")
    {
        //dont forgot the console log
        console.log(channel.id);
        document.getElementById("groupChat").innerHTML = "";
        document.getElementById("activeChannel").innerText = activeGroup;
        connectionHandler.changeCurrentChannel(channel.id);
    }
    else
    {
        let generalId = document.getElementById("generalChannel").childNodes[0].id;
        connectionHandler.changeCurrentChannel(generalId);
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