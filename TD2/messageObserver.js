/**
* Titre: Labo 2 - messageObserver.js
* Date: 25 novembre 2018
* Auteurs: Claudia Antoun (1920363) et Jeffrey Salloum (1902655)
* Desciption: Ce code permet de manipuler les messages envoyés.
*/

class MessageObserver
{
    /**
   * Créer un nouveau message.
   * @param {String} username - Le nom d'utilisateur. 
   * @param {Integer} alertCount - Le nombre de notifications.
   */
    constructor(username)
    {
        this.username = username;
        this.alertCount = 1;
    }

    /**
    * Afficher le message et les notifications.
    * @param {AnyObject} data - Le contenu du message.
    * @param {String} sender - Le nom de l'utilisateur qui envoie le message.
    * @param {String} timestamp - L'horodatage du message envoyé. 
    * @param {String} id - L'identificateur du message. 
    * @param {String} currentChannel - L'identificateur du canal courant.
    * @param {String} arrayOfChannels - La liste de canaux.
    */
    displayMessage(data, sender, timestamp, id, currentChannel, arrayOfChannels)
    {   
        if(id == currentChannel && id != null && currentChannel != null)
        {
            let month = ["Janvier","Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

            let newMessageUsername = document.createElement("div");
            let newMessage = document.createElement("div");
            let newMessageTimestamp = document.createElement("div");

            let messageDay = timestamp.substring(8, 10);
            let messageMonth = timestamp.substring(5, 7);
            let messageTime = timestamp.substring(11, 16);

            newMessageUsername.textContent = sender;
            newMessage.textContent = data;
            newMessageTimestamp.textContent = messageDay + " " + month[messageMonth - 1] + ", " + messageTime;
            
            if (sender == this.username)
            {
                newMessage.setAttribute("class", "message-sent");
                newMessageTimestamp.setAttribute("class", "message-sent-timestamp");
            }
            else 
            {
                newMessageUsername.setAttribute("class", "message-recieved-username");
                newMessage.setAttribute("class", "message-recieved");
                newMessageTimestamp.setAttribute("class", "message-recieved-timestamp");
            }

            document.getElementById("groupChat").appendChild(newMessageUsername);
            document.getElementById("groupChat").appendChild(newMessage);
            document.getElementById("groupChat").appendChild(newMessageTimestamp);
        }
        else if(id != currentChannel && id != null && currentChannel != null)
        {
            let notifications = document.createElement("span");
            notifications.setAttribute("class", "badge");

            for(let i = 0; i < arrayOfChannels.length; i++)
            {
                if(sender != this.username && arrayOfChannels[i].joinStatus == true)
                {
                    if(this.alertCount <= 99)
                    {
                        notifications.innerText = this.alertCount++;
                        document.getElementById("bell").appendChild(notifications);
                    }
                }
            }
        }
    }
}