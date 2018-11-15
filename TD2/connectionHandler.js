class ConnectionHandler
{
    constructor(url, username)
    {
        this.websocket = new WebSocket(url+username);
        //this.channelObserver = new ChannelObserver();
    }

    actionHandler()
    {
        let channelObserver = new ChannelObserver();
        let messageObserver = new MessageObserver();
        this.websocket.onmessage = function(event)
        {
            let myObj = JSON.parse(event.data);
            switch(myObj.eventType)
            {
                case "onMessage":
                    console.log("onMessage");
                    messageObserver.displayMessage(myObj.channel, myObj.data, myObj.sender, myObj.timestamp);
                    break;
                case "onCreateChannel":
                    console.log("onCreateChannel");
                    break;
                case "onJoinChannel":
                    console.log("onJoinChannel");
                    break;
                case "onLeaveChannel":
                    console.log("onLeaveChannel");
                    break;
                case "updateChannelsList":
                    console.log("updateChannelsList");
                    console.log(myObj);
                    channelObserver.showChannels(myObj);
                    break;
                case "onError":
                    console.log("onError");
                    break;
            }
        }
    }
}
