var exports = module.exports = {};

exports.explain = function() {
	console.log("Hello! This is the adfgvx cipher simulator created by ensj.\n\
In this cipher, I and J are interchangeable, and X is used as the padding.\n");
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
	plaintext = plaintext.prettify();

	for(var i = 0; i < plaintext.length; i++) {

	}
};

exports.decrypt = function(ciphertext, key, table) {
	var coords = ['A', 'D', 'F', 'G', 'V', 'X'];
	ciphertext = ciphertext.prettify();

};

// for adfgvx prettification purposes.
/*String.prototype.prettify = function() {
	return this.toUpperCase().replace(/\s/g, '');
}*/