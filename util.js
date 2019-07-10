exports.prettify = function(data, type) {
	var res = data.toUpperCase().replace(/\s/g, '');
	if(type === "p") {
		res.replace(/[IJ]/g, 'Ĳ');
	}
	return res;
}