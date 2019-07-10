const playfair = require("./playfair.js");
const adfgvx   = require("./adfgvx.js");
//const scytale
//const rbg
//const affine
//const rsa
//const aes
//const dh
//const ecdh
//const dsa
//const ecdsa

var key = 'palmerstone';
var plaintext = "balloon";

function playfairDemo(key, plaintext) {
	playfair.explain(); 
	console.log("Key:", key);
	var table = playfair.generateTable(key);
	console.log("\nPlaintext message: " + plaintext)
	var ciphertext = playfair.encrypt(plaintext, table);

	var sentence = "";
	for(var i = 0; i < ciphertext.length; i++) {
		sentence += ciphertext[i] + " ";
	}
	console.log("Ciphertext: " + sentence);
	plaintext = playfair.decrypt(ciphertext.join(""), table);
	sentence = "";
	for(var i = 0; i < plaintext.length; i++) {
		sentence += plaintext[i] + " ";
	}
	console.log("Plaintext: " + sentence);
}

function adfgvxDemo(key, plaintext) {
	adfgvx.explain();
	console.log("Key:", key);
	var table = adfgvx.generateTable();
	console.log("\nPlaintext message: " + plaintext);
	var ciphertext = playfair.encrypt(plaintext, key, table);
}

playfairDemo(key, plaintext);
//adfgvx.generateTable();