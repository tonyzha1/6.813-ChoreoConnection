// Comment.js
// Insert comments into the array called comments (defined below).
// Create comments using "new TimedComment".
// This supports deleting comments, but the behavior relies on 
// interactions using the "undefined" value. 

function TimedComment(text, author, start, end){
	this.text = text;
	this.author= author;
	this.startTime = start;
	this.endTime = end;
	this.isTimed = true;
}

// use createCommentDiv if you need to display the comment somewhere other than where displayComment puts it.
function createCommentDiv(comment, commentID) {
	var parentDiv = jQuery("<div>", {
		id:"TimedComment_"+commentID });
	var authorDiv = jQuery("<div>", { 
		class:"authorDiv",
		text:comment.author });
	var commentDiv = jQuery("<div>", {
		class:"commentDiv",
		text:comment.text });
	parentDiv[0].appendChild(commentDiv[0]);
	parentDiv[0].appendChild(authorDiv[0]);
	return parentDiv;
}

function displayComment(comment, commentID, parentSelector) { 
	if($("#TimedComment_"+commentID).length) {
		return;
	}

	var result = createCommentDiv(comment, commentID);
	result.appendTo(parentSelector);
	
}
function removeComment(commentID, parentSelector) {
	$("#TimedComment_"+commentID).remove();
}


// Code starting here is lifted and adapted from Google Youtube API sandbox.
google.load("swfobject", "2.1");
comments = [ new TimedComment("This is a comment", "I am the author", 25, 30), 
			new TimedComment("WTF is this", "ARGH", 27, 32)];

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


function onYouTubePlayerReady(playerId) {
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
function _run() { 
	loadPlayer();
}
google.setOnLoadCallback(_run);