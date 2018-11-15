class MessageObserver
{
    constructor()
    {

    }

    displayMessage(channel, data, sender, timestamp)
    {
        let newMessage = document.createElement("div");
        if (sender == username)
        {
            newMessage.setAttribute("class", "message-sent");
        }
        else 
        {
            newMessage.setAttribute("class", "message-recieved");
        }
        newMessage.textContent = data;
        document.getElementById("groupChat").appendChild(newMessage);
        let emptyDiv = document.createElement("div");
        document.getElementById("groupChat").appendChild(emptyDiv);
    }
}