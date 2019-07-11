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

var key = "palmerston";
var plaintext = "balloon";

function playfairDemo(key, plaintext) { // prof. schaefer. key: palmerston, plaintext: balloon
	playfair.explain(); 
	console.log("Key:", key);
	var table = playfair.generateTable(key);
	console.log("\nPlaintext message: " + plaintext)
	var ciphertext = playfair.encrypt(plaintext, table);
	console.log("Ciphertext: " + ciphertext);
	plaintext = playfair.decrypt(ciphertext, table);
	console.log("Plaintext: " + plaintext);
}

function adfgvxDemo(key, plaintext) {
	adfgvx.explain();
	console.log("Key:", key);
	var table = adfgvx.generateTable(); // generate a custom table.
	//var table = 'KZWR1F9B6CL5Q7JPGXEVY3AN8ODH02U4ISTM'.split(""); // prof. schaefer's table. key: deutsch, plaintext: product ciphers
	//var table = 'NA1C3H8TB2OME5WRPD4F6G7I9J0KLQSUVXYZ'.split(""); // wikipedia's table. key: privacy, plaintext: attack at 1200am
	//adfgvx.printTable(table);
	console.log("\nPlaintext message: " + plaintext);
	var ciphertext = adfgvx.encrypt(plaintext, key, table);
	console.log("Ciphertext: " + ciphertext);
	plaintext = adfgvx.decrypt(ciphertext, key, table);
	console.log("Plaintext: " + plaintext);
}

//playfairDemo(key, plaintext);
adfgvxDemo(key, plaintext);