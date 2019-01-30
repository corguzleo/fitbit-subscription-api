"use strict";

//load modules
var async = require("async");
var crypto = require("crypto");
var Redis = require("redis");

// start here and open this route in your browser
app.get("/authorize/:user_id", function (req, res) {
	// pass a user id to the local user you want to connect
	var _uid = req.params.user_id;
	
	// generate teh authorize url
	var _url = client.getAuthorizeUrl(FITBITSCOPES, process.env.FITBIT_CALLBACK_URL );
	_url += "&state=" + req.params.user_id;
	
	console.log("AUTHORIZE USER", _uid);
	res.redirect(_url);
});

