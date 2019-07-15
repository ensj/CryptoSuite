const util = require("./util.js");

const scytale = require("./cipher/scytale.js");
const playfair = require("./cipher/playfair.js");
const adfgvx   = require("./cipher/adfgvx.js");
//const streamcipher = 
//const rbg
//const affine
//const rsa
//const aes
//const dh
//const ecdh
//const dsa
//const ecdsa

var key = "paradigm";
var plaintext = "abcdefghijklmnopqrstuvwxyz123"; //29

function scytaleDemo(key, plaintext) {
	scytale.explain();
	console.log("Key:", key);
	console.log("Plaintext message:", plaintext);
	var ciphertext = scytale.encrypt(plaintext, key);
	console.log("Ciphertext:", ciphertext);
	plaintext = scytale.decrypt(ciphertext, key);
	console.log("Plaintext", plaintext);
	console.log('\n');
}

function playfairDemo(key, plaintext) { // prof. schaefer. key: palmerston, plaintext: balloon
	playfair.explain(); 
	console.log("Key:", key);
	key = util.keyVerify(key, "p");
	var table = playfair.generateTable(key);
	console.log("\nPlaintext message:", plaintext)
	var ciphertext = playfair.encrypt(plaintext, table);
	console.log("Ciphertext:", ciphertext);
	plaintext = playfair.decrypt(ciphertext, table);
	console.log("Plaintext: ", plaintext);
	console.log('\n');
}

function adfgvxDemo(key, plaintext) {
	adfgvx.explain();
	console.log("Key:", key);
	key = util.keyVerify(key, "a");
	//var table = adfgvx.generateTable(); // generate a custom table.
	var table = 'KZWR1F9B6CL5Q7JPGXEVY3AN8ODH02U4ISTM'.split(""); // prof. schaefer's table. key: deutsch, plaintext: product ciphers
	//var table = 'NA1C3H8TB2OME5WRPD4F6G7I9J0KLQSUVXYZ'.split(""); // wikipedia's table. key: privacy, plaintext: attack at 1200am
	adfgvx.printTable(table);
	console.log("\nPlaintext message:", plaintext);
	var ciphertext = adfgvx.encrypt(plaintext, key, table);
	console.log("Ciphertext:", ciphertext);
	plaintext = adfgvx.decrypt(ciphertext, key, table);
	console.log("Plaintext:", plaintext);
	console.log('\n');
}

playfairDemo(key, plaintext);
adfgvxDemo(key, plaintext);
scytaleDemo(key.length, plaintext);