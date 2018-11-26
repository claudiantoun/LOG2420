/**
* Titre: Labo 2 - channelObserver.js
* Date: 25 novembre 2018
* Auteurs: Claudia Antoun (1920363) et Jeffrey Salloum (1902655)
* Desciption: Ce code permet de manipuler la boîte de canaux du serveur.
*/

class ChannelObserver
{   
    /**
    * Vider la boîte de canaux
    */
    emptyChannelBox()
    {
        document.getElementById("channelBox").innerHTML = '';
    }

    /**
    * Afficher les canaux.
    * @param {AnyObject[]} myObj - La liste de canaux actuels (données). 
    */
    showChannels(myObj)
    {
        for(let i = 0; i < myObj.data.length; i++)
        {
            if(myObj.data[i].name == "Général")
            {
                document.getElementById("channelBox").innerHTML += 
                "<div id='generalChannel' onclick='getCurrentChannelId(this)' class='channels-style'>"+
                    "<i id='"+myObj.data[i].id+"' style='color:rgb(253, 134, 74); padding-top:9px; padding-left:15px;' class='fas fa-star'></i>"+
                    "<span class='channel-icon-spacing'>"+myObj.data[i].name+"</span>"+
                "</div>";
            }
            else if(i % 2 == 0)
            {
                if(myObj.data[i].joinStatus == false)
                {
                    document.getElementById("channelBox").innerHTML += 
                    "<div onclick='getCurrentChannelId(this)' class='channels-style'>"+
                        "<i id='"+myObj.data[i].id+"' onclick='clickChannelIcon(this)' style='color:rgb(74, 135, 133); padding-top:9px; padding-left:15px;' class='fas fa-plus'></i>"+
                        "<span class='channel-icon-spacing'>"+myObj.data[i].name+"</span>"+
                    "</div>";
                }
                else
                {
                    document.getElementById("channelBox").innerHTML += 
                    "<div onclick='getCurrentChannelId(this)' class='channels-style'>"+
                        "<i id='"+myObj.data[i].id+"' onclick='clickChannelIcon(this)' style='color:orange; padding-top:9px; padding-left:15px;' class='fas fa-minus'></i>"+
                        "<span class='channel-icon-spacing'>"+myObj.data[i].name+"</span>"+
                    "</div>";
                }
            }
            else
            {
                if(myObj.data[i].joinStatus == false)
                {
                    document.getElementById("channelBox").innerHTML += 
                    "<div onclick='getCurrentChannelId(this)' class='channels-style-dark-grey'>"+
                        "<i id='"+myObj.data[i].id+"' onclick='clickChannelIcon(this)' style='color:rgb(74, 135, 133); padding-top:9px; padding-left:15px;' class='fas fa-plus'></i>"+
                        "<span class='channel-icon-spacing'>"+myObj.data[i].name+"</span>"+
                    "</div>";
                }
                else
                {
                    document.getElementById("channelBox").innerHTML += 
                    "<div onclick='getCurrentChannelId(this)' class='channels-style-dark-grey'>"+
                        "<i id='"+myObj.data[i].id+"' onclick='clickChannelIcon(this)' style='color:orange; padding-top:9px; padding-left:15px;' class='fas fa-minus'></i>"+
                        "<span class='channel-icon-spacing'>"+myObj.data[i].name+"</span>"+
                    "</div>";
                }
            }
        }
    }
}