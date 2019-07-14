const util = require("../util.js");

exports.explain = function() {
	console.log("Hello! This is the adfgvx cipher simulator created by ensj.\n\
In this cipher, the table gets randomly generated unless you set up your own.\n");
};

exports.generateTable = function() {
	// the beginnings of our table
	var table = ['A', 'B', 'C', 'D', 'E', 'F', 
				 'G', 'H', 'I', 'J', 'K', 'L', 
				 'M', 'N', 'O', 'P', 'Q', 'R', 
				 'S', 'T', 'U', 'V', 'W', 'X', 
				 'Y', 'Z', '0', '1', '2', '3', 
				 '4', '5', '6', '7', '8', '9'];
	
	// permute the table
	for(var idx = 0; idx < table.length; idx++) {
		let swap = idx + Math.floor(Math.random() * (table.length - idx));

		let tmp = table[swap];
		table[swap] = table[idx];
		table[idx] = tmp; 
	}

	// print the table
	console.log("Generated Table:");
	for(var i = 0; i < 6; i++) {
		let sentence = "";
		for(var e = i*6; e < i*6+6; e++) {
			sentence = sentence.concat(table[e] + " ");
		}
		console.log(sentence);
	}

	// return our result!
	return table;
};

exports.encrypt = function(plaintext, key, table) {
	var coords = ['A', 'D', 'F', 'G', 'V', 'X'];
	plaintext = util.prettify(plaintext, 'a');
	var ciphertext = [];
	var subtext = [];

	// push substituted characters into ciphertext.
	for(var i = 0; i < plaintext.length; i++) {
		let letter = {row: Math.floor(table.indexOf(plaintext[i])/6), 
					  column: table.indexOf(plaintext[i])%6};
		subtext.push(coords[letter.row]);
		subtext.push(coords[letter.column]);
	}

	var sortedkey = key.slice().sort();
	// transposition
	for(var i = 0; i < key.length; i++) {
		let pos = key.indexOf(sortedkey[i]);
		let line = 0;
		for(var e = pos; e < subtext.length; e = (line * key.length + pos)) {
			ciphertext.push(subtext[e]);
			line++;
		}
	}

	return ciphertext.join("");
};

exports.decrypt = function(ciphertext, key, table) {
	var coords = ['A', 'D', 'F', 'G', 'V', 'X'];
	ciphertext = util.prettify(ciphertext, 'a');
	var plaintext = [];
	var subtext = [];

	var rowsize = Math.ceil(ciphertext.length / key.length);
	var sortedkey = key.slice().sort();
	for(var i = 0; i < rowsize; i++) {
		for(var e = 0; e < key.length; e++) {
			// row # + row size * sorted index of key element we're on
			let ind = i + rowsize * sortedkey.indexOf(key[e]);
			if(ind >= ciphertext.length) {
				break;
			}
			subtext.push(ciphertext[ind]);
 		}
	}

	// Translates ciphertext back to plaintext by matching according to coords on table
	while(subtext.length > 0) {
		let row = coords.indexOf(subtext[0]);
		subtext.shift();
		let col = coords.indexOf(subtext[0]);
		subtext.shift();
		let ind = 6 * row + col;
		plaintext.push(table[ind]);
	}

	return plaintext.join("");
};

exports.printTable = function(table) {
	// print the table
	console.log("Table:");
	for(var i = 0; i < 6; i++) {
		let sentence = "";
		for(var e = i*6; e < i*6+6; e++) {
			sentence = sentence.concat(table[e] + " ");
		}
		console.log(sentence);
	}
}
