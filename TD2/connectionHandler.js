class ConnectionHandler
{
    constructor(url, username)
    {
        this.websocket = new WebSocket(url+username);
        this.arrayOfChannels = new Array();
        this.username = username;
        this.generalChannel = "";
        this.currentChannel = "";
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
                case "updateChannelsList":
                //dont forget to delete the console.log
                    console.log(myObj);
                    channelObserver.emptyChannelBox();
                    for(let i = 0; i < myObj.data.length; i++)
                    {
                        copyConnectionHandler.arrayOfChannels[i] = myObj.data[i].id;
                    }
                    channelObserver.showChannels(myObj);
                    copyConnectionHandler.getGeneralChannelId();
                    break;
                case "onError":
                //im not sure what to do here IDKKKK
                    alert("Nous avons attrapé une erreur. Nous allons relancer la page.");
                    setTimeout(window.location.reload(), 5000);
                    break;
            }
        }
    }

    // getOldMessages(iconId)
    // {
    //     let oldMessage = new Message("onGetChannel", iconId, null, null, null);
    //     this.websocket.send(JSON.stringify(oldMessage));
    // }

    getGeneralChannelId()
    {
        this.generalChannel = document.getElementById("generalChannel").childNodes[0].id;
        if(this.currentChannel == "")
        {
            this.currentChannel = this.generalChannel;
        }
    }

    changeCurrentChannel(channelId)
    {
        this.currentChannel = channelId;
    }

    //CurrentChannel get it in the array (iterate through the array) and see if the joinStatus is true
    createMessage()
    {
        //dont forgot the console log
        console.log(this.currentChannel);
        let userEntryMessage = document.getElementById("fname").value;
        let message = new Message("onMessage", this.currentChannel, userEntryMessage, null, null);
        this.websocket.send(JSON.stringify(message));
        document.getElementById("fname").value = "";
    }

    createChannel(channelName)
    {
        if(channelName == null || channelName == "")
        {
            return;
        }
        else
        {
            let newChannel = new Message("onCreateChannel", null, channelName, null, null);
            this.websocket.send(JSON.stringify(newChannel));
        }
    }

    joinChannel(iconId)
    {
        let joinedChannel = new Message("onJoinChannel", iconId, null, null, null);
        this.websocket.send(JSON.stringify(joinedChannel));
    }

    leaveChannel(iconId)
    {
        let channelLeft = new Message("onLeaveChannel", iconId, null, null, null);
        this.websocket.send(JSON.stringify(channelLeft));
    }
}
