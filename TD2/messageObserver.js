class MessageObserver
{
    constructor(username)
    {
        this.username = username;
    }

    //les empty div napparaisse pas tjrs :))))
    displayMessage(data, sender, timestamp)
    {
        let month = ["Janvier","Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

        let newMessageUsername = document.createElement("div");
        let newMessage = document.createElement("div");
        let newMessageTimestamp = document.createElement("div");
        let emptyDiv = document.createElement("div");
        let messageDay = timestamp.substring(8, 10);
        let messageMonth = timestamp.substring(5, 7);
        let messageTime = timestamp.substring(11, 16);

        newMessageUsername.textContent = sender;
        newMessage.textContent = data;
        newMessageTimestamp.textContent = messageDay + " " + month[messageMonth - 1] + ", " + messageTime;
        emptyDiv.textContent = "";
        
        if (sender == this.username)
        {
            //newMessageUsername.setAttribute("class", "message-sent-usernameOrTimestamp");
            newMessage.setAttribute("class", "message-sent");
            newMessageTimestamp.setAttribute("class", "message-sent-usernameOrTimestamp");
        }
        else 
        {
            newMessageUsername.setAttribute("class", "message-recieved-usernameOrTimestamp");
            newMessage.setAttribute("class", "message-recieved");
            newMessageTimestamp.setAttribute("class", "message-recieved-usernameOrTimestamp");
        }

        document.getElementById("groupChat").appendChild(newMessageUsername);
        document.getElementById("groupChat").appendChild(newMessage);
        document.getElementById("groupChat").appendChild(newMessageTimestamp);
        document.getElementById("groupChat").appendChild(emptyDiv);
    }
}