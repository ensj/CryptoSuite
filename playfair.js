var exports = module.exports = {};

exports.explain = function() {
	console.log("Hello! This is the playfair cipher simulator created by ensj.\n\
In this cipher, I and J are interchangeable, and X is used as the padding.\n");
};

exports.generateTable = function(key) {
	// the beginnings of our table
	var table = ['A', 'B', 'C', 'D', 'E', 
				 'F', 'G', 'H', 'Ĳ', 'K', 
				 'L', 'M', 'N', 'O', 'P', 
				 'Q', 'R', 'S', 'T', 'U', 
				 'V', 'W', 'X', 'Y', 'Z', ];
	// check if key is usable. If not, create one based on input
	key = keyVerify(key);
	
	var keycount = 0;
	// scrolls through the key characters in reverse order.
	for(var i = key.length-1; i >= 0; i--) {
		// unshifts a character of the key into the table.
		table.unshift(key[i]);
		keycount++;
		// check for dupes (we don't want to remove the actual key elements, so we check the original table)
		for(var e = table.length; e >= keycount; e--) {
			if(key[i] == table[e]) {
				table.splice(e, 1);
			}
		}
	}

	// print the table
	console.log("Generated Table:");
	for(var i = 0; i < 5; i++) {
		let sentence = "";
		for(var e = i*5; e < i*5+5; e++) {
			sentence = sentence.concat(table[e] + " ");
		}
		console.log(sentence);
	}

	// return our result!
	return table;
};

// encrypts the plaintext.
exports.encrypt = function(plaintext, table) {
	plaintext = digraphify(plaintext);
	var ciphertext = [];

	// do this for all digraphs
	for(var i = 0; i < plaintext.length; i++) {
		let letter_1 = {row: Math.floor(table.indexOf(plaintext[i][0])/5), 
						column: table.indexOf(plaintext[i][0])%5};
		let letter_2 = {row: Math.floor(table.indexOf(plaintext[i][1])/5), 
						column: table.indexOf(plaintext[i][1])%5};

		if(letter_1.row == letter_2.row) {
			// if on the same row, move to the right.
			ciphertext[i] = table[(letter_1.row * 5) + (letter_1.column+1)%5];
			ciphertext[i] += table[(letter_2.row * 5) + (letter_2.column+1)%5];
		}else if(letter_1.column == letter_2.column) {
			// if on the same column, move down one.
			ciphertext[i] = table[((letter_1.row+1)%5 * 5) + letter_1.column];
			ciphertext[i] += table[((letter_2.row+1)%5 * 5) + letter_2.column];
		}else {
			// else do the standard coordinate matching method.
			ciphertext[i] = table[letter_1.row * 5 + letter_2.column];
			ciphertext[i] += table[letter_2.row * 5 + letter_1.column];
		}
	}

	return ciphertext;
}

// decrypts the ciphertext.
exports.decrypt = function(ciphertext, table) {
	ciphertext = digraphify(ciphertext);
	var plaintext = [];

	// do this for all digraphs
	for(var i = 0; i < ciphertext.length; i++) {
		let letter_1 = {row: Math.floor(table.indexOf(ciphertext[i][0])/5), 
						column: table.indexOf(ciphertext[i][0])%5};
		let letter_2 = {row: Math.floor(table.indexOf(ciphertext[i][1])/5), 
						column: table.indexOf(ciphertext[i][1])%5};

		if(letter_1.row == letter_2.row) {
			// if on the same row, move to the left.
			plaintext[i] = table[(letter_1.row * 5) + modulus(letter_1.column-1, 5)];
			plaintext[i] += table[(letter_2.row * 5) + modulus(letter_2.column-1, 5)];
		}else if(letter_1.column == letter_2.column) {
			// if on the same column, move up one.
			plaintext[i] = table[modulus(letter_1.row-1, 5) * 5 + letter_1.column];
			plaintext[i] += table[modulus(letter_2.row-1, 5) * 5 + letter_2.column];
		}else {
			// else do the standard coordinate matching method.
			plaintext[i] = table[letter_1.row * 5 + letter_2.column];
			plaintext[i] += table[letter_2.row * 5 + letter_1.column];
		}
	}

	return plaintext;
}

// prints out a 5x5 table.
exports.printTable = function(table) {
	// print the table
	console.log("Table:");
	for(var i = 0; i < 5; i++) {
		let sentence = "";
		for(var e = i*5; e < i*5+5; e++) {
			sentence = sentence.concat(table[e] + " ");
		}
		console.log(sentence);
	}
}

// Checks if key is valid, and creates a valid one if it is not
keyVerify = function(key) {
	// prettifies the key into something easier to handle
	// splits key into array
	key = key.prettify().split("");

	// get rid of duplicate letters in the key
	for(var i = 0; i < key.length-1; i++) {
		for(var e = i+1; e < key.length; e++) {
			if(key[i] == key[e]) {
				key.splice(e, 1);
				i--; e--;
			}
		}
	}

	// print the key
	console.log("Generated key: " + key);

	return key;
};

// puts any input into an array as digraphs
digraphify = function(data) {
	data = data.prettify();

	var digraphs = [];
	for(var i = 0; i < data.length; i+=2) {
		if(i+1 >= data.length) {
			// if odd, pad with X at the end
			digraphs.push(data[i] + 'X');
		}else if(data[i] == data[i+1]) {
			// if two of the characters are the same, pad first letter with X
			digraphs.push(data[i] + 'X');
			i--;
		}else {
			// otherwise just do the normal digraph ting
			digraphs.push(data[i] + data[i+1]);
		}
	}
	return digraphs;
}

// very bad implementation of modular arithmetic
modulus = function(b, n) {
	b = b%n;
	while(b < 0) {
		b += n;
	}
	return b;
};

// turns any string into uppercase letters, replacing all instances of I & J as IJ. Also gets rid of spaces.
String.prototype.prettify = function() {
	return this.toUpperCase().replace(/[IJ]/g, 'Ĳ').replace(/\s/g, '');
}