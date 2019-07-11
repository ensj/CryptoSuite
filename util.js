exports.prettify = function(data, type) {
	var res;
	if(type == "s") {
		res = data.toUpperCase().replace(/\s/g, '_');
	}
	if(type == "p") {
		res = data.toUpperCase().replace(/\s/g, '').replace(/[^A-Z]/g, '').replace(/[IJ]/g, 'Ĳ');
	}
	if(type == "a") {
		res = data.toUpperCase().replace(/\s/g, '').replace(/[^A-Z0-9]/g, '');
	}
	return res;
}