class MessageObserver
{
    constructor(username)
    {
        this.username = username;
    }

    displayMessage(data, sender, timestamp)
    {
        let newMessageUsername = document.createElement("div");
        let newMessage = document.createElement("div");
        let newMessageTimestamp = document.createElement("div");
        let emptyDiv = document.createElement("div");
        
        newMessageUsername.textContent = sender;
        newMessage.textContent = data;
        newMessageTimestamp.textContent = timestamp;
        
        if (sender == this.username)
        {
            newMessageUsername.setAttribute("class", "message-sent-usernameOrTimestamp");
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
    }
}