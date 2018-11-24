class ChannelObserver
{
    constructor()
    {
        
    }

    emptyChannelBox()
    {
        document.getElementById("channelBox").innerHTML = '';
    }

    showChannels(myObj)
    {
        for(let i = 0; i < myObj.data.length; i++)
        {
            if(myObj.data[i].name == "Général")
            {
                document.getElementById("channelBox").innerHTML += 
                "<div class='channels-style'>"+
                    "<i id='"+myObj.data[i].id+"' style='color:rgb(253, 134, 74)' class='fas fa-star'></i>"+
                    "<span class='channel-icon-spacing'>"+myObj.data[i].name+"</span>"+
                "</div>";
            }
            else if(i % 2 == 0)
            {
                if(myObj.data[i].joinStatus == false)
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
                    "<div class='channels-style'>"+
                        "<i id='"+myObj.data[i].id+"' onclick='clickChannelIcon(this)' style='color:rgb(74, 135, 133)' class='fas fa-minus'></i>"+
                        "<span class='channel-icon-spacing'>"+myObj.data[i].name+"</span>"+
                    "</div>";
                }
            }
            else
            {
                if(myObj.data[i].joinStatus == false)
                {
                    document.getElementById("channelBox").innerHTML += 
                    "<div class='channels-style-dark-grey'>"+
                        "<i id='"+myObj.data[i].id+"' onclick='clickChannelIcon(this)' style='color:rgb(74, 135, 133)' class='fas fa-plus'></i>"+
                        "<span class='channel-icon-spacing'>"+myObj.data[i].name+"</span>"+
                    "</div>";
                }
                else
                {
                    document.getElementById("channelBox").innerHTML += 
                    "<div class='channels-style-dark-grey'>"+
                        "<i id='"+myObj.data[i].id+"' onclick='clickChannelIcon(this)' style='color:rgb(74, 135, 133)' class='fas fa-minus'></i>"+
                        "<span class='channel-icon-spacing'>"+myObj.data[i].name+"</span>"+
                    "</div>";
                }
            }
        }
    }
}