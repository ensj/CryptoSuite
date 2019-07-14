// Checks if key is valid, and creates a valid one if it is not
exports.keyVerify = function(key, type) {
	// prettifies the key into something easier to handle
	// splits key into array
	key = prettify(key, type).split("");

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

var prettify = exports.prettify = function(data, type) {
	var res;
	if(type == "s") {
		res = data.toUpperCase().replace(/\s/g, '_');
	}
	if(type == "p") {
		res = data.toUpperCase().replace(/\s/g, '').replace(/[^A-ZĲ]/g, '').replace(/[IJ]/g, 'Ĳ');
	}
	if(type == "a") {
		res = data.toUpperCase().replace(/\s/g, '').replace(/[^A-Z0-9]/g, '');
	}
	return res;
}