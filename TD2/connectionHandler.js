class ConnectionHandler
{
    constructor(url, username)
    {
        this.websocket = new WebSocket(url+username);
        this.arrayOfChannels = new Array();
        this.username = username;
        this.generalChannel = null;
        this.currentChannel = null;
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
                    messageObserver.displayMessage(myObj.data, myObj.sender, myObj.timestamp, myObj.channelId, copyConnectionHandler.currentChannel, copyConnectionHandler.arrayOfChannels);
                    break;
                case "updateChannelsList":
                //dont forget to delete the console.log
                    console.log(myObj);
                    channelObserver.emptyChannelBox();
                    for(let i = 0; i < myObj.data.length; i++)
                    {
                        copyConnectionHandler.arrayOfChannels[i] = myObj.data[i];
                    }
                    channelObserver.showChannels(myObj);
                    copyConnectionHandler.getGeneralChannelId();
                    break;
                case "onError":
                    alert("Une erreur a été détectée. La page sera relancée.");
                    setTimeout(window.location.reload(), 5000);
                    break;
            }
        }
    }

    //idkk
    emptyNotificationIcon()
    {
        document.getElementById("notification").innerHTML = "";
    }

    getGeneralChannelId()
    {
        this.generalChannel = document.getElementById("generalChannel").childNodes[0].id;
        for(let i = 0; i < this.arrayOfChannels.length; i++)
        {
            if(this.currentChannel == this.arrayOfChannels[i].id && this.arrayOfChannels[i].joinStatus == false)
            {
                this.currentChannel = this.generalChannel;
                let activeGroup = document.getElementById("generalChannel").childNodes[1].innerText;
                document.getElementById("activeChannel").innerText = activeGroup;
            }
        }
        if(this.currentChannel == "" || this.currentChannel == null)
        {
            this.currentChannel = this.generalChannel;
        }
    }

    changeCurrentChannel(channelId)
    {
        this.currentChannel = channelId;
    }

    createMessage()
    {
        let userEntryMessage = document.getElementById("fname").value;
        if(userEntryMessage != null || userEntryMessage != "")
        {
            let message = new Message("onMessage", this.currentChannel, userEntryMessage, null, null);
            this.websocket.send(JSON.stringify(message));
            document.getElementById("fname").value = "";
        }
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
