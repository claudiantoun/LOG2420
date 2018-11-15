class ChannelObserver
{
    constructor()
    {
        
    }

    showChannels(myObj)
    {
        for(let i = 0; i < myObj.data.length; i++)
        {
            if(myObj.data[i].name == "Général")
            {
                document.getElementById("channelBox").innerHTML += 
                "<div class='channels-style'>"+
                    "<i id='"+myObj.data[i].id+"' style='color:orange' class='fas fa-star'></i>"+
                    "<span class='channel-icon-spacing'>"+myObj.data[i].name+"</span>"+
                "</div>";
            }
            else if(i % 2 == 0)
            {
                document.getElementById("channelBox").innerHTML += 
                "<div class='channels-style'>"+
                    "<i id='"+myObj.data[i].id+"' onclick='clickChannelIcon(this)' style='color:rgb(74, 135, 133)' class='fas fa-plus'></i>"+
                    "<span class='channel-icon-spacing'>"+myObj.data[i].name+"</span>"+
                "</div>";
            }
            else
            {
                document.getElementById("channelBox").innerHTML += 
                "<div class='channels-style-dark-grey'>"+
                    "<i id='"+myObj.data[i].id+"' onclick='clickChannelIcon(this)' style='color:rgb(74, 135, 133)' class='fas fa-plus'></i>"+
                    "<span class='channel-icon-spacing'>"+myObj.data[i].name+"</span>"+
                "</div>";
            }
        }
    }
}