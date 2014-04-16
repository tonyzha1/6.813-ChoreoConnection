//Comment.js
function TimedComment(text, author, start, end){
	this.text = text;
	this.author= author;
	this.startTime = start;
	this.endTime = end;
	this.isTimed = true;
}

function displayComment(comment, id, parentSelector) { 
	jQuery("<div/>", {
		id:"TimedComment_"+id,
		text:comment.Text, 
	}).appendTo(parentSelector);
}
function removeComment(commentID, parentSelector) {
	$(parentSelector).remove("#TimedComment_"+commentID);
}


// Code starting here is lifted and adapted from Google Youtube API sandbox.
google.load("swfobject", "2.1");
comments = [];

function updatePlayerInfo() {
	var videoCommentSelector = "#comments";
	var timeStamp = ytplayer.getCurrentTime();
	for(var i = 0; i<comments.length; i++) {
		if(timeStamp > comments[i].startTime && timeStamp < comments[i].endTime) { 
			displayComment(comments[i], i, videoCommentSelector);
		}
		else { 
			removeComment(i, videoCommentSelector);
		}
	}
}


function onYoutubePlayerReady(playerId) {
	ytplayer = document.getElementById("ytPlayer");
	setInterval(updatePlayerInfo, 250);
	updatePlayerInfo();
	ytplayer.addEventListener("onError", "onPlayerError");
}

function onPlayerError(errorCode) { 
	//insert error handling code here. 
}

function loadPlayer(){
	var videoID = "ylLzyHk54Z0";
	var params= {allowScriptAccess:"always"};
	var atts={id:"ytPlayer"};
	swfobject.embedSWF("http://www.youtube.com/v/" + videoID +
		"?version=3&enablejsapi=1&playerapiid=player1", // do not change.
		"videoDiv", // name of containing element.
		"480", "295", "9", null, null, params, atts);
}

google.setOnLoadCallback(loadPlayer);