#!/usr/bin/node

let http = require("http");

let mongo_client = require("mongodb").MongoClient;

let url = "mongodb://localhost/";

let db;

console.log("Iniciando script mongo-http");

mongo_client.connect(url, function(error, conn){
	console.log("Dentro de mongoDB");

	if(error){
		console.log("ERROR!!!");
		return;
	}

	db = conn.db("tffhd");

});



http.createServer(function(req, res){
	res.writeHead(200);
	
	if (req.url =="/"){
		res.end();

		return;
	}
	let col = "";
	
	if(req.url == "/characters"){
		col = "characters";
	}
	else if(req.url == "/items"){
		col = "items";
	}
	else if(req.url == "/weapons"){
		col = "weapons"
	}
	else{
		res.end();
		return;
	}



	let characters = db.collection(col).find;

	characters.toArray(function(err,data)
		let string = JSON.string(data);

		res.end(string);
	});



	res.end();

}).listen(1095);


