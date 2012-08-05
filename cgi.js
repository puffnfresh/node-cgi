var sys = require('sys'),
http = require('http');

var Request = function() {
	this.method = process.env['REQUEST_METHOD'];
	this.headers = {
		'host': process.env['HTTP_HOST'],
		'user-agent': process.env['HTTP_USER_AGENT']
	};
	this.url = process.env['REQUEST_URI'];
};

var Response = function() {
	var body = false;

	this.writeHead = function() {
		var status = arguments[0];
		var reason = arguments[1];
		var headers = arguments[2];

		if (typeof reason != 'string') {
			headers = reason;
			reason = http.STATUS_CODES[arguments[0]] || 'unknown';
		}

		sys.puts('Status: ' + status + ' ' + reason);

		var field, value;
		var keys = Object.keys(headers);
		var isArray = (headers instanceof Array);

		for (var i = 0, l = keys.length; i < l; i++) {
			var key = keys[i];

			if (isArray) {
				field = headers[key][0];
				value = headers[key][1];
			} else {
				field = key;
				value = headers[key];
			}

			sys.puts(field + ": " + value);
		}
	};

	this.write = function(message) {
		if (!body) {
			body = true;
			sys.puts("");
		}

		if (message) sys.print(message);
	};

	this.flush = function() {
	};

	this.end = function() {
		this.write.apply(this, arguments);
	};
};

var Server = function(listener, options) {
	var request = new Request();
	var response = new Response();

	this.listen = function() {
		listener(request, response);
	};
};

exports.createServer = function(listener, options) {
	return new Server(listener, options);
};
