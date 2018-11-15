let username;
let url = "ws://log2420-nginx.info.polymtl.ca/chatservice?username="; 
let connectionHandler;
//let messageObserver;

function createActionHandler()
{
    username = getUsername();
    connectionHandler = new ConnectionHandler(url, username);
    //messageObserver = new MessageObserver();
    connectionHandler.actionHandler();
}

//problem is the color doesnt change to orange when it goes to minus
// maybe use textcontent;
function clickChannelIcon(icon)
{
    if(icon.className == "fas fa-plus")
    {
        icon.className = "fas fa-minus";
        //console.log(icon.textcontent);
    }
    else if(icon.className == "fas fa-minus")
    {
        icon.className = "fas fa-plus"
    }
}

function getUsername()
{
    let userEntry = prompt("Please enter your username:", "Username");
    if (userEntry == null || userEntry == "") 
    {
        getUsername();
    } 
    else 
    {
        return userEntry;
    }
}