/**
* Titre: Labo 2 - connectionHandler.js
* Date: 25 novembre 2018
* Auteurs: Claudia Antoun (1920363) et Jeffrey Salloum (1902655)
* Desciption: Ce code reçoit et intéragit avec l'information du websocket.
*/

class ConnectionHandler
{
    /**
    * Créer un nouveau manipulateur de connection.
    * @param {WebSocket} websocket - Le WebSocket.
    * @param {String} url - L'URL.
    * @param {String} username - Le nom d'utilisateur. 
    * @param {Array} arrayOfChannels - La liste de canaux. 
    * @param {String} generalChannel - Le nom du canal général. 
    * @param {String} currentChannel - Le nom du canal actuel. 
    */
    constructor(url, username)
    {
        this.websocket = new WebSocket(url+username);
        this.arrayOfChannels = new Array();
        this.username = username;
        this.generalChannel = null;
        this.currentChannel = null;
    }

    /**
    * Manipuler l'action envoyé par le WebSocket.
    */
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

    /**
    * Faire disparaître le badge de notifications.
    */
    emptyNotificationIcon()
    {
        for(let i = 0; i < document.getElementsByClassName("badge").length; i++)
        {
            document.getElementsByClassName("badge")[i].style.display = "none";
        }
    }

    /**
    * Assigner l'identificateur du canal actuel à celui du canal général.
    */
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

    /**
    * Réassigner l'identificateur du canal actuel.
    * @param {String} channelId - Le nom du nouveau canal actuel. 
    */
    changeCurrentChannel(channelId)
    {
        this.currentChannel = channelId;
    }

    /**
    * Créer le message.
    */
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

    /**
    * Créer un nouveau canal.
    * @param {String} channelName - Le nom du canal à créer. 
    */
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

    /**
    * Joindre un canal.
    * @param {String} iconID - L'identificateur du canal (reconnu par l'identificateur de son icône) à joindre. 
    */
    joinChannel(iconId)
    {
        let joinedChannel = new Message("onJoinChannel", iconId, null, null, null);
        this.websocket.send(JSON.stringify(joinedChannel));
    }

    /**
    * Quitter un canal.
    * @param {String} iconID - L'identificateur du canal (reconnu par l'identificateur de son icône) à quitter. 
    */
    leaveChannel(iconId)
    {
        let channelLeft = new Message("onLeaveChannel", iconId, null, null, null);
        this.websocket.send(JSON.stringify(channelLeft));
    }
}
