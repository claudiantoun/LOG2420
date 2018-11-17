class ConnectionHandler
{
    constructor(url, username)
    {
        this.websocket = new WebSocket(url+username);
        this.arrayOfChannels = new Array();
        this.username = username;
    }

    actionHandler()
    {
        let channelObserver = new ChannelObserver();
        let messageObserver = new MessageObserver(this.username);
        let copyConnectionHandler = this;
        this.websocket.onmessage = function(event)
        {
            let myObj = JSON.parse(event.data);
            switch(myObj.eventType)
            {
                case "onMessage":
                    messageObserver.displayMessage(myObj.data, myObj.sender, myObj.timestamp);
                    break;
                case "onCreateChannel":
                    console.log("onCreateChannel");
                    //channelObserver.showChannels(myObj);
                    break;
                case "onJoinChannel":
                    console.log("onJoinChannel");
                    break;
                case "onLeaveChannel":
                    console.log("onLeaveChannel");
                    break;
                case "updateChannelsList":
                //dont forget to delete the console.log
                    console.log(myObj);
                    for(let i = 0; i < myObj.data.length; i++)
                    {
                        copyConnectionHandler.arrayOfChannels[i] = myObj.data[i].id;
                    }
                    channelObserver.showChannels(myObj);
                    break;
                case "onError":
                    console.log("onError");
                    break;
            }
        }
    }

    getCurrentChannel()
    {

    }

    //CurrentChannel get it in the array (iterate through the array) and see if the joinStatus is true
    createMessage()
    {
        let userEntryMessage = document.getElementById("fname").value;
        let message = new Message("onMessage", this.arrayOfChannels[0], userEntryMessage, null, null);
        this.websocket.send(JSON.stringify(message));
        document.getElementById("fname").value = "";
    }

    // createChannel()
    // {
    //     id, name, status, messages, numberOfUsers
    //     let newChannel = new Channel("onMessage", this.arrayOfChannels[0], "test", null, null);
    //     this.websocket.send(JSON.stringify(newChannel));
    // }
}
