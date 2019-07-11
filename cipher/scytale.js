const util = require('../util.js');

exports.explain = function() {
	console.log("Hello! This is the scytale cipher simulator created by ensj.\n");
};

exports.encrypt = function(plaintext, key) {
	plaintext = util.prettify(plaintext, 's');
	var ciphertext = [];

	while(plaintext.length%key !== 0) {
		plaintext = plaintext.concat('X');
	}

	for(var i = 0; i < key; i++) {
		for(var e = 0; e < plaintext.length / key; e++) {
			ciphertext[e + (plaintext.length / key * i)] = plaintext[i + key * e];
		}
	}

	return ciphertext.join("");
}

exports.decrypt = function(ciphertext, key) {
	ciphertext = util.prettify(ciphertext, 's');
	var plaintext = [];

	for(var i = 0; i <  key; i++) {
		for(var e = 0; e < ciphertext.length / key; e++) {
			plaintext[i + key * e] = ciphertext[e + (ciphertext.length / key * i)];
		}
	}

	return plaintext.join("");
}