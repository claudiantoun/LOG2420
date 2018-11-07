let username = "Name";
let url = "ws://log2420-nginx.info.polymtl.ca/chatservice?username="; 
let websocket = new WebSocket(url+username);

websocket.onmessage = function(event)
{
    let myObj = JSON.parse(event.data);
    switch(myObj.eventType)
        {
            case "onMessage":
                console.log("onMessage");
            case "onCreateChannel":
                console.log("onCreateChannel");
            case "onJoinChannel":
                console.log("onJoinChannel");
            case "onLeaveChannel":
                console.log("onLeaveChannel");
            case "updateChannelsList":
                console.log("updateChannelsList");
            case "onError":
                console.log("onError");
        }
}